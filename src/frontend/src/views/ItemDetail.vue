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
      <v-flex xs4 v-for="i in similarItems.length" :key="i">
        <similar-items
          v-bind:similar-items="similarItems"
          v-bind:similar-items-reviews="similarItemsReviews"
          v-bind:i="i">
        </similar-items>
      </v-flex>
      <v-flex xs12>
        <selected-item-reviews
          v-bind:cur-item="curItem"
          v-bind:cur-item-reviews="curItemReviews"
          @changeSortCriteria="reset"
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
import _ from '../../node_modules/underscore'

export default {
  components: {
    SelectedItem, SimilarItems, SelectedItemReviews
  },
  methods: {
    scroll (that) {
      let debounceTempo = 500 // ms 단위의 debounce 주기
      window.onscroll = _.debounce(() => {
        let bottomOfWindow = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100 // 밑에서 100만큼 거리부터 trigger됨. 확인코드: console.log(window.innerHeight, window.pageYOffset, document.body.offsetHeight)
        if (bottomOfWindow) {
          that.$http.get(`/api/reviews/${that.curItem.id}/${that.offsetValue}/?criteria=${that.criteria}&keyword=${that.keyword}`)
            .then(response => {
              let criteriaMap = {
                'rating': 'review_rating',
                'recent': 'last_modified_time',
                'keyword': 'review_rating'
              }
              that.curItemReviews.push(...response.data)
              that.offsetValue = response.data.pop()[criteriaMap[that.criteria]]
            }
            ).catch(error => {
              that.nowFetching = false
              console.error(error.message)
            })
        }
      }, debounceTempo)
    },
    // review 정렬 기준을 바꿨을 때 리뷰 다시 가져오기
    reset (changeCriteria) {
      this.curItemReviews = []
      this.offsetValue = -1
      this.criteria = changeCriteria.criteria
      this.keyword = changeCriteria.setKeyword
      // 정렬 기준을 변경할 때 브라우저의 제일 아래로 내려가게 되어 자동으로 위의 scroll를 호출, 그래서 여기서 review를 가져올 필요가 없다.
    }
  },
  mounted () {
    this.scroll(this)
  },
  data () {
    return {
      // 현재 아이템과 리뷰
      curItem: {
        name: [''],
        keywordsMap: {}
      },
      curItemReviews: [],
      offsetValue: -1,
      criteria: 'rating',
      keyword: '',

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
      let criteriaMap = {
        'rating': 'review_rating',
        'recent': 'last_modified_time',
        'keyword': 'review_rating'
      }
      this.curItemReviews.push(...resR.data)
      this.offsetValue = resR.data.pop()[criteriaMap[this.criteria]]
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
