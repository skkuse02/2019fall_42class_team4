# 2019fall_42class_team4

# Review Revolution

![](./docs/photo/logo.png)

### 저희는 **신개념 사용자 리뷰 비교,분석 서비스 시스템 in 웹 쇼핑몰**을 만들고 있습니다.

## **Team Member**

## - 윤성경
## - 정창호
## - 유종현
## - 김진태

# DEMO VIDEO #

### DEMONSTRATION:

#### Reference 사이트인 AMAZON과 비교한 ReviewRevolution의 쇼핑 편의성 
### :> 상품과 리뷰에 키워드 tag가 붙어서 한눈에 보기 쉽다.
### :> 상품을 비교하는 부분에서, 단순 SPEC만이 아닌, 사용자들의 경험에서 나온 느낌들을 리뷰와 키워드를 통해 비교할 수 있다.
- **AMAZON**
![](./demoVideos/amazon.gif)
- **REVIEW REVOLUTION**
![](./demoVideos/reviewRevolution.gif)
### SCENARIO: 

### 1. 회원가입
![](./demoVideos/register.gif)
### 2. 로그인
![](./demoVideos/login.gif)
### 3. 개인정보 변경 (키워드 변경, 비밀번호 변경)
![](./demoVideos/keywordChange.gif)
### 4. 상품 검색
![](./demoVideos/itemSearch.gif)
### 5. 유사 상품 비교, 선택
![](./demoVideos/similarItemComparison.gif)
### 6. 리뷰 Navigation (평점순, 최신순, 키워드 포함 조건)
![](./demoVideos/reviewNavigation.gif)
### 7. 상품 구매 + 내가 구매한 상품 목록 보기 + 상품 삭제
![](./demoVideos/itemPurchase.gif)
### 8. 리뷰 작성 + 리뷰 삭제
![](./demoVideos/reviewPostPutDelete.gif)
### 9. 리뷰 추천, 추천 취소 + 내가 추천한 리뷰 목록 보기 
![](./demoVideos/reviewRecommendation.gif)

- ### 프론트엔드 접속 주소 : http://review-revolution-client.s3-website-us-east-1.amazonaws.com <배포 종료> (2019/12/8 기준)

## Automized 테스트 (integration test) 실행 방법
/src/backend/ 에서

npm i 입력 후
mocha test/test_item.js
mocha test/test_user.js
mocha test/test_review.js --timeout 30000
mocha test/test_loginout.js
를 차례로 실행

