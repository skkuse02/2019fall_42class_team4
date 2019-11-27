<template>
  <v-card>
    <v-card-title primary-title>
      <!-- 상품 사진 -->
      <v-img :src=curItem.img_src height="300" contain></v-img>
    </v-card-title>
    <v-card-text>
      <!-- 상품 이름 -->
      <h2>{{curItem.name}}</h2>
      <br>
      <!-- 상품 정보 -->
      <strong>상품 정보</strong>
      <br>
      <div>{{curItem.info}}</div>
      <br>
      <!-- 상품 가격 -->
      <div><strong>가격: </strong>{{curItem.price}}$</div>
      <br>
      <!-- 상품 키워드 -->
      <strong>상품 키워드</strong>
      <br>
      <div v-for="keyword in curItem.rep_keywords" :key="keyword.keyword">
        {{keyword.keyword}}: {{keyword.point}}
      </div>
      <br>
      <!-- 상품 리뷰 목록 -->
      <h2>리뷰 목록</h2>
      <div v-for="review in curItemReviews" :key="review.id">
        <div><strong>리뷰 번호: {{review.id}}</strong></div>
        <div>리뷰 작성날짜: {{review.date}}</div>
        <div>리뷰 작성자: {{review.writer}}</div>
        <div>상품 평점: {{review.item_score}}</div>
        <div>리뷰 평점: {{review.review_score}}</div>
        <div>리뷰 내용: {{review.contents}}</div>
        <br>

        <div><strong>리뷰 키워드</strong></div>
        <div v-for="keyword in review.keyword_list" :key="keyword.keyword">
          <div>{{keyword.keyword}}: {{keyword.point}}</div>
        </div>
        <br>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['curItem', 'curItemReviews']
}
</script>
