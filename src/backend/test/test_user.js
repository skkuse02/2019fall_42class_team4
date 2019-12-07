var expect = require('chai').expect;
var should = require('chai').should;
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
let crypto = require('crypto');
chai.use(chaiHttp);

const baseUrl = 'http://localhost:3000/api/';

async function items() {
	url = baseUrl + 'users'

	await describe('POST user id : skian', function () {
	    it('statusCode = 201', function (done) {
	        chai.request(url)
				.post('')
				.send({
					id: "skian",
					customized_keyword : [],
					name : "Yoo",
					password : "qwer1234",
					posted_reviews : [],
					purchased_items : [],
					recommended_review : []
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(201);
	                done();

	        });
	    })
	})
	
	await describe('GET user id : skian', function () {
	    it('GET response 200, user attributes are checked', function (done) {
	        chai.request(url)
				.get('/skian')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal("skian");
					expect(res.body.name).to.equal("Yoo");
					expect(res.body.password).to.equal(crypto.createHash('sha512').update("qwer1234").digest('base64'));
					expect(res.body.customized_keyword.length).to.equal(0);
	                done();
	        });
	    })
	})

	await describe('PUT user id : skian', function () {
	    it('PUT response 200', function (done) {
	        chai.request(url)
				.put('/skian')
				.send({
					password : "qwer1234",
					type : "keyword_change",
					keywords : ["sound quality"]
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();
	        });
	    })
	})

	await describe('GET user id : skian', function () {
	    it('GET response item  200, field values are checked', function (done) {
	        chai.request(url)
				.get('/skian')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal("skian");
					expect(res.body.name).to.equal("Yoo");
					expect(res.body.password).to.equal(crypto.createHash('sha512').update("qwer1234").digest('base64'));
					expect(res.body.customized_keyword[0]).to.equal("sound quality");
	                done();
	        });
	    })
	})

	await describe('PUT user id : skian', function () {
	    it('PUT response 200', function (done) {
	        chai.request(url)
				.put('/skian')
				.send({
					password : "qwer1234",
					type : "password_change",
					changePassword : "q!w@e#r$"
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();
	        });
	    })
	})	

	await describe('GET user id : skian', function () {
	    it('GET response item  200, field values are checked', function (done) {
	        chai.request(url)
				.get('/skian')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal("skian");
					expect(res.body.name).to.equal("Yoo");
					expect(res.body.password).to.equal(crypto.createHash('sha512').update("q!w@e#r$").digest('base64'));
					expect(res.body.customized_keyword[0]).to.equal("sound quality");
	                done();
	        });
	    })
	})

	await describe('DELETE user id : skian', function () {
	    it('statusCode = 200', function (done) {
	        chai.request(url)
				.delete('/skian')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					done();
	        });
	    })
	})

	await describe('GET user id : skian', function () {
	    it('statusCode = 404', function (done) {
			chai.request(url)
				.get('/skian')
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
### GET      /users/:user_id/?mode                          (mode: purchased = request all the purchased items, recommend = request all the recommended reviews, undefined = request user object)
### POST     /users/
### PUT      /users/:user_id/                       // CHANGE the USER INFORMATION
### PUT      /users/:user_id/:item_id               // BUY the ITEM
### DELETE   /users/:user_id/
### DELETE   /users/:user_id/:item_id               // CANCEL ITEM PURCHASE
*/