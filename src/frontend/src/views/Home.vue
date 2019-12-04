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
    })
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
