# this document shows the data structure in the firestore

## **User**

### 
    {
        user_id: "user_id"
        , password: "hashed_password"
        , my_purchased_item: ["item_name", ...]
        , my_posted_review: "review_id"
        , my_recommend_review: ["review_id", ...]
    }
##### 설명: User의 암호는 hash된 값으로 저장된다. 
##### 설명: User가 구매한 상품과, 남긴 리뷰, 추천한 리뷰들의 정보는 User 안에 저장된다. . 


## **Item**

### 
    {
        item_id: "item_id"
        , item_img
        , description_img
        , price: "price"
        , similar_item: ["item_id", ...]
        , review: <<Review_Collection>>
        , total_star_sum: total_star_sum
        , total_review_num: total_review_num
        , keywords_num: {"keyword1":total_keyword1_num, ...}
    }
##### 설명: Item의 similar_id에 유사 상품의 item_id가 array로 묶여서 저장된다. 
##### 설명: Item의 review에 상품에 대한 Review가 Review_Collection으로 소속된다.
##### 설명: total_star_sum과 total_review_num을 통해서 상품 평점을 도출할 수 있다.
##### 설명: keywords_num을 통해서 keyword_set에 해당하는 키워드가 각각 몇 번씩 나왔는지 알 수 있으며, 대표 키워드를 도출할 수 있다.
##### 설명: total_star_su, total_review_num과 keyword_num은 새로운 리뷰가 들어올 때마다 업데이트하며, 상품 평점과 대표 키워드를 쉽게 구하기 위해서 사용되었다.

## **Review**

### 
    {
        review_id: "review_id"
        , content: "content"
        , keyword: ["extracted_keyword1", ...]
        , star_num: star_num 
        , review_rating: total_num_of_review_recommendation
    }
##### 설명: Review의 keyword에 해당 리뷰에서 추출된 키워드들이 저장된다. 
##### 설명: Review의 star_num에는 해당 리뷰가 상품을 평가한 별점을, review_rating에는 해당 리뷰에 대한 추천수를 저장한다.

