<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-card width="100%">
        <v-card-title primary-title>
          <h2>Review List</h2>
        </v-card-title>
        <v-flex xs12 v-for="review of userReviews" :key="review.itemId + ' ' + review.id">
          <v-divider></v-divider>
          <v-card-text>
            <!-- 리뷰 작성자, 시간 -->
            <div><strong>{{review.author}}</strong> {{review.timeString}}</div>
            <!-- 상품 평점 -->
            <v-rating
              v-model="review.item_rating"
              readonly
              small
              background-color="orange lighten-3"
              color="orange"
              half-increments
            >
            </v-rating>
            <!-- 상품 키워드 -->
            <span v-for="keyword of review.keywords_map" :key="keyword.name">
              <v-chip disabled v-if="keyword.score > 0" color="blue" text-color="white">{{keyword.name}}</v-chip>
              <v-chip disabled v-else-if="keyword.score < 0" color="red" text-color="white">{{keyword.name}}</v-chip>
            </span>
            <br>
            <!-- 리뷰 제목 -->
            <div id="reviewTitle">{{review.title}}</div>
            <!-- 리뷰 내용 -->
            <div>{{review.content}}</div>
            <br>
            <!-- 리뷰 평점 -->
            <div>
              <div id="cardTextReviewRating">{{review.review_rating}}</div>
            <v-btn v-if="review.isRecommended !== null" icon @click="Like(review)"><v-icon>mdi-thumb-up</v-icon></v-btn>
            <v-btn v-else icon @click="Like(review)"><v-icon>mdi-thumb-up-outline</v-icon></v-btn>
              <v-btn icon @click="UnLike(review)"><v-icon>mdi-thumb-down-outline</v-icon></v-btn>
            </div>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      user: this.$store.state.userInfo,
      userReviews: []
    }
  },
  async created () {
    const recommendedReview = this.user.recommended_reviews

    // 추천한 review 가져오기
    let idx = 0
    for (let review of recommendedReview) {
      const itemId = review.split(' ')[0]
      const reviewId = review.split(' ')[1]
      const res = await this.$http.get('/api/reviews/' + itemId + '/' + reviewId + '/1')
      res.data.itemId = itemId
      res.data.index = idx
      idx++
      this.userReviews.push(res.data)
    }
  },
  methods: {
    async Like (review) {
      const res = await this.$http.put('/api/reviews/' + review.itemId + '/' + review.id + '/' + this.user.id)
      if (res.status === 200) {
        alert('추천 완료')
        review.review_rating++
      } else if (res.status === 202) {
        alert('이미 추천한 리뷰입니다.')
      }
    },
    async UnLike (review) {
      const res = await this.$http.delete('/api/reviews/' + review.itemId + '/' + review.id + '/' + this.user.id + '/?mode=recommendation')
      if (res.status === 204) {
        alert('추천 취소')
        this.userReviews = this.userReviews.filter(eachReview => eachReview.id !== review.id)
        // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
        const resU = await this.$http.get('/api/users/' + this.user.id)
        this.$store.commit('MODIFY', resU.data)
      } else if (res.status === 202) {
        alert('추천한 적이 없습니다.')
      }
    }
  }
}
</script>

<style scoped>
#reviewTitle {
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid grey;
  margin-top: 10px;
}
#cardTextReviewRating {
  border: 2px solid grey;
  border-radius: 5px;
  padding: 4px;
  display: inline;
}
#reviewSortingCriteria {
  font-weight: bold;
  font-size: 20px;
}
</style>
