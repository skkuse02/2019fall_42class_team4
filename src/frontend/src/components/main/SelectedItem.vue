<template>
  <v-card>
    <v-layout row wrap>
      <v-flex xs5>
        <!-- 상품 사진 -->
        <v-img :src=curItem.item_img_url height="300" contain></v-img>
      </v-flex>
      <v-flex xs7>
        <v-flex xs12>
          <v-card-title primary-title>
            <!-- 상품 이름 -->
            <h2>{{curItem.name.join(" ")}}</h2>
          </v-card-title>
          <!-- 상품 별점 -->
          <v-rating
            v-model="curItem.total_star_sum"
            readonly
            small
            background-color="orange lighten-3"
            color="orange"
            half-increments>
          </v-rating>
        </v-flex>
        <v-divider></v-divider>
        <v-flex xs12>
          <!-- 상품 가격 -->
          <div><strong>Price: </strong>{{curItem.price}}$ <span id="delivery">Free Delivery</span></div>
          <!-- 상품 키워드 -->
          <div>
            <span v-for="keyword in Object.keys(curItem.total_keywords_map)" :key="keyword">
              <v-chip disabled v-if="curItem.total_keywords_map[keyword] > 0" color="blue" text-color="white">{{keyword}}</v-chip>
              <v-chip disabled v-else-if="curItem.total_keywords_map[keyword] < 0" color="red" text-color="white">{{keyword}}</v-chip>
            </span>
          </div>
          <span id="count_minus" @click="count > 1 ? count-- : 0">-</span>
          <span id="count">{{count}}</span>
          <span id="count_plus" @click="count++">+</span>
          <h3 style="margin-bottom: 10px;">Total Price: {{count * curItem.price}}$</h3>
          <v-spacer></v-spacer>
          <v-btn v-if="isCart" color="success" @click="AddCart()">Add Cart</v-btn>
          <v-btn v-else dark color="red" @click="RemoveCart()">Remove Cart</v-btn>
          <v-btn color="success">Buy</v-btn>
        </v-flex>
      </v-flex>
      <v-flex xs12>
        <v-card-text>
          <!-- 상품 정보 -->
          <v-img :src=curItem.desc_img_url></v-img>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['curItem'],
  data () {
    return {
      count: 1,
      isCart: true
    }
  },
  created () {
    this.IsCart()
  },
  updated () {
    this.IsCart()
  },
  methods: {
    IsCart () {
      const cart = JSON.parse(sessionStorage.getItem('inCart'))
      if (cart) {
        for (let i in cart) {
          const id = cart[i].id
          if (id === this.curItem.id) {
            this.isCart = false
            return
          }
        }
      }
      this.isCart = true
    },
    AddCart () {
      this.curItem.quantity = this.count
      this.$store.commit('ADDCART', this.curItem)
      this.IsCart()
    },
    RemoveCart () {
      this.$store.commit('REMOVECART', this.curItem)
      this.IsCart()
    }
  }
}
</script>

<style scoped>
#delivery {
  color: blue;
}

#count_minus, #count_plus {
  cursor: pointer;
  width: 20px;
  line-height: 50px;
  margin-left: 20px;
  text-align: center;
}

#count {
  width: 20px;
  line-height: 50px;
  margin-left: 20px;
  text-align: center;
}
</style>
