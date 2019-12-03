<template>
  <v-card height="100%">
    <v-container fluid grid-list-md>
      <v-flex xs12>
        <v-card flat>
          <!-- 상품 사진 -->
          <v-img :src="similarItems[i-1].item_img_url" height="200" contain></v-img>
          <v-card-title primary-title>
            <!-- 상품 이름 -->
            <!-- <router-link :to="{name: 'ItemDetail', params: {id:similarItems[i-1].id}}"><h2>{{similarItems[i-1].name}}</h2></router-link> -->
            <span id="link" @click="pageReload(similarItems[i-1].id)"><h2>{{similarItems[i-1].name.join(' ')}}</h2></span>
          </v-card-title>
          <v-card-text>
            <span style="color: blue;"><h3>Free Delivery</h3></span>
            <!-- 상품 키워드 -->
              <span v-for="keyword in Object.keys(similarItems[i-1].keywordsMap)" :key="keyword">
                <v-chip disabled v-if="similarItems[i-1].keywordsMap[keyword] > 0" color="blue" text-color="white">{{keyword}}</v-chip>
                <v-chip disabled v-else-if="similarItems[i-1].keywordsMap[keyword] < 0" color="red" text-color="white">{{keyword}}</v-chip>
              </span>
            <br>
            <!-- 상품 별점 -->
            <v-rating
              v-model="similarItems[i-1].item_rating"
              readonly
              small
              background-color="orange lighten-3"
              color="orange"
              half-increments
            >
            </v-rating>
            <!-- 상품 가격 -->
            <div><strong>price: </strong>{{similarItems[i-1].price}}$</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- 대표 리뷰 -->
      <v-card flat>
        <v-card-title primary-title>
          <h4>Representative Reviews</h4>
        </v-card-title>
        <v-flex xs12 v-for="review in similarItemsReviews[i-1]" :key="review.id">
          <v-divider></v-divider>
          <v-card-text>
            <div><strong>{{review.author}}</strong> {{(review.last_modified_time)}}</div>
            <v-rating
              v-model="review.item_score"
              readonly
              small
              background-color="orange lighten-3"
              color="orange"
              half-increments
            >
            </v-rating>
            <div>{{review.content}}</div>
            <br>
            <span v-for="keyword in review.keywords_map" :key="keyword.keyword">
              <v-chip disabled v-if="keyword.score > 0" color="blue" text-color="white">{{keyword.name}}</v-chip>
              <v-chip disabled v-else color="red" text-color="white">{{keyword.name}}</v-chip>
            </span>
            <br>
            <div><v-icon>mdi-thumb-up-outline</v-icon>{{review.review_score}}</div>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    'similarItems': Array,
    'similarItemsReviews': Array,
    'i': Number
  },
  methods: {
    pageReload (id) {
      this.$router.replace('/ItemDetail/' + id)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
#link {
    text-decoration: none;
    color: black;
    cursor: pointer;
}
#link:hover {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
</style>
