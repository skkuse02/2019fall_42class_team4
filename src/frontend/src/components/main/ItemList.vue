<template>
  <v-layout row wrap>
    <v-flex d-flex xs12 sm12 md12 lg12 v-for="item in items" :key="item.id">
      <v-card>
        <v-layout align-center justify-center row wrap>
          <v-flex ma-2 d-flex xs12 sm12 md3 lg3>
            <!-- 상품 사진 -->
            <v-img :src=item.img_src height="300" contain></v-img>
          </v-flex>
          <v-flex d-flex xs12 sm12 md8 lg8>
            <v-card-text>
              <router-link :to="{name: 'ItemDetail', params: {id:item.id}}"><h2>{{item.name}}</h2></router-link>
              <!-- 상품 정보 -->
              <strong>상품 정보</strong>
              <br>
              <div>{{item.info}}</div>
              <br>
              <!-- 상품 가격 -->
              <div><strong>가격: </strong>{{item.price}}$</div>
              <br>
              <!-- 상품 키워드 -->
              <strong>상품 키워드</strong>
              <br>
              <div v-for="keyword in item.rep_keywords" :key="keyword.keyword">
                {{keyword.keyword}}: {{keyword.point}}
              </div>
            </v-card-text>
          </v-flex>
        </v-layout>
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
</style>
