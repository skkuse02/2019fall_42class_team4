<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Modify Personal Information</v-toolbar-title>
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
                  :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPasswordShow ? 'text' : 'password'"
                label="Password"
                @click:append="isPasswordShow = !isPasswordShow"
              >
              </v-text-field>
              <v-text-field
                v-model="user.name"
                label="Name"
                type="text"
                disabled
              >
              </v-text-field>
              <v-text-field
                v-model="addKeyword"
                label="keyword"
                type="text"
              >
              </v-text-field>
              <v-btn color="success" small @click="KeywordsAdd()" >Add</v-btn><br>
              <v-chip
                v-for="keyword in keywords" :key="keyword"
                close
                @input="KeywordsRemove(keyword)"
              >{{keyword}}</v-chip>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="Submit()">Submit</v-btn>
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
      user: JSON.parse(sessionStorage.getItem('userInfo')),
      password: '',
      addKeyword: '',
      keywords: [],
      isPasswordShow: false,
      state: '',
      isAlertShow: false
    }
  },
  created () {
    if (this.isAlertShow === true) {
      this.isAlertShow = false
    }
    this.keywords = this.user.customized_keyword
  },
  methods: {
    KeywordsAdd () {
      this.keywords.push(this.addKeyword)
      this.addKeyword = ''
    },
    KeywordsRemove (keyword) {
      this.keywords.splice(this.keywords.indexOf(keyword), 1)
      this.keywords = [...this.keywords]
    },
    async Submit () {
      // backend에 개인정보 수정 요청
      try {
        const res = await this.$http.put('/api/users/' + this.user.id, {
          type: 'keyword_change',
          password: this.password,
          keywords: this.keywords
        })
        console.log(res)
        this.user.customized_keyword = this.keywords
        this.$store.commit('MODIFY', this.user)
        this.$router.push('/')
      } catch (e) {
        let stateCode = e.message
        if (stateCode.includes('400')) {
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
