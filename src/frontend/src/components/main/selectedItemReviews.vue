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
          <div>
            <div id="cardTextReviewRating">{{review.review_rating}}</div>
            <v-btn v-if="review.IsRecommended === true" icon @click="Like(review)"><v-icon>mdi-thumb-up</v-icon></v-btn>
            <v-btn v-else icon @click="Like(review)"><v-icon>mdi-thumb-up-outline</v-icon></v-btn>
            <v-btn icon @click="UnLike(review)"><v-icon>mdi-thumb-down-outline</v-icon></v-btn>
          </div>
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
      user: this.$store.state.userInfo,
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
    async Like (review) {
      if (this.user === null) {
        alert('추천은 로그인 후 이용해 주세요.')
        return
      }

      const res = await this.$http.put('/api/reviews/' + this.curItem.id + '/' + review.id + '/' + this.user.id)
      if (res.status === 200) {
        // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
        const resU = await this.$http.get('/api/users/' + this.user.id)
        this.$store.commit('MODIFY', resU.data)
        alert('추천 완료')
        window.location.reload()
      } else if (res.status === 202) {
        alert('이미 추천한 리뷰입니다.')
      }
    },
    async UnLike (review) {
      if (this.user === null) {
        alert('추천은 로그인 후 이용해 주세요.')
        return
      }

      const res = await this.$http.delete('/api/reviews/' + this.curItem.id + '/' + review.id + '/' + this.user.id + '/?mode=recommendation')
      if (res.status === 204) {
        // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
        const resU = await this.$http.get('/api/users/' + this.user.id)
        this.$store.commit('MODIFY', resU.data)
        alert('추천 취소')
        window.location.reload()
      } else if (res.status === 202) {
        alert('추천한 적이 없습니다.')
      }
    },
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
