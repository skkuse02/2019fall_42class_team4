var expect = require('chai').expect;
var should = require('chai').should;
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
let crypto = require('crypto');
chai.use(chaiHttp);

const baseUrl = 'http://34.239.13.251:3000/api/';
// const baseUrl = 'http://localhost:3000/api/';

async function loginLogout() {
	var session = {}

	await describe('POST user id : skian', function () {
	    it('statusCode = 201', function (done) {
	        chai.request(baseUrl + "signup")
				.post('')
				.send({
					id: "skian",
					customized_keyword : [],
					name : "Yoo",
					password : "qwer1234",
					posted_reviews : [],
					purchased_items : [],
					recommended_reviews : []
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
	        chai.request(baseUrl + 'users')
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

	await describe('POST user id : skian again', function () {
	    it('statusCode = 400', function (done) {
	        chai.request(baseUrl + "signup")
				.post('')
				.send({
					id: "skian",
					customized_keyword : [],
					name : "Yoo",
					password : "qwer1234",
					posted_reviews : [],
					purchased_items : [],
					recommended_reviews : []
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(400);
	                done();

	        });
	    })
	})

	await describe('POST user id to login but password wrong', function () {
	    it('statusCode = 400', function (done) {
	        chai.request(baseUrl + "login")
				.post('')
				.send({
					ID: "skian",
					PW : "qwer123"
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(400);
	                done();

	        });
	    })
	})

	await describe('POST user id to login but ID wrong', function () {
	    it('statusCode = 400', function (done) {
	        chai.request(baseUrl + "login")
				.post('')
				.send({
					ID: "skians",
					PW : "qwer1234"
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(404);
	                done();

	        });
	    })
	})

	await describe('POST user id to login', function () {
	    it('statusCode = 400', function (done) {
	        chai.request(baseUrl + "login")
				.post('')
				.send({
					ID: "skian",
					PW : "qwer1234"
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					session = res.body.userInfo;
					expect(res.body.userInfo.id).to.equal("skian");
					expect(res.body.userInfo.name).to.equal("Yoo");
					expect(res.body.userInfo.password).to.equal(crypto.createHash('sha512').update("qwer1234").digest('base64'));
					expect(res.body.userInfo.customized_keyword.length).to.equal(0);
	                done();

	        });
	    })
	})

	await describe('GET session information', function () {
	    it('statusCode = 200', function (done) {
	        chai.request(baseUrl + "login")
				.get('/info')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();

	        });
	    })
	})

	await describe('DELETE user id to login', function () {
	    it('statusCode = 400', function (done) {
	        chai.request(baseUrl + "logout")
				.delete('')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();
	        });
	    })
	})

	await describe('DELETE user id : skian', function () {
	    it('statusCode = 200', function (done) {
	        chai.request(baseUrl + 'users')
				.delete('/skian')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					done();
	        });
	    })
	})
}

loginLogout();

/*
## **login**

| Method | Adress      | Params | Body   | Query | Return  | Remarks 							|
| :-:    | :-          | :-:    | :-:    | :-:   | :-:     | :- 								|
| POST   | /login      |        | ID, PW |       | session | login 정보가 DB와 일치하면 세션 반환 |
| GET    | /login/info |        |        |       | session | 현재 세션 반환 						|

## **logout**

| Method | Adress | Params | Body   | Query | Return  | Remarks 		|
| :-:    | :-     | :-:    | :-:    | :-:   | :-:     | :- 				|
| DELETE | /      |        |        |       |         | 현재 세션 삭제 	|
*/