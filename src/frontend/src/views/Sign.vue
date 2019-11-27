<template>
  <sign-in v-if="show" @changeShow="show = !show"></sign-in>
  <sign-up v-else @changeShow="show = !show"></sign-up>
</template>

<script>
import SignIn from '@/components/sign/SignIn'
import SignUp from '@/components/sign/SignUp'

export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    SignIn, SignUp
  }
}
</script>
