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
      </v-flex>

      <!-- 상품 비교 카드 -->
      <v-flex xs4 sm4 md4 lg4 v-for="i in similarItems.length" :key="i">
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
    const run = async () => {
      // 현재 아이템 불러오기
      const itemId = this.$route.params.id
      const res = await this.$http.get('/api/items/' + itemId)
      this.curItem = res.data[0]

      // 현재 아이템의 리뷰 불러오기
      for (let i in this.curItem.rep_reviews) {
        const reviewId = this.curItem.rep_reviews[i]
        const res = await this.$http.get('/api/reviews/' + reviewId)
        this.curItemReviews.push(res.data[0])
      }

      // 유사 아이템 불러오기
      for (let i in this.curItem.similar_items) {
        const similarId = this.curItem.similar_items[i]
        const res = await this.$http.get('/api/items/' + similarId)
        this.similarItems.push(res.data[0])
      }

      // 유사 아이템의 리뷰 불러오기
      for (let i in this.similarItems) {
        var repReviews = this.similarItems[i].rep_reviews
        var asembling = []
        for (let j in repReviews) {
          const reviewId = repReviews[j]
          const res = await this.$http.get('/api/reviews/' + reviewId)
          asembling.push(res.data[0])
        }
        this.similarItemsReviews.push(asembling)
      }
    }

    run()
  }
}
</script>
