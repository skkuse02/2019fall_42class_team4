<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex 12 xs>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field v-model="email" label="e-mail"></v-text-field>
            <v-text-field v-model="password" label="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      // backend에 요청
      console.log("Login");
    }
  }
};
</script>
