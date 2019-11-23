<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs2 sm2 md2 lg2>
        <v-card dark>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Keyword</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex d-flex xs10 sm10 md10 lg10>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12 lg12 v-for="item in items" :key="item.id">
            <v-card>
              <v-card-title primary-title>
                <router-link :to="{name: 'itemDetail', params: {id:item.id}}"><h1>{{item.name}}</h1></router-link>
              </v-card-title>
              <v-card-text>
                <!-- 상품 사진 -->
                <v-img :src=item.img_src height="300" contain></v-img>

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
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
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
