<template>
  <v-layout align-center justify-center row wrap>
    <v-flex d-flex offset-xs8 offset-sm8 offset-md8 offset-lg8 xs3 sm3 md3 lg3>
      <input type="search" id="search" v-model="searchCriteria" placeholder="Search..." />
    </v-flex>
    <v-flex d-flex xs1 sm1 md1 lg1>
      <v-btn small icon @click="Search()"><v-icon>mdi-magnify</v-icon></v-btn>
    </v-flex>
  </v-layout>
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
input#search{
    background: #EEEEEE;
    height: 40px;
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
