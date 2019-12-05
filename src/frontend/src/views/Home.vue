<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs2>
        <keyword-list
          v-bind:user="user"
        ></keyword-list>
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
  data () {
    return {
      user: this.$store.state.userInfo,
      items: []
    }
  },
  created () {
    // 아이템 전체 목록 불러오기
    this.$http.get('/api/items').then((res) => {
      this.items = res.data

      // 검색 요청 시, items를 검색 결과로 갱신
      const searchResult = JSON.parse(sessionStorage.getItem('searchResult'))
      if (searchResult) {
        this.items = searchResult
        sessionStorage.removeItem('searchResult')
      }

      // user keywords 순으로 정렬
      if (this.user !== null) {
        for (let item of this.items) {
          item.userKeywordSorting = 0
        }
        const userKeywords = this.user.customized_keyword
        for (let keyword of userKeywords) {
          for (let item of this.items) {
            if (item.keywordsMap[keyword] !== undefined) {
              item.userKeywordSorting += 1
              // console.log(item.id, item.userKeywordSorting)
            }
          }
        }

        // 상품에 포함된 user keyword 순으로 내림차순 정렬
        // 상품에 포함된 user keyowrd가 같은 경우, id 순으로 오름차순 정렬
        this.items.sort((a, b) => {
          if (b['userKeywordSorting'] === a['userKeywordSorting']) {
            return a['id'] - b['id']
          }
          return b['userKeywordSorting'] - a['userKeywordSorting']
        })
      }
    })
  }
}
</script>
