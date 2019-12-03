<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center row wrap>
      <v-flex xs10>
        <h2>Purchased Items</h2>
      </v-flex>
      <v-flex xs10>
        <item-list
          v-bind:items="purchasedItems"
        >
        </item-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ItemList from '../components/main/ItemList'
export default {
  components: {
    ItemList
  },
  data () {
    return {
      user: this.$store.state.userInfo,
      purchasedItems: []
    }
  },
  created () {
    const run = async () => {
      for (let i in this.user.purchased_items) {
        const itemId = this.user.purchased_items[i]
        const res = await this.$http.get('/api/items/' + itemId)
        res.data[0]['history'] = 'history'
        this.purchasedItems.push(res.data[0])
      }
    }

    run()
  }
}
</script>
