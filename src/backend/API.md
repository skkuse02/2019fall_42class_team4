# Backend API

## **items**

### GET      /items/?search=query
### GET      /items/:item_id
### POST     /items/
### PUT      /items/:item_id
### DELETE   /items/:item_id

## **reviews**

### GET      /reviews/:item_id/:lastReviewId/?criteria   (lastReviewId = -1 when first page, criteria = "rating", "recent", "keyword"
###                                                    (when criteria = "keyword", additional query : keyword = "requestedKeyword")
### GET      /reviews/:item_id            (getting top-rated reviews)
### POST     /reviews/:item_id
### PUT      /reviews/:item_id/:review_id
### DELETE   /reviews/:item_id/:review_id

## **users**

### GET      /users/:user_id
### POST     /users/
### PUT      /users/:item_id
### DELETE   /users/:item_id

