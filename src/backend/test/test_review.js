var expect = require('chai').expect;
var should = require('chai').should;
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = 'http://localhost:3000/api/';


async function setuser() {
	url1 = baseUrl + 'users';

	await describe('POST user id : skian', function () {
	    it('statusCode = 201', function (done) {
	        chai.request(url1)
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
}

async function deleteuser() {
	url1 = baseUrl + 'users';

	await describe('DELETE user id : skian', function () {
	    it('statusCode = 200', function (done) {
	        chai.request(url1)
				.delete('/skian')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					done();
	        });
	    })
	})
}

async function usercheck() {
	url1 = baseUrl + 'users';
}

async function insertitem() {
	url2 = baseUrl + 'items';

	await describe('POST item id : 99', function () {
	    it('statusCode = 201, GET response item id = 99', function (done) {
	        chai.request(url2)
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
}

async function deleteitem() {
	url2 = baseUrl + 'items';

	await describe('DELETE item id : 99', function () {
	    it('statusCode = 200', function (done) {
	        chai.request(url2)
				.delete('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					done();
	        });
	    })
	})
}

async function reviews() {
	url = baseUrl + 'reviews'

	await describe('GET review of item 99', function () {
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

	await describe('POST review', function () {
	    it('statusCode = 201', function (done) {
	        chai.request(url)
				.post('/99/skian')
				.send({
					title : "Good headphone",
					content : "sound quality is super great",
					item_rating : 4.5
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();
	        });
	    })
	})

	await describe('GET review of item 99', function () {
	    it('statusCode = 404, # of reviews = 1, field attributes are checked', function (done) {
	        chai.request(url)
				.get('/99')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.length).to.equal(1);
					expect(res.body[0].id).to.equal(0);
					expect(res.body[0].title).to.equal("Good headphone");
					expect(res.body[0].content).to.equal("sound quality is super great");
					expect(res.body[0].item_rating).to.equal(4.5);
					expect(res.body[0].review_rating).to.equal(0);
	                done();                              
	        });
	    })
	})

	await describe('GET review id : 0', function () {
	    it('GET response 200, review attributes are checked', function (done) {
	        chai.request(url)
				.get('/99/0/1')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal(0);
					expect(res.body.title).to.equal("Good headphone");
					expect(res.body.content).to.equal("sound quality is super great");
					expect(res.body.item_rating).to.equal(4.5);
					expect(res.body.review_rating).to.equal(0);
	                done();                              
	        });
	    })
	})

	await describe('PUT review id : 0', function () {
	    it('PUT response 200', function (done) {
	        chai.request(url)
				.put('/99/0')
				.send({
					title : "Bad headphone",
					content : "sound quality is horrible",
					item_rating : 1.5
				})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();

	        });
	    })
	})

	await describe('GET review id : 0', function () {
	    it('GET response 200, field value are checked', function (done) {
	        chai.request(url)
				.get('/99/0/1')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal(0);
					expect(res.body.title).to.equal("Bad headphone");
					expect(res.body.content).to.equal("sound quality is horrible");
					expect(res.body.item_rating).to.equal(1.5);
					expect(res.body.review_rating).to.equal(0);
	                done();                              
	        });
	    })
	})

	await describe('PUT review recommend userid : skian review id : 0', function () {
	    it('PUT response 200', function (done) {
	        chai.request(url)
				.put('/99/0/skian')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
	                done();

	        });
	    })
	})

	await describe('GET review id : 0', function () {
	    it('GET response 200, field value are checked', function (done) {
	        chai.request(url)
				.get('/99/0/1')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal(0);
					expect(res.body.title).to.equal("Bad headphone");
					expect(res.body.content).to.equal("sound quality is horrible");
					expect(res.body.item_rating).to.equal(1.5);
					expect(res.body.review_rating).to.equal(1);
	                done();                              
	        });
	    })
	})

	//await usercheck();

	await describe('DELETE review id : 0\'s recommendation', function () {
	    it('DELETE response 204, field value are checked', function (done) {
	        chai.request(url)
				.delete('/99/0/skian/')
				.query({mode : "recommendation"})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(204);
	                done();                              
	        });
	    })
	})

	await describe('GET review id : 0', function () {
	    it('GET response 200, field value are checked', function (done) {
	        chai.request(url)
				.get('/99/0/1')
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal(0);
					expect(res.body.title).to.equal("Bad headphone");
					expect(res.body.content).to.equal("sound quality is horrible");
					expect(res.body.item_rating).to.equal(1.5);
					expect(res.body.review_rating).to.equal(0);
	                done();                              
	        });
	    })
	})

	//what whould be if other person attempt to delete?
	await describe('DELETE item id : 99', function () {
	    it('statusCode = 204', function (done) {
	        chai.request(url)
				.delete('/99/0/skian/')
				.query({mode : "review"})
				.end(function(err, res) {
	                expect(err).to.be.null;
					expect(res.statusCode).to.equal(204);
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

async function total() {
	await setuser();
	await insertitem();
	await reviews();
	await deleteitem();
	await deleteuser();
}

total();
/*
## **reviews**

| Method | Adress											| Params						| body		| Query		| Return 		| Remarks 										|
| :-:    | :-                                              	| :-:           				| :-:       | :-:     	| :-:           | :- 											|
| GET    | /reviews/:item_id<br>/:offsetValue/?criteria		| item_id, offsetValue			|			| criteria	| {(review1),..}| 정렬된 리뷰 중 offset page에 포함된 리뷰 반환	|
| GET    | /reviews/:item_id								| item_id           			|			|         	| {(review1),..}| 높게 평가된 리뷰 3개 반환						|
| GET    | /reviews/:item_id/:review_id/1					| item_id, review_id			|			|         	| {(review)}	| 지정된 리뷰 반환 								|
| POST   | /reviews/:item_id/:user_id                 		| item_id, user_id				| {(json)}	|         	|     			| 새로운 리뷰 등록 								|
| PUT    | /reviews/:item_id/:review_id                 	| item_id, review_id	    	| {(json)}	|         	| 		      	| 리뷰 수정 										|
| PUT    | /reviews/:item_id<br>/:review_id/:user_id   		| item_id, review_id, user_id	|           |         	|               | 리뷰 추천 										|
| DELETE | /reviews/:item_id<br>/:review_id/:user_id/?mode  | item_id, review_id, user_id	|           | mode    	|               | mode에 따라 리뷰 삭제, 리뷰 추천 취소 			|
*/