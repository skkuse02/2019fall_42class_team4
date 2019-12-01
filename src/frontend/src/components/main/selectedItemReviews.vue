<template>
  <v-layout row wrap>
    <v-card width="100%">
      <v-card-title primary-title>
        <h2>Review List</h2>
      </v-card-title>
      <v-flex xs12 v-for="review in curItemReviews" :key="review.id">
        <v-divider></v-divider>
        <v-card-text>
          <div><strong>{{review.writer}}</strong> {{review.date}}</div>
          <v-rating
            v-model="review.item_score"
            readonly
            small
            background-color="orange lighten-3"
            color="orange"
            half-increments
          >
          </v-rating>
          <div>{{review.contents}}</div>
          <br>
          <span v-for="keyword in review.keyword_list" :key="keyword.keyword">
            <v-chip disabled v-if="keyword.point > 0" color="blue" text-color="white">{{keyword.keyword}}</v-chip>
            <v-chip disabled v-else color="red" text-color="white">{{keyword.keyword}}</v-chip>
          </span>
          <br>
          <div><v-icon>mdi-thumb-up-outline</v-icon>{{review.review_score}}</div>
        </v-card-text>
      </v-flex>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ['curItemReviews']
}
</script>
