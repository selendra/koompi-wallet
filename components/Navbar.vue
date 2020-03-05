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
        <img src="../assets/koompi_title-min.png" alt="logo_ke" style="width: 140px">
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
      <v-list>
        <v-list-item-group color="#79c4ff">
          <div style="padding-top: 3rem"></div>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>fas fa-wallet</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Wallet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/transaction">
            <v-list-item-icon>
              <v-icon>fas fa-list</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Transaction</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/send">
            <v-list-item-icon>
              <v-icon>fas fa-arrow-up</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Send</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="receive">
            <v-list-item-icon>
              <v-icon>fas fa-arrow-down</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Receive</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="setting">
            <v-list-item-icon>
              <v-icon>fas fa-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Setting</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
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
  /* //Tablet */
  @media only screen and (min-width: 501px) and (max-width: 767px) {
    .Desktop {
      display: none!important;
    }
  }
  /* //Normal */
  @media only screen and (min-width: 768px) and (max-width: 1199px){
    
  }
  /* Large monitor */
  @media only screen and (min-width: 1200px) and (max-width: 1919px) {
        
  }
  /* //Landscape */
  @media only screen and (max-height: 500px) {
      
  }
  /* Widescreen */
  @media only screen and (min-width: 1920px) {
      
  }
</style>