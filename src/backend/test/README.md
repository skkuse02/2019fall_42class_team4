# SCENARIO: 

1. 회원가입
2. 로그인
3. 개인정보 변경 (키워드 변경, 비밀번호 변경)
4. 상품 검색
5. 유사 상품 비교, 선택
6. 리뷰 Navigation (평점순, 최신순, 키워드 포함 조건)
7. 상품 구매 + 내가 구매한 상품 목록 보기 + 상품 삭제
8. 리뷰 작성 + 리뷰 삭제
9. 리뷰 추천, 추천 취소 + 내가 추천한 리뷰 목록 보기 

# DEMONSTRATION:

Reference 사이트인 AMAZON과 ReviewRevolution의 리뷰 탐색 편의성 비교 

# Automized 테스트 (integration test) 실행 방법
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
# manual 테스트 루틴 :

1. 첫화면
- 아이템 리스트 확인
- 검색 기능 확인
  - 메인 페이지 말고 다른 페이지에서 검색해도 잘 동작하는지 확인

2. 로그인 없이 할 수 없는 동작 확인하기
- myPage 관련 기능 사용 X
- 구매 X
- 리뷰 추천 X

3. 회원가입

4. 장바구니 기능
- 추가, 삭제 확인

5. 구매 기능
- 상품 상세 페이지에서 구매
- 장바구니에서 구매 -> 장바구이에서 사라졌는지도 확인
- 중복 구매 불가능 확인
- Purchased Items 페이지 들어가서 구매 취소
- 취소 후 다시 구매 가능한지 확인

6. 리뷰 작성 기능
- 구매한 상품에 대한 리뷰 작성
  - 리뷰 내용 없을 경우 Deny
- 리뷰 작성 후
  - 기존 리뷰 잘 가져오는지 확인
  - 상품 상세페이지가서 리뷰 최신 순으로 정렬 후, 작성한 리뷰 확인
- 리뷰 삭제
  - 리뷰를 작성하지 않고 삭제 클릭 시 Deny
  - 리뷰 작성을 다시 눌러 불러와지는 리뷰가 없는지 확인
  - 리뷰 삭제 후 ,상품 상세페이지로 가서 잘 삭제되었나 확인


7. 유사 상품 비교 기능
- 유사 상품 클릭 시, 상세 페이지로 넘어가는지 확인

8. 리뷰 추천 기능
- 리뷰 추천 클릭 시 추천수 증가 확인
- 다시 클릭해서 리뷰 추천 취소 확인
- Recommended Reviews 페이지에서 확인
- Recommended Reviews 페이지에서 취소 시, 반영 되는지 상품 상세정보가서 확인

9. Keyword Setting 페이지
- keyword 변경이 잘 되는지 확인

10. Password Change 페이지
- password 변경이 잘 되는지 확인
