<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card class="detail">
          <h2 >Koompi Wallet</h2>
          <v-row>
            <v-col class="d-flex justify-center" v-if="!portfolio.error">
              <client-only>
                <LineChart 
                  :chart-data="datacollection"
                  :styles="chart">
                </LineChart>
              </client-only>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card class="detail">
          <h2>My Porfolio</h2>
          <div v-if="portfolio.error" style="padding-top: 1rem">
            <h4 style="color: red">{{ portfolio.error.message }}</h4>
            <br>
            <v-btn rounded color="pink darken-3 white--text" to="/getwallet">Get Wallet</v-btn>
          </div>
          <Portfolio 
            v-else
            :portfolio="portfolio"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LineChart from '~/plugins/LineChart.js';
import { portfolio } from '~/utils/portfolio.js';
import Portfolio from '~/components/Table/Portfolio.vue';

export default {
  middleware: ['auth'],
  components : {
    LineChart,
    Portfolio,
  },
  asyncData: portfolio,
  data() {
    return {
      datacollection: null,
      width: 300,
    }
  },
  mounted() {
    if(!this.portfolio.error) this.fillData();
  },
  computed: {
    chart () {
      return {
        width: `${this.width}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.portfolio.map(asset => asset.asset_code !== undefined ? asset.asset_code : asset.asset_type),
        datasets: [
          {
            backgroundColor: ['#92fb85', '#5B9D53', '#6D8E69'],
            data: this.portfolio.map(asset => asset.balance)
          }
        ]
      }
    }
  },
}
</script>

<style scoped>
.v-card {
  background: rgba(52, 64, 81, 0.1)!important;
}
</style>