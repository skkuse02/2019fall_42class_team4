var expect = require('chai').expect;
var should = require('chai').should;
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
let crypto = require('crypto');
chai.use(chaiHttp);

const baseUrl = 'http://34.239.13.251:3000/api/';
// const baseUrl = 'http://localhost:3000/api/';

async function items() {
	url = baseUrl + 'users'

	await describe('POST item id : 99', function () {
	    it('statusCode = 201', function (done) {
	        chai.request(baseUrl + "items")
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

	await describe('PUT user id : skian, item id : 99', function () {
	    it('PUT response 200', function (done) {
	        chai.request(url)
				.put('/skian/99')
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
					expect(res.body.purchased_items[0]).to.equal(99);
	                done();
	        });
	    })
	})

	await describe('PUT user id : skian, item id : 99', function () {
	    it('PUT response 200', function (done) {
	        chai.request(url)
				.put('/skian/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(202);
	                done();
	        });
	    })
	})

	await describe('DELETE user id : skian, item id : 99', function () {
	    it('statusCode 200', function (done) {
	        chai.request(url)
				.delete('/skian/99')
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
					expect(res.body.purchased_items.length).to.equal(0);
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

	await describe('DELETE item id : 99', function () {
	    it('statusCode = 200', function (done) {
	        chai.request(baseUrl + "items")
				.delete('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					done();
	        });
	    })
	})
}

items();

/*
| Method | Adress                   | Params           | Body     | Query | Return   | Remarks 														|
| :-:    | :-                       | :-:              | :-:      | :-:   | :-:      | :- 															|
| GET    | /users/:user_id/?mode    | user_id          |          | mode  | {(user)} | mode에 따라 {(user)}, 구매한 item_id, 추천한 review_id 반환	|
| POST   | /users                   |                  | {(json)} |       |       	 | BD에 user 등록 												|
| PUT    | /users/:user_id          | user_id          | {(json)} |       |       	 | User keyword, PW 변경 										|
| PUT    | /users/:user_id/:item_id | user_id, item_id |          |       |       	 | Item 구매시 user data에 저장 									|
| DELETE | /users/:user_id          | user_id          |          |       |       	 | DB에서 User 삭제 												|
| DELETE | /users/:user_id/:item_id | user_id, item_id |          |       |       	 | Item 구매시 user data에 저장 									|
*/