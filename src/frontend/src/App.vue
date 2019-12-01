<template>
  <v-app>
    <!-- 상단 툴바 -->
    <toolbar @changeDrawer="drawer = !drawer"></toolbar>
    <!-- 왼쪽 네비게이션 바 -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-toolbar flat>
        <v-btn flat v-if="$store.state.userInfo" @click="Logout()"><v-toolbar-title><v-icon>mdi-logout-variant</v-icon>Logout</v-toolbar-title></v-btn>
        <v-btn flat v-else @click="Login()"><v-toolbar-title><v-icon>mdi-login-variant</v-icon>Login</v-toolbar-title></v-btn>
      </v-toolbar>
      <v-list class="pt-0">
        <v-divider></v-divider>
        <!-- Home -->
        <v-list-tile :to="{name: 'Home'}">
          <v-list-tile-action>
            <v-icon>mdi-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- My page -->
        <v-list-group
          prepend-icon="mdi-account"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>MyPage</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile :to="{name: 'KeywordSetting'}">
            <v-list-tile-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Keyword Setting</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: 'PasswordChange'}">
            <v-list-tile-action>
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Password Change</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="{name: 'History'}">
            <v-list-tile-action>
              <v-icon>mdi-history</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>History</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
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
      drawer: false
    }
  },
  components: {
    Toolbar
  },
  methods: {
    Login () {
      this.$router.push('/Sign')
    },
    Logout () {
      this.$store.commit('LOGOUT')
      if (window.location.pathname === '/') {
        this.drawer = false
        window.location.reload()
      } else {
        this.$router.push('/')
      }
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
