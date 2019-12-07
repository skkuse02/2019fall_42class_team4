# Backend API

이 문서에서는 backend에 정의된 rest api의 호출 방법과 반환 값에 대해 기술한다.

user json은 **{ (user) }**, item json은 **{ (item) }**, review json은 **{ (review) }** 와 같이 표시하며

user, item, review json data format은 [**/src/prepareTest/DATA_STRUCTURE.md**](https://github.com/skkuse02/2019fall_42class_team4/blob/master/src/prepareTest/DATA_STRUCTURE.md) 에 기술되어 있다.



## **items**

| Method | Adress               | Params      | Body | Query      | Return       | Remarks |
| :-:    | :-                   | :-:         | :-:  | :-:        | :-:          | :-      |
| GET    | /items/?search=query |             |      | **string** | {(item1),..} | name에 **string**이 포함된 item 반환 |
| GET    | /items/:item_id      | **item_id** |      |            | {(item)}     | id가 **item_id**와 동일한 item 반환 |
| POST   | /items               |             |      |            |              | DB에 item 등록 |
| PUT    | /items/:item_id      | **item_id** |      |            |              | id가 **item_id**와 동일한 item 수정 |
| DELETE | /items/:item_id      | **item_id** |      |            |              | id가 **item_id**와 동일한 item 삭제 |

## **reviews**

| Method | Adress | Params | Body | Query | Return | Remarks |
| :-:    | :-                                              | :-:                         | :-:        | :-:      | :-:            | :- |
| GET    | /reviews/:item_id<br>/:offsetValue/?criteria    | item_id, offsetValue        |            | criteria | {(review1),..} | 정렬된 리뷰 중 offset page에 포함된 리뷰 반환 |
| GET    | /reviews/:item_id                               | item_id                     |            |          | {(review1),..} | 높게 평가된 리뷰 3개 반환 |
| GET    | /reviews/:item_id/:review_id/1                  | item_id, review_id          |            |          | {(review)}     | 지정된 리뷰 반환 | 
| POST   | /reviews/:item_id/:user_id                      | item_id, user_id            | {(review)} |          |                | 새로운 리뷰 등록 |
| PUT    | /reviews/:item_id/:review_id                    | item_id, review_id          | {(review)} |          |                | 리뷰 수정 |
| PUT    | /reviews/:item_id<br>/:review_id/:user_id       | item_id, review_id, user_id |            |          |                | 리뷰 추천 |
| DELETE | /reviews/:item_id<br>/:review_id/:user_id/?mode | item_id, review_id, user_id |            | mode     |                | mode에 따라 리뷰 삭제, 리뷰 추천 취소 |   

#### GET /reviews/:item_id/:offsetValue/?criteria

1. criteria
- rating : 추천을 많이 받은 리뷰 순으로 정렬한다.
- recent : 최근에 등록된 리뷰 순으로 정렬한다.
- keyword : 키워드가 포함된 리뷰 중 추천을 많이 받은 리뷰 순으로 정렬한다.

2. offsetValuse
- -1 인 경우 첫번째 페이지, 다른 숫자의 경우 그 페이지에 포함된 10개의 리뷰를 반환한다.

#### DELETE /reviews/:item_id/:review_id/:user_id/?mode 

1. mode
- recommendation : 리뷰 추천 취소
- review : 리뷰 삭제

## **users**

| Method | Adress                   | Params           | Body     | Query | Return   | Remarks |
| :-:    | :-                       | :-:              | :-:      | :-:   | :-:      | :- |
| GET    | /users/:user_id/?mode    | user_id          |          | mode  | {(user)} | mode에 따라 {(user)}, 구매한 item_id, 추천한 review_id 반환 |
| POST   | /users                   |                  | {(user)} |       |          | BD에 user 등록 |
| PUT    | /users/:user_id          | user_id          | {(user)} |       |          | User keyword, PW 변경 |
| PUT    | /users/:user_id/:item_id | user_id, item_id |          |       |          | Item 구매시 user data에 저장 |
| DELETE | /users/:user_id          | user_id          |          |       |          | DB에서 User 삭제 |
| DELETE | /users/:user_id/:item_id | user_id, item_id |          |       |          | Item 구매시 user data에 저장 |

#### GET /users/:user_id/?mode

1. mode
- purchased : 유저가 구매한 item_id list 
- recommend : 유저가 추천한 review_id list 반환
- *undefined* : 지정된 유저 json data 반환

## **login**

| Method | Adress      | Params | Body   | Query | Return  | Remarks |
| :-:    | :-          | :-:    | :-:    | :-:   | :-:     | :- |
| POST   | /login      |        | ID, PW |       | session | login 정보가 DB와 일치하면 세션 반환 |
| GET    | /login/info |        |        |       | session | 현재 세션 반환 |

## **logout**

| Method | Adress | Params | Body   | Query | Return  | Remarks |
| :-:    | :-     | :-:    | :-:    | :-:   | :-:     | :- |
| DELETE | /      |        |        |       |         | 현재 세션 삭제 |
