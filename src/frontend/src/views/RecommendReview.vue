<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-card width="100%">
        <v-card-title primary-title>
          <h2>Review List</h2>
        </v-card-title>
        <v-flex xs12 v-for="review of userReviews" :key="review.id">
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
            <div><div id="cardTextReviewRating">{{review.review_rating}}</div><v-btn icon><v-icon>mdi-thumb-up-outline</v-icon></v-btn></div>
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
    const recommendedReview = this.user.recommended_review
    console.log(recommendedReview)
    /*
    // 추천한 review 가져오기
    for (review of recommendedREview) {
      const review_id = review.split()[1]
      const res = await this.$http.get('/api/reviews/' + item.id + '/' + review_id)
      this.userReviews.push(res.data)
    }
    */
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
