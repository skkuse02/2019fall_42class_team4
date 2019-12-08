<template>
  <v-card>
    <v-layout align-center justify-center row wrap>
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
          <!-- 상품 키워드 -->
          <div>
            <span v-for="keyword in Object.keys(curItem.keywordsMap)" :key="keyword">
              <v-chip disabled v-if="curItem.keywordsMap[keyword] > 0" color="blue" text-color="white">{{keyword}}</v-chip>
              <v-chip disabled v-else-if="curItem.keywordsMap[keyword] < 0" color="red" text-color="white">{{keyword}}</v-chip>
            </span>
          </div>
          <!-- 상품 별점 -->
          <v-rating
            v-model="curItem.item_rating"
            readonly
            small
            background-color="orange lighten-3"
            color="orange"
            half-increments>
          </v-rating>
        </v-flex>
        <v-flex xs12>
        <v-divider></v-divider>
          <!-- 상품 가격 -->
          <div>
            <strong>Price: </strong>{{curItem.price}}$
            <span id="delivery">Free Delivery</span>
          </div>
          <!-- 상품 구매 개수 -->
          <span id="count_minus" @click="count > 1 ? count-- : 0">-</span>
          <span id="count">{{count}}</span>
          <span id="count_plus" @click="count++">+</span>
          <!-- 상품 총 가격 -->
          <span id="totalPrice">Total Price: {{count * curItem.price}}$</span><br>
          <v-spacer></v-spacer>
          <v-btn v-if="isCart" color="success" @click="AddCart()">Add Cart</v-btn>
          <v-btn v-else dark color="red" @click="RemoveCart()">Remove Cart</v-btn>
          <v-btn color="success" @click="Buy()">Buy</v-btn>
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
      user: this.$store.state.userInfo,
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
      const cart = this.$store.state.inCart
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
    },
    async Buy () {
      if (this.user === null) {
        alert('로그인 후 구매해 주세요.')
      } else {
        const res = await this.$http.put('/api/users/' + this.user.id + '/' + this.curItem.id)
        // console.log(res)
        if (res.status === 202) {
          alert('이미 구매한 항목입니다.')
        } else if (res.status === 200) {
          // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
          const resU = await this.$http.get('/api/users/' + this.user.id)
          // console.log(resU)
          this.$store.commit('MODIFY', resU.data)
          alert('구매 완료')
          this.$router.push({ name: 'History' })
        }
      }
    }
  }
}
</script>

<style scoped>
#delivery {
  color: blue;
  margin-left: 20px;
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
#totalPrice {
  font-weight: bold;
  margin-left: 50px;
  font-size: 20px;
}
</style>
