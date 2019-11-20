<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <!-- 상품 상세 정보 표시할 카드 -->
      <v-flex xs12 sm12 md12 lg12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2>{{item.name}}</h2>
            </div>
          </v-card-title>
          <v-card-text>
            <v-img :src=item.img_src height="300" contain></v-img>
            <div>{{item.info}}</div>
            <div>price: {{item.price}}</div>
            <div>item keywords: {{item.rep_keywords}}</div>
            <br>
            <v-card color='primary' v-for="review in itemReviews" :key="review.id">
              <div>작성 일자: {{review.date}}</div>
              <div>작성자: {{review.writer}}</div>
              <div>상품 스코어: {{review.item_score}}</div>
              <div>리뷰 키워드: {{review.keyword_list}}</div>
              <div>리뷰 내용: {{review.contents}}</div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- 상품 비교 카드 -->
      <v-flex xs4 sm4 md4 lg4 v-for="id in item.similar_items" :key="id">
        <v-card height="100%">
          <v-card-title primary-title>
            <div>
              <h2>{{items[id - 1].name}}</h2>
            </div>
          </v-card-title>
          <v-card-text>
              <h4>{{items[id - 1].rep_reviews}}</h4>
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
      itemId: '',
      items: [],
      item: {},
      reviews: [],
      itemReviews: []
    }
  },
  created () {
    // 전체 item 백엔드에 요청
    this.$http.get('/api/items').then((res) => {
      this.items = res.data
    }).catch((err) => {
      console.error(err)
    })

    // 상세정보를 보여줄 item 백엔드에 요청
    this.itemId = this.$route.params.id
    this.$http.get('/api/items/' + this.itemId).then((res) => {
      this.item = res.data[0]
    }).catch((err) => {
      console.error(err)
    })

    // review 정보 가져오기
    this.$http.get('/api/reviews').then((res) => {
      this.reviews = res.data

      for (var i in this.reviews) {
        if (this.reviews[i].item_id === this.itemId) {
          this.$http.get('/api/reviews/' + this.reviews[i].id).then((res) => {
            this.itemReviews.push(res.data[0])
          }).catch((err) => {
            console.error(err)
          })
        }
      }
    }).catch((err) => {
      console.error(err)
    })
  }
}
</script>
