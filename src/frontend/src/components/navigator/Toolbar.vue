<template>
  <v-toolbar app>
    <v-toolbar-side-icon @click="$emit('changeDrawer')"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link :to="{name: 'Home'}">Revolution Review</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click="SignOut">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Sign Out' }
      ]
    }
  },
  methods: {
    SignOut: () => {
      console.log('Sign Out')
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>
