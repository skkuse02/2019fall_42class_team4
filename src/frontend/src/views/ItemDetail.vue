<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <!-- 상품 상세 정보 표시할 카드 -->
      <v-flex xs12 sm12 md12 lg12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2>{{item.title}}</h2>
            </div>
          </v-card-title>
          <v-card-text>
            <div>{{item.content}}</div>
            <div>review</div>
            <div>review</div>
            <div>review</div>
            <div>review</div>
            <div>review</div>
          </v-card-text>
        </v-card>
      </v-flex>

    <!-- 상품 비교 카드 -->
    <v-flex xs4 sm4 md4 lg4 v-for="id in compareItemsId" :key="id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h2>{{items[id - 1].title}}</h2>
          </div>
        </v-card-title>
        <v-card-text>
            <h4>{{items[id - 1].content}}</h4>
        </v-card-text>
      </v-card>
    </v-flex>

      <!-- home으로 돌아가기 버튼 -->
      <v-flex xs12 sm12 md12 lg12>
        <v-card flat>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color='primary' :to="{name: 'home'}">돌아가기</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  created () {
    const id = this.$route.params.id
    // console.log(id)
    this.item = this.items.filter((item) => {
      return item.id === id
    })[0]

    this.compareItemsId.push((id - 1) % 10 + 1)
    this.compareItemsId.push((id - 1 + 1) % 10 + 1)
    this.compareItemsId.push((id - 1 + 2) % 10 + 1)
  },
  data () {
    return {
      item: {},
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
      ],
      compareItemsId: []
    }
  }
}
</script>
