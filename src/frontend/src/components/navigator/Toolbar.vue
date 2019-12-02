<template>
  <v-toolbar app>
    <v-toolbar-side-icon @click="$emit('changeDrawer')"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link :to="{name: 'Home'}">Revolution Review</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- search bar -->
    <input type="search" id="search" v-model="searchCriteria" placeholder="Search..." />
    <v-btn small icon @click="Search()"><v-icon>mdi-magnify</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-badge bottom left overlap>
        <template v-slot:badge>
          <span>{{$store.state.inCart === null ? 0 : $store.state.inCart.length}}</span>
        </template>
        <v-btn icon :to="{name: 'Cart'}">
          <v-icon large color="grey lighten-1">
            mdi-cart-outline
          </v-icon>
        </v-btn>
      </v-badge>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      searchCriteria: '',
      cartCount: 0
    }
  },
  methods: {
    Search () {
      // 아이템 전체 목록 불러오기
      this.$http.get('/api/items?search=' + this.searchCriteria)
        .then((res) => {
          console.log(res.data)
          // 불러온 아이템을 선호 키워드 순으로 정렬후 보여주기
        })
        .catch(err => console.error(err.message))
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

input#search{
    background: white;
    height: 30px;
    width: 1000px;
    border: none;
    font-size: 10pt;
    float: left;
    color: #63717f;
    padding-left: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    }

.container-1 input#search::-webkit-input-placeholder {
    color: #65737e;
}

.container-1 input#search:-moz-placeholder { /* Firefox 18- */
    color: #65737e;
}

.container-1 input#search::-moz-placeholder {  /* Firefox 19+ */
    color: #65737e;
}

.container-1 input#search:-ms-input-placeholder {
    color: #65737e;
    }
</style>
