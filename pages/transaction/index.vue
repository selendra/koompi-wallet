<template>
  <v-card class="detail">
    <h2>Transaction</h2>
    <v-tabs height="40" color="white">
      <v-tab>All</v-tab>
      <v-tab>Received</v-tab>
      <v-tab>Send</v-tab>
    </v-tabs>
    <History :history="history" />
  </v-card>
</template>

<script>
import { history } from '~/utils/trx-history';
import History from '~/components/Table/History.vue';

export default {
  middleware: ['auth'],
  components: {
    History
  },
  asyncData: history,
}
</script>

<style scoped>
.v-card {
  background: rgba(52, 64, 81, 0.1)!important;
}
</style>