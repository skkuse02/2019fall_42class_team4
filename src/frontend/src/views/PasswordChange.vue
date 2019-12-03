<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Password Change</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="form"
              lazy-validation
            >
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
                  :counter="10"
                label="Current Password"
                @click:append="isPasswordShow1 = !isPasswordShow1"
                :rules="[rule.required, rule.maxLength(10)]"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="changePassword"
                  :append-icon="isPasswordShow2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPasswordShow2 ? 'text' : 'password'"
                  :counter="10"
                label="Change Password"
                @click:append="isPasswordShow2 = !isPasswordShow2"
                :rules="[rule.required, rule.maxLength(10)]"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="repeatPassword"
                  :append-icon="isPasswordShow3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPasswordShow3 ? 'text' : 'password'"
                  :counter="10"
                label="Repeat Password"
                @click:append="isPasswordShow3 = !isPasswordShow3"
                :rules="[rule.required, rule.maxLength(10), rule.isSame]"
                required
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="Submit()" :disabled="!valid">Submit</v-btn>
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
      user: this.$store.state.userInfo,
      password: '',
      changePassword: '',
      repeatPassword: '',
      isPasswordShow1: false,
      isPasswordShow2: false,
      isPasswordShow3: false,
      state: '',
      isAlertShow: false,
      rule: {
        required: v => !!v || '필수 항목입니다.',
        maxLength: length => v => v.length <= length || length + '자 이하로 입력해 주세요',
        isSame: v => (this.changePassword === v) || '바꿀 비밀번호와 똑같이 입력해주세요.'
      },
      valid: false
    }
  },
  created () {
    if (this.isAlertShow === true) {
      this.isAlertShow = false
    }
  },
  methods: {
    async Submit () {
      if (!this.$refs.form.validate()) {
        this.state = '입력을 올바르게 해주세요'
        this.isAlertShow = true
        return
      }

      // backend에 개인정보 수정 요청
      try {
        const res = await this.$http.put('/api/users/' + this.user.id, {
          type: 'password_change',
          password: this.password,
          changePassword: this.changePassword
        })
        console.log(res.data)
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
