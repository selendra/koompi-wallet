<template>
  <v-app dark>
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }} redirect in 3 seconds
        </h1>
        <h1 v-else>
          {{ otherError }} redirect in 3 seconds
        </h1>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'login_register',
  props: {
    error: {
      type: Object,
      default: null
    },
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      time: '',
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    redirect() {
      setTimeout(()=> {
        this.$router.push('/login');
      }, 3000)
    }
  },
  created() {
    return this.redirect();
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
