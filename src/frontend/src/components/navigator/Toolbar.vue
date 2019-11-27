<template>
  <v-toolbar app>
    <v-toolbar-side-icon @click="$emit('changeDrawer')"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link :to="{name: 'Home'}">Revolution Review</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>
