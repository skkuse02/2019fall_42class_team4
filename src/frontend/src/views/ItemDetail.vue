<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <!-- 상품 상세 정보 표시할 카드 -->
      <v-flex xs12 sm12 md12 lg12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2>{{curItem.name}}</h2>
            </div>
          </v-card-title>
          <v-card-text>
            <!-- 상품 사진 -->
            <v-img :src=curItem.img_src height="300" contain></v-img>

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
            <strong>리뷰 목록</strong>
            <div v-for="review in curItemReviews" :key="review.id">
              <div>리뷰 번호: {{review.id}}</div>
              <div>리뷰 작성날짜: {{review.date}}</div>
              <div>리뷰 작성자: {{review.writer}}</div>
              <div>상품 평점: {{review.item_score}}</div>
              <div>리뷰 평점: {{review.review_score}}</div>
              <div>리뷰 내용: {{review.contents}}</div>
              <br>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- 상품 비교 카드 -->
      <v-flex xs4 sm4 md4 lg4 v-for="item in similarItems" :key="item.id">
        <v-card height="100%">
          <v-card-title primary-title>
            <div>
              <h2>{{item.name}}</h2>
            </div>
          </v-card-title>
          <v-card-text>
              <h4>{{item.rep_reviews}}</h4>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      // 현재 아이템과 리뷰
      curItem: {},
      curItemReviews: [],

      // 유사 아이템 목록과 리뷰
      similarItems: [],
      similarItemsReviews: []
    }
  },
  created () {
    // 현재 아이템 불러오기
    var itemId = this.$route.params.id
    this.$http.get('/api/items/' + itemId)
      .then((res) => {
        this.curItem = res.data[0]
      })
      // 현재 아이템의 리뷰 불러오기
      .then(() => {
        this.curItem.rep_reviews.forEach((reviewId) => {
          this.$http.get('/api/reviews/' + reviewId)
            .then((res) => {
              this.curItemReviews.push(res.data[0])
            })
        })
      })
      // 현재 선택된 아이템과 비슷한 아이템 불러오기
      .then(() => {
        this.curItem.similar_items.forEach((similar) => {
          this.$http.get('/api/items/' + similar)
            .then((res) => {
              this.similarItems.push(res.data[0])
            })
        })
      })
      // 유사 아이템의 리뷰 불러오기
      .then(() => {
        console.log(this.similarItems)
        console.log(this.similarItems[0])
        // Vue 특유의 Observer 형식으로 배열이 바뀌어서 자바스크립트 내에서 배열이 사용 불가하네요...
        // 어케 하지... ㅠㅠ
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>
