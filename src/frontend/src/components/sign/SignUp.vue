<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up Form</v-toolbar-title>
            <v-spacer></v-spacer>
            <a @click="$emit('changeShow')">Sgin In</a>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="form"
              lazy-validation
            >
              <!-- ID 입력 -->
              <v-text-field
                v-model="id"
                  :counter="10"
                label="ID"
                type="text"
                :rules="[rule.required, rule.maxLength(10)]"
                required
              >
              </v-text-field>
              <!-- PW 입력 -->
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
              <!-- 이름 입력 -->
              <v-text-field
                v-model="name"
                  :counter="10"
                label="Name"
                type="text"
                :rules="[rule.required, rule.maxLength(10)]"
                required
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
            <v-btn color="primary" @click="SignUp" :disabled="!valid">Sign Up</v-btn>
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
      name: '',
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
  methods: {
    async SignUp () {
      if (!this.$refs.form.validate()) {
        this.state = '입력을 올바르게 해주세요'
        this.isAlertShow = true
        return
      }

      // backend에 회원가입 요청
      try {
        const res = await this.$http.post('/api/signup', {
          id: this.id,
          password: this.password,
          name: this.name,
          customized_keyword: this.keywords,
          purchased_item: [],
          posted_review: [],
          recommended_review: []
        })
        console.log(res.data)
        alert('회원가입 완료, 로그인 하세요.')
        this.$router.go(-1)
      } catch (e) {
        let stateCode = e.message
        if (stateCode.includes('400')) {
          this.state = 'ID가 이미 존재합니다.'
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
