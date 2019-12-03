<template>
  <v-card dark>
    <v-card-title primary-title>
      <h3 class="headline mb-0">User Keywords</h3>
    </v-card-title>
    <v-card-text>
      <div v-for="keyword in user.customized_keyword" :key="keyword.keyword">
        <v-chip disabled color="blue" text-color="white">{{keyword}}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      user: this.$store.state.userInfo
    }
  },
  created () {
    if (this.user === null) {
      this.user = []
      this.user['customized_keyword'] = []
    }
  }
}
</script>
