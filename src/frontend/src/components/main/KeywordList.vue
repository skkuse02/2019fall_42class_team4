<template>
  <v-card dark>
    <v-card-title primary-title>
      <div><h3 class="headline mb-0">Keyword</h3></div>
    </v-card-title>
    <v-card-text>
      <div v-for="keyword in keywords" :key="keyword.keyword">
        {{keyword.keyword}}: {{keyword.point}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      keywords: [
        {
          keyword: 'keyword1',
          point: 0.7
        },
        {
          keyword: 'keyword2',
          point: 0.4
        },
        {
          keyword: 'keyword3',
          point: 0.5
        }
      ]
    }
  }
}
</script>
