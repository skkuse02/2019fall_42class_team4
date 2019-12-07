import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://34.239.13.251:3000/' // release version
// Vue.prototype.$http.defaults.baseURL = 'http://localhost:3000/' // develop version
