var expect = require('chai').expect;
var should = require('chai').should;
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = 'http://34.239.13.251:3000/api/';

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

	await describe('POST item id : 99 (item insertion)', function () {
	    it('statusCode = 201', function (done) {
	        chai.request(url)
				.post('')
				.send({
					id:99,
					name : ["dummy"],
					price : 50.5,
					total_keywords_map : [],
					total_review : 0,
					total_star_sum : 0,
					review_id_maker : 0
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(201);
	                done();

	        });
	    })
	})
	
	await describe('GET item id : 99 (check item insertion)', function () {
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

	await describe('PUT item id : 99 (modify item attributes)', function () {
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

	await describe('GET item id : 99 (check modification)', function () {
	    it('GET response 200, field value are checked', function (done) {
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

	await describe('DELETE item id : 99 (delete item)', function () {
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

	await describe('GET item id : 99 (check deletion)', function () {
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


 mocha test/test_item.js
 mocha test/test_user.js
 mocha test/test_review.js --timeout 30000
 mocha test/test_loginout.js