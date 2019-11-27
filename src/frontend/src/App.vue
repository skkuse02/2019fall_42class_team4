<template>
  <v-app>
    <!-- 상단 툴바 -->
    <toolbar @changeDrawer="drawer = !drawer"></toolbar>
    <!-- 왼쪽 네비게이션 바 -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-toolbar flat>
        <router-link :to="{name: 'Sign'}"><v-toolbar-title><v-icon>mdi-login-variant</v-icon>Login</v-toolbar-title></router-link>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-avatar>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/navigator/Toolbar'

export default {
  data () {
    return {
      drawer: false,
      items: [
        { icon: 'mdi-home', title: 'Home', to: '/' },
        { icon: 'mdi-account', title: 'MyPage', to: '/MyPage' }
      ]
    }
  },
  components: {
    Toolbar
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>
