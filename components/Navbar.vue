<template>
  <nav class="Desktop">
    <v-app-bar
      dense
      fixed
      app
    >
      <v-btn text @click="handleDrawer()" @click.stop="mini = !mini">
        <v-icon>fa fa-bars</v-icon>
      </v-btn>
      <v-toolbar-title>
        <img src="../assets/koompi_title-min.png" alt="logo_koompi" style="width: 140px">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="handleSignout()">
        <span>SignOut</span>
        <v-icon right>fa fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item-group color="#79c4ff">
        <div style="padding-top: 3rem"></div>
        <v-list-item v-for="(item, index) in navItems" :key="index" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      active: false,
      navItems: [
        { path: '/' , text: 'Wallet', icon: 'fas fa-wallet' },
        { path: '/transaction' , text: 'Transaction', icon: 'fas fa-list' },
        { path: '/send' , text: 'Send', icon: 'fas fa-arrow-up' },
        { path: '/receive' , text: 'Receive', icon: 'fas fa-arrow-down' },
        { path: '/setting' , text: 'Setting', icon: 'fas fa-cog' },
      ]
    }
  },
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer;
    },
    handleSignout() {
      this.$store.dispatch('users/handleLogout');
    },
  }
}
</script>

<style scoped>
  @media only screen and (max-width: 500px) {
    .Desktop {
      display: none!important;
    }
  }
  /* Tablet */
  @media only screen and (min-width: 501px) and (max-width: 767px) {
    .Desktop {
      display: none!important;
    }
  }
</style>