var expect = require('chai').expect;
var should = require('chai').should;
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
/*
var httpMocks = require('node-mocks-http');
req = httpMocks.createRequest();
res = httpMocks.createResponse();
*/
const baseUrl = 'http://localhost:3000/api/';

async function items() {
	url = baseUrl + 'items'
	describe('GET all items', function () {
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
	    it('statusCode = 201, GET response item id = 99', function (done) {
	        chai.request(url)
				.post('')
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
	
	describe('GET item id : 99', function () {
	    it('GET response item id = 99', function (done) {
	        chai.request(url)
				.get('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body[0].id).to.equal(99);
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