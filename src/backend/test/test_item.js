var expect = require('chai').expect;
var should = require('chai').should;
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = 'http://localhost:3000/api/';

async function items() {
	url = baseUrl + 'items';

	await describe('GET all items', function () {
	    it('statusCode = 200, # of items = 20', function (done) {
	        chai.request(url)
				.get('')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.length).to.equal(20);
	                done();                              
	        });
	    })
	})

	await describe('POST item id : 99', function () {
	    it('statusCode = 201', function (done) {
	        chai.request(url)
				.post('99/skian')
				.send({
					id:99,
					name : ["dummy"],
					price : 50.5,
					total_keywords_map : [],
					total_review : 0,
					total_star_sum : 0
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(201);
	                done();

	        });
	    })
	})
	
	await describe('GET item id : 99', function () {
	    it('GET response 200, item attributes are checked', function (done) {
	        chai.request(url)
				.get('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body[0].id).to.equal(99);
					expect(res.body[0].name[0]).to.equal("dummy");
					expect(res.body[0].total_star_sum).to.equal(0);
					expect(res.body[0].total_review).to.equal(0);
					expect(res.body[0].price).to.equal(50.5);
	                done();                              
	        });
	    })
	})

	await describe('PUT item id : 99', function () {
	    it('PUT response 200', function (done) {
	        chai.request(url)
				.put('/99')
				.send({
					price : 40,
					total_review : 1,
					total_star_sum : 1
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();

	        });
	    })
	})

	await describe('GET item id : 99', function () {
	    it('GET response item  200, field value are checked', function (done) {
	        chai.request(url)
				.get('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body[0].id).to.equal(99);
					expect(res.body[0].name[0]).to.equal("dummy");
					expect(res.body[0].total_star_sum).to.equal(1);
					expect(res.body[0].total_review).to.equal(1);
					expect(res.body[0].price).to.equal(40);
	                done();                              
	        });
	    })
	})

	await describe('DELETE item id : 99', function () {
	    it('statusCode = 200', function (done) {
	        chai.request(url)
				.delete('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					done();
	        });
	    })
	})

	await describe('GET item id : 99', function () {
	    it('statusCode = 404', function (done) {
			chai.request(url)
				.get('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(404);
	                done();                              
	        });
	    })
	})
}

items();

/*
### GET      /items/?search=query
### GET      /items/:item_id
### POST     /items/
### PUT      /items/:item_id
### DELETE   /items/:item_id
*/