<template>
  <v-card dark>
    <v-card-title primary-title>
      <h3 v-if="user" class="headline mb-0">User Keywords</h3>
      <h3 v-else class="headline mb-0">Need Login</h3>
    </v-card-title>
    <v-card-text v-if="user">
      <div v-for="keyword in user.customized_keyword" :key="keyword.keyword">
        <v-chip disabled color="blue" text-color="white">{{keyword}}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['user']
}
</script>
