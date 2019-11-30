<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs2 sm2 md2 lg2>
        <keyword-list></keyword-list>
      </v-flex>

      <v-flex d-flex xs10 sm10 md10 lg10>
        <item-list></item-list>
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
  }
}
</script>
