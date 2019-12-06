# Backend API

## **items**

### GET      /items/?search=query       
### GET      /items/:item_id
### POST     /items/
### PUT      /items/:item_id
### DELETE   /items/:item_id

## **reviews**

### GET      /reviews/:item_id/:offsetValue/?criteria   (lastReviewId = -1 when first page, criteria = "rating", "recent", "keyword"
###                                                    (when criteria = "keyword", additional query : keyword = "requestedKeyword")
### GET      /reviews/:item_id            (getting top-rated reviews)
### GET      /reviews/:item_id/:review_id           // user가 가지고 있는 기존 review 정보를 주기 위한 api
### POST     /reviews/:item_id/:user_id
### PUT      /reviews/:item_id/:review_id           
### PUT      /reviews/:item_id/:review_id/:user_id  // REVIEW RECOMMENDATION
### DELETE   /reviews/:item_id/:review_id
### DELETE   /reviews/:item_id/:review_id/:user_id/?mode    (mode: recommendation = CANCEL REVIEW RECOMMENDATION, review = DELETE REVIEW) 

## **users**

### GET      /users/:user_id/?mode                          (mode: purchased = request all the purchased items, recommend = request all the recommended reviews, undefined = request user object)
### POST     /users/
### PUT      /users/:user_id/                       // CHANGE the USER INFORMATION
### PUT      /users/:user_id/:item_id               // BUY the ITEM
### DELETE   /users/:user_id/
### DELETE   /users/:user_id/:item_id               // CANCEL ITEM PURCHASE

## **login**

### POST     /login
### POST     /login/info