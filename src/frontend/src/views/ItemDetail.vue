<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <!-- 상품 상세 정보 표시할 영역 -->
      <v-flex xs12>
        <selected-item
          v-bind:cur-item="curItem"
        >
        </selected-item>
      </v-flex>
      <!-- 유사 상품 정보 표시할 영역 -->
      <v-flex xs3 v-for="i in similarItems.length" :key="i">
        <similar-items
          v-bind:similar-items="similarItems"
          v-bind:similar-items-reviews="similarItemsReviews"
          v-bind:i="i">
        </similar-items>
      </v-flex>
      <v-flex xs12>
        <selected-item-reviews
          v-bind:cur-item-reviews="curItemReviews"
        >
        </selected-item-reviews>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SelectedItem from '../components/main/SelectedItem'
import SimilarItems from '../components/main/SimilarItems'
import SelectedItemReviews from '../components/main/selectedItemReviews'

export default {
  components: {
    SelectedItem, SimilarItems, SelectedItemReviews
  },
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