## Automized 테스트 결과 
```
PS C:\Users\mdy60\OneDrive\바탕 화면\소프트웨어 공학개론\project\2019fall_42class_team4\src\backend> mocha test/test_item.js
  GET all items
    √ statusCode = 200, # of items = 20 (1243ms)

  POST item id : 99
    √ statusCode = 201 (798ms)

  GET item id : 99

  PUT item id : 99
    √ PUT response 200 (893ms)

  GET item id : 99
    √ GET response 200, field value are checked (651ms)

  DELETE item id : 99
    √ statusCode = 200 (854ms)

  GET item id : 99
    √ statusCode = 404 (829ms)


  7 passing (6s)

PS C:\Users\mdy60\OneDrive\바탕 화면\소프트웨어 공학개론\project\2019fall_42class_team4\src\backend> mocha test/test_user.js


  POST item id : 99
    √ statusCode = 201 (667ms)

  POST user id : skian
    √ statusCode = 201 (858ms)

  GET user id : skian
    √ GET response 200, user attributes are checked (861ms)

  PUT user id : skian
    √ PUT response 200 (828ms)

  GET user id : skian
    √ GET response item  200, field values are checked (854ms)

  PUT user id : skian
    √ PUT response 200 (814ms)

  GET user id : skian
    √ GET response item  200, field values are checked (840ms)

  PUT user id : skian, item id : 99
    √ PUT response 200 (821ms)

  GET user id : skian
    √ GET response item  200, field values are checked (798ms)

  PUT user id : skian, item id : 99
    √ PUT response 200 (799ms)

  DELETE user id : skian, item id : 99
  GET user id : skian
    √ GET response item  200, field values are checked (788ms)

  DELETE user id : skian
    √ statusCode = 200 (948ms)

  GET user id : skian
    √ statusCode = 404 (832ms)

  DELETE item id : 99
    √ statusCode = 200 (807ms)


  15 passing (13s)

PS C:\Users\mdy60\OneDrive\바탕 화면\소프트웨어 공학개론\project\2019fall_42class_team4\src\backend>
PS C:\Users\mdy60\OneDrive\바탕 화면\소프트웨어 공학개론\project\2019fall_42class_team4\src\backend> mocha test/test_review.js --timeout 30000        


  POST user id : skian
    √ statusCode = 201 (845ms)

  POST item id : 99
    √ statusCode = 201, GET response item id = 99 (834ms)

  GET review of item 99
    √ statusCode = 404 (800ms)

  POST review
    √ statusCode = 201 (1452ms)

  GET review of item 99
    √ statusCode = 404, # of reviews = 1, field attributes are checked (672ms)

  GET review id : 0
    √ GET response 200, review attributes are checked (808ms)

  PUT review id : 0
    √ PUT response 200 (1915ms)

  GET review id : 0
    √ GET response 200, field value are checked (793ms)

  PUT review recommend userid : skian review id : 0
    √ PUT response 200 (1371ms)

  GET review id : 0
    √ GET response 200, field value are checked (804ms)

  GET user id : skian
    √ GET response item  200, original value doesn't modified
 posted_reviews & recommended_reviews are modified (796ms)

  GET item id : 99
    √ GET response 200, original value doesn't modified
 review_id_maker & total_review & total_star_sum are modified (807ms)

  DELETE review id : 0's recommendation
    √ DELETE response 204, field value are checked (1389ms)

  GET review id : 0
  DELETE item id : 99
    √ statusCode = 204 (2033ms)

  GET item id : 99
    √ statusCode = 404 (863ms)

  DELETE item id : 99
    √ statusCode = 200 (796ms)

  DELETE user id : skian
    √ statusCode = 200 (1026ms)


  18 passing (19s)

PS C:\Users\mdy60\OneDrive\바탕 화면\소프트웨어 공학개론\project\2019fall_42class_team4\src\backend>
PS C:\Users\mdy60\OneDrive\바탕 화면\소프트웨어 공학개론\project\2019fall_42class_team4\src\backend> mocha test/test_loginout.js


  POST user id : skian
    √ statusCode = 201 (626ms)

  GET user id : skian
    √ GET response 200, user attributes are checked (851ms)

  POST user id : skian again
    √ statusCode = 400 (844ms)

  POST user id to login but password wrong
    √ statusCode = 400 (794ms)

  POST user id to login but ID wrong
    √ statusCode = 400 (800ms)

  POST user id to login
    √ statusCode = 400 (801ms)

  GET session information
    √ statusCode = 200 (398ms)

  DELETE user id to login
    √ statusCode = 400 (413ms)

  DELETE user id : skian
    √ statusCode = 200 (1078ms)


  9 passing (7s)
```

### 진행상황 
### - 구현 완료, 백엔드는 AWS EC2, 프론트엔드는 AWS S3에 배포 완료. (2019/12/8)
### - 프론트엔드 접속 주소 : http://review-revolution-client.s3-website-us-east-1.amazonaws.com <배포 종료> (2019/12/8 기준)
### - design specification 완료 (2019/11/12)
### - design specification 4차 checkpoint : Testing Plan, State Diagram, Package Diagram 보완 (2019/11/12)
### - design specification 3차 checkpoint : Protocol, Database Design 작성 (2019/11/09)
### - design specification 2차 checkpoint : preface, introduction, testing plan, development plan outline 작성 (2019/11/08)
### - design specification 1차 checkpoint : System architecture overall, frontend, backend 작성 (2019/11/06)
### - requirement 완료 (2019/11/03)
### - requirement 4차 checkpoint : 전체 프로젝트 확인, 비교 및 feedback (2019/11/03) 
### - requirement 3차 checkpoint : appendix 전까지 (2019/11/03)
### - requirement 2차 checkpoint : system requirement까지 (2019/10/31)
### - requirement 1차 checkpoint : user requirement까지 (2019/10/30)
### - proposal 마지막 수정 (2019/10/19)
### - proposal 완료 (2019/10/11)
