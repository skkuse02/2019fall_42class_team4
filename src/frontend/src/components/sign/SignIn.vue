<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign In Form</v-toolbar-title>
            <v-spacer></v-spacer>
            <a @click="$emit('changeShow')">Sgin Up</a>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                v-model="id"
                label="ID"
                type="text"></v-text-field>
              <v-text-field
              prepend-icon="mdi-lock-question"
              v-model="password"
                :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShow ? 'text' : 'password'"
              label="Password"
              @click:append="isPasswordShow = !isPasswordShow"
              @keyup.enter="SignIn"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="SignIn">Sign In</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert :value="isAlertShow"  type="error">
          {{state}}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      password: '',
      isPasswordShow: false,
      state: '',
      isAlertShow: false
    }
  },
  created () {
    if (this.isAlertShow === true) {
      this.isAlertShow = false
    }
  },
  methods: {
    async SignIn () {
      // backend에 로그인 요청
      try {
        const res = await this.$http.post('/api/login', {
          ID: this.id,
          PW: this.password
        })
        // console.log(res.data)
        this.$store.commit('LOGIN', res.data.userInfo)
        this.$router.push('/')
      } catch (e) {
        let stateCode = e.message
        if (stateCode.includes('404')) {
          this.state = 'ID가 존재하지 않습니다.'
          this.isAlertShow = true
        } else if (stateCode.includes('400')) {
          this.state = 'PW가 일치하지 않습니다.'
          this.isAlertShow = true
        } else {
          this.state = '알 수 없는 에러가 발생했습니다.' + e
          console.log(e)
          this.isAlertShow = true
        }
      }
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: white;
}
</style>
