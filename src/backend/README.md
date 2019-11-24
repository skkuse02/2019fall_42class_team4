# backend

### 프로젝트 준비
1. 모듈 설치
```
npm install
```

1. firebase 설치
```
npm install firebase
```

1. firebaseConfig.json<br>
    backend/firebaseConfig.json 만들고 내용입력

### 프로젝트 실행

```
npm start
```

### 진행상황

급하게 readme.md 먼저 올립니다.

rest api를 이용하면 됩니다. (주소/api/items(or users or reviews)/:id)
post, put의 경우 body에 json형식으로 보내면 firebase에 올라갑니다.
get은 백엔드에서 로그로 확인할 수 있습니다.

이후 진행
rest api status code 넣을것
get을 데이터로 보내도록 할  
중복된 Id가 있는 경우는 따로 처리하도록 할 것
login system
