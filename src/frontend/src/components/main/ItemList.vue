<template>
  <v-layout row wrap>
    <v-flex d-flex xs4 sm4 md4 lg4 v-for="item in items" :key="item.id">
      <v-card>
        <!-- 상품 사진 -->
        <v-img :src=item.img_src height="200" contain></v-img>
        <v-card-title primary-title>
          <!-- 상품 이름 -->
          <router-link :to="{name: 'ItemDetail', params: {id:item.id}}"><h2>{{item.name}}</h2></router-link>
        </v-card-title>
        <v-card-text>
          <span style="color: blue;"><h6>Free Delivery</h6></span>
          <!-- 상품 키워드 -->
          <span v-for="keyword in item.rep_keywords" :key="keyword.keyword">
            <!-- {{keyword.keyword}}: {{keyword.point}} -->
            <v-chip disabled v-if="keyword.point > 0" color="blue" text-color="white">{{keyword.keyword}}</v-chip>
            <v-chip disabled v-else color="red" text-color="white">{{keyword.keyword}}</v-chip>
          </span>
          <br>
          <!-- 상품 별점 -->
          <v-rating
            v-model="item.scores"
            readonly
            small
            background-color="orange lighten-3"
            color="orange"
            half-increments>
          </v-rating>
          <!-- 상품 가격 -->
          <div><strong>price: </strong>{{item.price}}$</div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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

<style scoped>
a {
    text-decoration: none;
    color: black;
}
a:hover {
  text-decoration: underline;
  color: blue;
}
</style>
