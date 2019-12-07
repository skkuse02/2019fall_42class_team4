<template>
  <v-card height="100%">
    <v-container fluid grid-list-md>
      <v-flex xs12>
        <v-card flat>
          <!-- 상품 사진 -->
          <span style="cursor: pointer;" @click="pageReload(similarItems[i-1].id)"><v-img :src="similarItems[i-1].item_img_url" height="300" contain></v-img></span>
          <div id="cardTitle">
            <v-card-title primary-title>
              <!-- 상품 이름 -->
              <!-- <router-link :to="{name: 'ItemDetail', params: {id:similarItems[i-1].id}}"><h2>{{similarItems[i-1].name}}</h2></router-link> -->
              <span id="link" @click="pageReload(similarItems[i-1].id)"><h2>{{similarItems[i-1].name.join(' ')}}</h2></span>
            </v-card-title>
          </div>
          <v-card-text>
            <div id="cardTextKeyword">
              <!-- 상품 키워드 -->
              <span v-for="keyword in Object.keys(similarItems[i-1].keywordsMap)" :key="keyword">
                <v-chip disabled v-if="similarItems[i-1].keywordsMap[keyword] > 0" color="blue" text-color="white">{{keyword}}</v-chip>
                <v-chip disabled v-else-if="similarItems[i-1].keywordsMap[keyword] < 0" color="red" text-color="white">{{keyword}}</v-chip>
              </span>
            </div>
            <!-- 상품 별점 -->
            <v-rating
              v-model="similarItems[i-1].item_rating"
              readonly
              small
              background-color="orange lighten-3"
              color="orange"
              half-increments
            >
            </v-rating>
            <!-- 상품 가격 -->
            <div id="cardTextPrice">
              <strong>price: </strong>{{similarItems[i-1].price}}$
              <span id="delivery">Free Delivery</span>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- 대표 리뷰 -->
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title primary-title>
          <h2>Representative Reviews</h2>
        </v-card-title>
        <v-flex xs12 v-for="review in similarItemsReviews[i-1]" :key="review.id">
          <v-divider></v-divider>
          <v-card-text>
            <!-- 리뷰 작성자, 시간 -->
            <div><strong>{{review.author}}</strong> {{(review.timeString)}}</div>
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
            <span v-for="keyword in review.keywords_map" :key="keyword.keyword">
              <v-chip disabled v-if="keyword.score > 0" color="blue" text-color="white">{{keyword.name}}</v-chip>
              <v-chip disabled v-else color="red" text-color="white">{{keyword.name}}</v-chip>
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
              <v-btn v-if="similarItems[i-1].isRecommended !== undefined" icon @click="Like(similarItems[i-1].id, review)"><v-icon>mdi-thumb-up</v-icon></v-btn>
              <v-btn v-else icon @click="Like(similarItems[i-1].id, review)"><v-icon>mdi-thumb-up-outline</v-icon></v-btn>
              <v-btn icon @click="UnLike(similarItems[i-1].id, review)"><v-icon>mdi-thumb-down-outline</v-icon></v-btn>
            </div>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    'similarItems': Array,
    'similarItemsReviews': Array,
    'i': Number
  },
  data () {
    return {
      user: this.$store.state.userInfo
    }
  },
  methods: {
    pageReload (id) {
      this.$router.replace('/ItemDetail/' + id)
      this.$router.go()
    },
    async Like (itemId, review) {
      if (this.user === null) {
        alert('추천은 로그인 후 이용해 주세요.')
        return
      }

      const res = await this.$http.put('/api/reviews/' + itemId + '/' + review.id + '/' + this.user.id)
      if (res.status === 200) {
        // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
        const resU = await this.$http.get('/api/users/' + this.user.id)
        this.$store.commit('MODIFY', resU.data)
        alert('추천 완료')
        this.$router.go()
      } else if (res.status === 202) {
        alert('이미 추천한 리뷰입니다.')
      }
    },
    async UnLike (itemId, review) {
      if (this.user === null) {
        alert('추천은 로그인 후 이용해 주세요.')
        return
      }

      const res = await this.$http.delete('/api/reviews/' + itemId + '/' + review.id + '/' + this.user.id + '/?mode=recommendation')
      if (res.status === 204) {
        // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
        const resU = await this.$http.get('/api/users/' + this.user.id)
        this.$store.commit('MODIFY', resU.data)
        alert('추천 취소')
        this.$router.go()
      } else if (res.status === 202) {
        alert('추천한 적이 없습니다.')
      }
    }
  }
}
</script>

<style scoped>
#link {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
#link:hover {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
#delivery {
  color: blue;
  margin-left: 20px;
}
#cardTitle {
  height: 180px;
}
#cardTextKeyword {
  height: 80px;
}
#cardTextPrice {
  font-size: 16px;
  height: 30px;
}
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
</style>
