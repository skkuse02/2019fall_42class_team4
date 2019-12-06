<template>
  <v-layout row wrap>
    <v-card width="100%">
      <v-card-title primary-title>
        <h2>Review List</h2>
      </v-card-title>
      <v-flex xs12>
        <v-divider></v-divider>
        <!-- 리뷰 정렬 선택 -->
        <v-card-text>
          <span id="reviewSortingCriteria">Sorting Criteria</span>
          <v-btn small dark v-bind:color="btnColor1 ? 'success' : 'blue-grey'" @click="SortRating()">Rating</v-btn>
          <v-btn small dark v-bind:color="btnColor2 ? 'success' : 'blue-grey'" @click="SortRecent()">Recent</v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                v-bind:color="btnColor3 ? 'success' : 'blue-grey'"
                dark
                v-on="on"
                small
              >
                {{criteriaKeyword}}
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="keyword in keywordsList" :key="keyword"
                @click="SortKeyword(keyword)"
              >
                <v-list-tile-title>{{ keyword }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-text>
      </v-flex>
      <v-flex xs12 v-for="review of curItemReviews" :key="review.id">
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
          <div><div id="cardTextReviewRating">{{review.review_rating}}</div><v-btn icon @click="Like(review)"><v-icon>mdi-thumb-up-outline</v-icon></v-btn></div>
        </v-card-text>
      </v-flex>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ['curItem', 'curItemReviews'],
  data () {
    return {
      keywordsList: [
        'bass',
        'battery',
        'bluetooth',
        'bone conduction',
        'customer service',
        'design',
        'microphone',
        'mid',
        'noise canceling',
        'price',
        'product quality',
        'sound quality',
        'treble',
        'usability'
      ],
      criteriaKeyword: 'keyword',
      btnColor1: true,
      btnColor2: false,
      btnColor3: false
    }
  },
  methods: {
    SortRating () {
      this.btnColor1 = true
      this.btnColor2 = false
      this.btnColor3 = false
      this.criteriaKeyword = 'keyword'
      this.$emit('changeSortCriteria', { criteria: 'rating', setKeyword: '' })
    },
    SortRecent () {
      this.btnColor1 = false
      this.btnColor2 = true
      this.btnColor3 = false
      this.criteriaKeyword = 'keyword'
      this.$emit('changeSortCriteria', { criteria: 'recent', setKeyword: '' })
    },
    SortKeyword (keyword) {
      this.btnColor1 = false
      this.btnColor2 = false
      this.btnColor3 = true
      this.criteriaKeyword = keyword
      this.$emit('changeSortCriteria', { criteria: 'keyword', setKeyword: keyword })
    },
    Like (review) {

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
