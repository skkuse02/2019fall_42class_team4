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
      let resR = await this.$http.get(`/api/reviews/${this.curItem.id}/-1/?criteria=rating`)
      this.curItemReviews.push(resR.data)
      console.log(resR.data)

      // 유사 아이템 비교 목록에 현재 아이템 추가하기
      this.curItem.similar_items.unshift(this.curItem.id)
      // 유사 아이템 불러오기
      for (let itemId of this.curItem.similar_items) {
        const res = await this.$http.get('/api/items/' + itemId)
        this.similarItems.push(res.data[0])
      }

      // 유사 아이템의 리뷰 불러오기
      for (let itemId of this.curItem.similar_items) {
        const res = await this.$http.get('/api/reviews/' + itemId)
        this.similarItemsReviews.push(res.data)
      }
    }

    run()
  }
}
</script>
