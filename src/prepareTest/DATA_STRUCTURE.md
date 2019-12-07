# this document shows the data structure in the firestore

## **User**

###
    {
        id: "user_id",
        password: "hashed_password",
        name: "user_name",
        purchased_items: ["item_id", ...],
        posted_reviews: ["item_id(space)review_id", ...],
        recommended_reviews: ["item_id(space)review_id", ...],
        customized_keyword: ["keywords", ...]
    }
##### 설명: User의 암호는 hash된 값으로 저장된다.
##### 설명: User가 구매한 상품과, 남긴 리뷰, 추천한 리뷰, 설정한 키워드들의 정보는 User 안에 저장된다.


## **Item**

###
    {
        id: "item_id",
        review_id_maker: "review_id_maker",
        item_img_url: "item_img_url",
        desc_img_url: "desc_img_url",
        name: ["item_tag1, ..."],
        price: "price",
        similar_item: ["item_id1", "item_id2"],
        total_star_sum: total_star_sum,
        total_review_num: total_review_num,
        total_keywords_map: {"keyword1":keyword1_score, ...},
        review: <<Review_Collection>>
    }

##### 설명: review_id_maker는 생성될 review_id를 저장하며, 리뷰가 생성되는 경우 1을 더한다.
##### 설명: item_img와 description_img는 firebase storage의 해당 폴더("item_img/", "description_img/")에 "(item_id).png"파일로 저장된다.
##### 설명: Item의 name에 상품의 tag가 array로 묶여서 저장된다. 상품 검색시에 활용된다. (전부 소문자로 저장 : case insensitive)
##### 설명: Item의 similar_id에 유사 상품의 item_id 2개가 array로 묶여서 저장된다.
##### 설명: total_star_sum, total_review_num과 keywords_map은 새로운 리뷰가 들어올 때마다 업데이트하며, 상품 평점과 대표 키워드를 쉽게 구하기 위해서 사용되었다. total_star_sum과 total_review_num을 통해서 상품 평점을 도출할 수 있다.
##### 설명: keywords_map을 통해서 keyword_set에 해당하는 키워드가 각각 몇 번씩 나왔는지 알 수 있으며, 대표 키워드를 도출할 수 있다.
##### 설명: Item의 review collection에 상품에 대한 Review가 소속된다.

## **Review**

###
    {
        id: "review_id"
        author: "author"
        title: "title"
        content: "content"
        last_modified_time: last_modified_time
        keywords_map: [{name: "keyword", score: "keyword_score"}, ...]
        keywords: ["keyword", ...]
        item_rating: item_rating
        review_rating: total_num_of_review_recommendation
    }
##### 설명: Review의 keyword에 해당 리뷰에서 추출된 키워드들이 저장된다.
##### 설명: Review의 item_rating에는 해당 리뷰가 상품을 평가한 별점을, review_rating에는 해당 리뷰에 대한 추천수를 저장한다.
