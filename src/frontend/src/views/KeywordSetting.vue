<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Modify Personal Information</v-toolbar-title>
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
                  :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isPasswordShow ? 'text' : 'password'"
                  :counter="10"
                label="Password"
                @click:append="isPasswordShow = !isPasswordShow"
                :rules="[rule.required, rule.maxLength(10)]"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="user.name"
                label="Name"
                type="text"
                disabled
              >
              </v-text-field>
              <!-- 키워드 선택 -->
              <div>Select Keywords</div>
              <v-combobox
                v-model="keywords"
                :items="keywordsList"
                label="Select keywords"
                chips
                clearable
                solo
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    @input="KeywordsRemove(data.item)"
                  >
                    <strong>{{ data.item }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="Submit()" :disabled="!valid">Submit</v-btn>
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
      user: this.$store.state.userInfo,
      password: '',
      addKeyword: '',
      keywords: [],
      keywordsList: [
        'bass',
        'battery',
        'bluetooth',
        'bone conduction',
        'customer service',
        'design',
        'microphone',
        'mid',
        'noise canceling',
        'price',
        'product quality',
        'sound quality',
        'treble',
        'usability'
      ],
      isPasswordShow: false,
      state: '',
      isAlertShow: false,
      rule: {
        required: v => !!v || '필수 항목입니다.',
        maxLength: length => v => v.length <= length || length + '자 이하로 입력해 주세요'
      },
      valid: false
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
      if (!this.$refs.form.validate()) {
        this.state = '입력을 올바르게 해주세요'
        this.isAlertShow = true
        return
      }

      // backend에 개인정보 수정 요청
      try {
        await this.$http.put('/api/users/' + this.user.id, {
          type: 'keyword_change',
          password: this.password,
          keywords: this.keywords.sort()
        })
        // 업데이트된 유저정보를 다시 받아서 vuex의 정보 업데이트
        const resU = await this.$http.get('/api/users/' + this.user.id)
        this.$store.commit('MODIFY', resU.data)
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
