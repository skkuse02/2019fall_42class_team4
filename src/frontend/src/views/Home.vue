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
                <router-link :to="{name: 'itemDetail', params: {id:item.id}}"><h1>{{item.title}}</h1></router-link>
              </v-card-title>
              <v-card-text>
                {{item.content}}
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
  data () {
    return {
      items: [
        {
          id: 1,
          title: 'title1',
          content: 'content1'
        },
        {
          id: 2,
          title: 'title2',
          content: 'content2'
        },
        {
          id: 3,
          title: 'title3',
          content: 'content3'
        },
        {
          id: 4,
          title: 'title4',
          content: 'content4'
        },
        {
          id: 5,
          title: 'title5',
          content: 'content5'
        },
        {
          id: 6,
          title: 'title6',
          content: 'content6'
        },
        {
          id: 7,
          title: 'title7',
          content: 'content7'
        },
        {
          id: 8,
          title: 'title8',
          content: 'content8'
        },
        {
          id: 9,
          title: 'title9',
          content: 'content9'
        },
        {
          id: 10,
          title: 'title10',
          content: 'content10'
        }
      ]
    }
  },
  methods: {

  }
}
</script>
