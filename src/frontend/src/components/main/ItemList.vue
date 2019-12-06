<template>
<!-- 이 component는 상품의 리스트를 표시하는 역할을 하며 상품 검색 후 화면, 장바구니, 구매내역에 들어간다. -->
  <v-layout row wrap>
    <v-flex d-flex xs12 v-for="item in items" :key="item.id">
      <v-card>
        <v-layout align-center justify-center>
          <v-flex xs4>
            <!-- 상품 사진 -->
            <v-img :src="item.item_img_url" height="300" contain></v-img>
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
                <v-btn color="success">Buy</v-btn>
              </template>
            </v-card-text>
          </v-flex>

          <!-- 구매내역에 표시할 항목 -->
          <v-flex xs1 v-if="item.history">
            <v-btn icon @click="CancelPurchased(item)"><v-icon>mdi-close-box</v-icon></v-btn>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="700px"
            >
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on"><v-icon>mdi-comment-plus-outline</v-icon></v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Reviews</span>
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
                      <!-- <v-flex xs12>
                        <v-text-field
                          v-model="item.review.title"
                          label="title"
                          box
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          v-model="item.review.content"
                          label="content"
                          auto-grow
                          box
                        >
                        </v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-rating
                          v-model="item.review.item_rating"
                          background-color="orange lighten-3"
                          color="orange"
                          half-increments
                        >
                        </v-rating>
                      </v-flex> -->
                      <v-flex xs12>
                        <v-text-field
                          label="title"
                          box
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          label="content"
                          auto-grow
                          box
                        >
                        </v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-rating
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
                  <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="Save(item)">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      date: new Date()
    }
  },
  created () {
    // backend에 review 요청
    /*
    위의 vue 코드에서는 items를 v-for로 반복하기 때문에 처음 데이터를 받아올 때 item들의 review를 요청해서 미리 저장
    const run = async () => {
      for(item of items) {
        const res = await this.$http.get('/api/review/' + item.id)
        item.review = res.data
        if (item.review) item.isReview = true // 기존 review 존재 시
        else item.isReview = false
      }
    }
    run()
    */
  },
  methods: {
    RemoveCart (item) {
      this.$store.commit('REMOVECART', item)
      this.items = this.$store.state.inCart
    },
    Save (item) {
      this.dialog = false
      // backend에 review 생성/수정 요청
      /*
      if (item.isReview) {  // 기존 review 존재 시
        delete item.review.isReview
        this.$http.put('/api/review/', {
          review: item.review
        })
        alert('리뷰 수정 완료')
      } else {  // 기존 리뷰 존재 시
        delete item.review.isReview
        this.$http.post('/api/review/', {
          review: item.review
        })
        alert('리뷰 등록 완료')
      }
      */
    },
    async CancelPurchased (item) {
      const res = await this.$http.delete('/api/users/' + this.user.id + '/' + item.id)
      if (res.status === 200) {
        // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
        const resU = await this.$http.get('/api/users/' + this.user.id)
        this.$store.commit('MODIFY', resU.data)
        alert('취소 완료')
        this.$router.go() // 페이지 새로고침
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
