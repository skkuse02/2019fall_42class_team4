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
            <v-form>
              <v-text-field
                v-model="id"
                label="ID"
                type="text"></v-text-field>
              <v-text-field
              v-model="password"
                :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShow ? 'text' : 'password'"
              label="Password"
              @click:append="isPasswordShow = !isPasswordShow"></v-text-field>
              <v-text-field
                v-model="name"
                label="Name"
                type="text"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="SignUp">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
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
      name: ''
    }
  },
  methods: {
    SignUp () {
      // backend에 요청
      console.log(this.id)
      console.log(this.password)
      console.log(this.name)
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
