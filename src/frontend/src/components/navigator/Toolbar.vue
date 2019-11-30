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
    <!-- <v-toolbar-items>
      <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </v-toolbar-items> -->
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      searchCriteria: ''
    }
  },
  methods: {
    Search () {
      console.log(this.searchCriteria)
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
    width: 400px;
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
