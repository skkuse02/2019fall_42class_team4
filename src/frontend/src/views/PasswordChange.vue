<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Password Change</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.id"
                label="ID"
                type="text"
                disabled
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                  :append-icon="isPasswordShow1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPasswordShow1 ? 'text' : 'password'"
                label="Current Password"
                @click:append="isPasswordShow1 = !isPasswordShow1"
              >
              </v-text-field>
              <v-text-field
                v-model="changePassword"
                  :append-icon="isPasswordShow2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPasswordShow2 ? 'text' : 'password'"
                label="Change Password"
                @click:append="isPasswordShow2 = !isPasswordShow2"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="Submit()">Submit</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert :value="isAlertShow" type="error">
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
      user: JSON.parse(sessionStorage.getItem('userInfo')),
      password: '',
      changePassword: '',
      isPasswordShow1: false,
      isPasswordShow2: false,
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
    async Submit () {
      // backend에 개인정보 수정 요청
      try {
        const res = await this.$http.put('/api/users/' + this.user.id, {
          type: 'password_change',
          password: this.password,
          changePassword: this.changePassword
        })
        console.log(res)
        this.$router.push('/')
      } catch (e) {
        let stateCode = e.message
        if (stateCode.includes('400')) {
          this.state = '기존 PW가 일치하지 않습니다.'
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
