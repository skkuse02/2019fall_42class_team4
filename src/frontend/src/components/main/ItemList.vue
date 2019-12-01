<template>
  <v-layout row wrap>
    <v-flex d-flex xs12 v-for="item in items" :key="item.id">
      <v-card>
        <v-layout>
          <v-flex xs5>
            <!-- 상품 사진 -->
            <v-img :src=item.item_img_url height="200" contain></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <!-- 상품 이름 -->
              <router-link :to="{name: 'ItemDetail', params: {id:item.id}}"><h2>{{item.name.join(' ')}}</h2></router-link>
            </v-card-title>
            <v-card-text>
              <span style="color: blue;"><h3>Free Delivery</h3></span>
              <!-- 상품 키워드 -->
              <span v-for="keyword in item.keywords_map" :key="keyword.keyword">
                <!-- {{keyword.keyword}}: {{keyword.point}} -->
                <v-chip disabled v-if="keyword.point > 0" color="blue" text-color="white">{{keyword.keyword}}</v-chip>
                <v-chip disabled v-else color="red" text-color="white">{{keyword.keyword}}</v-chip>
              </span>
              <br>
              <!-- 상품 별점 -->
              <v-rating
                v-model="item.total_star_num"
                readonly
                small
                background-color="orange lighten-3"
                color="orange"
                half-increments>
              </v-rating>
              <!-- 상품 가격 -->
              <div><strong>Price: </strong>{{item.price}}$</div>
              <div>Total Review: {{item.total_review_num}}</div>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['items']
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
