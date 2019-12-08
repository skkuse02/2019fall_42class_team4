<template>
<!-- 이 component는 상품의 리스트를 표시하는 역할을 하며 상품 검색 후 화면, 장바구니, 구매내역에 들어간다. -->
  <v-layout row wrap>
    <v-flex d-flex xs12 v-for="item in items" :key="item.id">
      <v-card>
        <v-layout align-center justify-center>
          <v-flex xs4>
            <!-- 상품 사진 -->
            <router-link :to="{name: 'ItemDetail', params: {id:item.id}}"><v-img :src="item.item_img_url" height="300" contain></v-img></router-link>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <!-- 상품 이름 -->
              <router-link :to="{name: 'ItemDetail', params: {id:item.id}}"><h2>{{item.name.join(' ')}}</h2></router-link>
            </v-card-title>
            <v-card-text>
              <!-- 상품 키워드 -->
              <span v-for="keyword in Object.keys(item.keywordsMap)" :key="keyword">
                <v-chip disabled v-if="item.keywordsMap[keyword] > 0" color="blue" text-color="white">{{keyword}}</v-chip>
                <v-chip disabled v-else-if="item.keywordsMap[keyword] < 0" color="red" text-color="white">{{keyword}}</v-chip>
              </span>
              <br>
              <!-- 상품 별점 -->
              <v-rating
                v-model="item.item_rating"
                readonly
                small
                background-color="orange lighten-3"
                color="orange"
                half-increments
              >
              </v-rating>
              <!-- 상품 가격 -->
              <div>
                <span id="price"><strong>Price: </strong>{{item.price}}$</span>
                <span id="delivery">Free Delivery</span>
              </div>
              <div>Total Review: {{item.total_review_num}}</div>

              <!-- 장바구니에 표시할 항목 -->
              <template v-if="item.quantity">
                <v-divider></v-divider>
                <div>Quantity: {{item.quantity}}</div>
                <h2>Total Price: {{item.quantity * item.price}}</h2>
                <v-btn dark color="red" @click="RemoveCart(item)">Remove Cart</v-btn>
                <v-btn color="success" @click="Buy(item)">Buy</v-btn>
              </template>
            </v-card-text>
          </v-flex>

          <!-- 구매내역에 표시할 항목 -->
          <v-flex xs1 v-if="item.history">
            <v-flex xs12>
              <v-btn icon @click="CancelPurchased(item)"><v-icon>mdi-close-box</v-icon></v-btn>
            </v-flex>
            <v-flex xs12>
              <v-dialog
                v-model="dialog"
                persistent
                max-width="700px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="LoadReview(item)"><v-icon>mdi-comment-plus-outline</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Reviews</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs4>
                          <v-text-field
                            v-model="user.id"
                            disabled
                            label="author"
                            box
                          >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs8>
                          <v-text-field
                            v-model="date"
                            disabled
                            label="date"
                            box
                          >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            v-model="reviewTitle"
                            label="title"
                            box
                          >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-textarea
                            v-model="reviewContent"
                            label="content"
                            auto-grow
                            box
                          >
                          </v-textarea>
                        </v-flex>
                        <v-flex xs12>
                          <v-rating
                            v-model="reviewItemRating"
                            background-color="orange lighten-3"
                            color="orange"
                            half-increments
                          >
                          </v-rating>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="Delete()">Delete</v-btn>
                    <v-btn color="blue darken-1" flat @click="Save()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      dialog: false,
      user: this.$store.state.userInfo,
      date: new Date(),
      reviewTitle: '',
      reviewContent: '',
      reviewItemRating: 0,
      isReview: false,
      postMap: {},
      selectedItem: [] // prevent dialog bug
    }
  },
  methods: {
    // 장바구니에서 필요한 함수들
    RemoveCart (item) {
      this.$store.commit('REMOVECART', item)
      this.items = this.$store.state.inCart
    },
    async Buy (item) {
      if (this.user === null) {
        alert('로그인 후 구매해 주세요.')
      } else {
        const res = await this.$http.put('/api/users/' + this.user.id + '/' + item.id)
        if (res.status === 202) {
          alert('이미 구매한 항목입니다.')
        } else if (res.status === 200) {
          // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
          const resU = await this.$http.get('/api/users/' + this.user.id)
          this.$store.commit('MODIFY', resU.data)
          this.$store.commit('REMOVECART', item)
          alert('구매 완료')
          this.$router.push({ name: 'History' })
        }
      }
    },

    // 구매내역에서 필요한 함수들
    async CancelPurchased (item) {
      let result = confirm('정말 구매를 취소하시겠습니까?')
      if (result) {
        const res = await this.$http.delete('/api/users/' + this.user.id + '/' + item.id)
        if (res.status === 200) {
          // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
          const resU = await this.$http.get('/api/users/' + this.user.id)
          this.$store.commit('MODIFY', resU.data)
          alert('취소 완료')
          this.$router.go() // 페이지 새로고침
        }
      }
    },
    async LoadReview (item) {
      this.selectedItem = item
      // 구입한 item의 review보기 버튼을 클릭하면 해당 item에 리뷰가 존재하는지 확인
      let user = await this.$http.get('/api/users/' + this.user.id)
      user = user.data
      this.user = user // save user's data
      let itemId = item.id
      let postedReviews = user.posted_reviews
      this.postMap = {} // postMap => key: item_id, value: review_id
      postedReviews.forEach((itemIdReviewId) => {
        let kvPair = itemIdReviewId.split(' ')
        this.postMap[kvPair[0]] = kvPair[1]
      })
      const isPosted = this.postMap[itemId] !== undefined
      if (isPosted) {
        let review = await this.$http.get('/api/reviews/' + itemId + '/' + this.postMap[itemId] + '/1')
        review = review.data
        this.reviewTitle = review.title || ''
        this.reviewContent = review.content || ''
        this.reviewItemRating = review.item_rating || 0
        this.isReview = true
      } else {
        this.reviewTitle = ''
        this.reviewContent = ''
        this.reviewItemRating = 0
        this.isReview = false
      }
    },
    async Save () { // before Save run, LoadReview always run to provide proper value: this.isReview, this.postMap
      // backend에 review 생성/수정 요청
      let item = this.selectedItem
      let itemId = item.id
      if (this.isReview) { // 기존 review 존재 시
        let reviewId = this.postMap[itemId]
        await this.$http.put('/api/reviews/' + itemId + '/' + reviewId, {
          title: this.reviewTitle.trim(),
          content: this.reviewContent.trim(),
          item_rating: this.reviewItemRating
        })
        alert('리뷰 수정 완료')
      } else { // 기존 review 존재하지 않을 시
        const res = await this.$http.post('/api/reviews/' + itemId + '/' + this.user.id, {
          title: this.reviewTitle.trim(),
          content: this.reviewContent.trim(),
          item_rating: this.reviewItemRating
        })
        alert('리뷰 등록 완료', res)
        this.isReview = false // prevent double review posting
      }
      this.dialog = false
      this.$router.go()
    },
    async Delete () { // before Delete run, LoadReview always run to provide proper value: this.isReview, this.postMap
      // backend에 review 삭제 요청
      let item = this.selectedItem
      if (this.isReview) {
        let itemId = item.id
        let result = confirm('정말 리뷰를 삭제하시겠습니까?')
        let reviewId = this.postMap[itemId]
        if (result) {
          if (reviewId) {
            await this.$http.delete('/api/reviews/' + itemId + '/' + reviewId + '/' + this.user.id + '/?mode=review')
            alert('리뷰 삭제 성공')
            this.dialog = false
            this.$router.go()
          }
        }
      } else {
        alert('리뷰가 존재하지 않습니다!')
      }
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
a:hover {
  text-decoration: underline;
  color: blue;
}
#delivery {
  color: blue;
  margin-left: 20px;
}
#price {
  font-size: 20px;
}
</style>
