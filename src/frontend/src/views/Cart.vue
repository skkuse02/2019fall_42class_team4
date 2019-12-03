<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center row wrap>
      <v-flex xs10>
        <h2>Cart Items</h2>
      </v-flex>
      <v-flex xs10>
        <item-list
          v-bind:items="cartItems"
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
      cart: this.$store.state.inCart,
      cartItems: []
    }
  },
  created () {
    for (let i in this.cart) {
      this.cartItems.push(this.cart[i])
    }
  }
}
</script>
