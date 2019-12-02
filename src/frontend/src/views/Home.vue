<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs2>
        <keyword-list></keyword-list>
      </v-flex>
      <v-flex d-flex xs10>
        <item-list
          v-bind:items="items"
        ></item-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import KeywordList from '../components/main/KeywordList'
import ItemList from '../components/main/ItemList'

export default {
  components: {
    KeywordList, ItemList
  },
  created () {
    // 아이템 전체 목록 불러오기
    this.$http.get('/api/items').then((res) => {
      this.items = res.data
      let numOfKeyword = 6
      for (let eachItem of this.items) { // post processing of item keyword
        let absScoreArr = []
        let threshold = 0 // threshold of score
        let keywordsMap = {}
        for (let eachKeyword in eachItem.total_keywords_map) {
          absScoreArr.push(Math.abs(eachItem.total_keywords_map[eachKeyword]))
        }
        threshold = absScoreArr.sort((a, b) => (b - a))[numOfKeyword - 1]
        for (let eachKeyword in eachItem.total_keywords_map) {
          let eachScore = eachItem.total_keywords_map[eachKeyword]
          if (Math.abs(eachScore) >= threshold) {
            keywordsMap[eachKeyword] = eachScore
          }
        }
        eachItem.keywordsMap = keywordsMap
      }
    })
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
