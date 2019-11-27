<template>
  <v-card height="100%">
    <v-card-title primary-title>
      <div>
        <h2>{{similarItems[i-1].name}}</h2>
      </div>
    </v-card-title>
    <v-card-text>
        <h4>대표 리뷰</h4>
        <div v-for="review in similarItemsReviews[i-1]" :key="review.id">
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
  props: {
    'similarItems': Array,
    'similarItemsReviews': Array,
    'i': Number
  }
}
</script>
