<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <div style="margin-top: 3rem"></div>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
export default {
  components: {
    Navbar,
    Footer
  },
}
</script>

<style>
.v-navigation-drawer,
.v-app-bar {
  background: #1a2029!important;
}
.v-application {
  background:#222834!important;
}
.v-data-table {
  background: transparent!important;
}
.v-tabs > .v-tabs-bar {
  background: transparent!important;
}
.detail {
  padding: 1rem;
}
/* SmartPhone */
@media only screen and (max-width: 500px) {
  .v-content {
    padding: 0!important;
  }
}
/* Tablet */
@media only screen and (min-width: 501px) and (max-width: 767px) {
  .v-content {
    padding: 0!important;
  } 
}
</style>