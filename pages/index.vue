<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card class="detail">
          <h2 >Koompi Wallet</h2>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-progress-circular
                v-for="item in portfolio" :key="item.id"
                :rotate="360"
                :size="150"
                :width="18"
                :value="100"
                color="#79c4ff"
              >
                $ {{ item.balance ? item.balance : 0 }}
              </v-progress-circular>
              <v-progress-circular
                v-if="portfolio.error"
                :rotate="360"
                :size="150"
                :width="18"
                :value="100"
                color="#79c4ff"
              >
                $ 0
              </v-progress-circular>
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
          <v-data-table
            v-else
            hide-default-footer
            hide-default-header
          >
            <template v-if="!portfolio.error" v-slot:header> 
              <thead>
                <tr>
                  <th class="text-left" style="color: #79c4ff">Asset</th>
                  <th class="text-left" style="color: #79c4ff">Amount</th>
                </tr>
              </thead>
            </template>
            <template v-if="!portfolio.error" v-slot:body>
              <tbody>
                <tr v-for="item in portfolio" :key="item.id">
                  <td class="d-flex align-center">
                    <img src="~/assets/koompi_logo.png" alt="ke_token" class="ke_token">
                    <span v-if="item.asset_code">{{ item.asset_code }}</span>
                    <span v-else>{{ item.asset_type }}</span>
                  </td>
                  <td>{{ item.balance }}</td>
                </tr>
              </tbody>
            </template>
            <template v-if="portfolio.error" v-slot:no-data>
              <span>No data available</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import Cookie from 'js-cookie';
export default {
  middleware: ['auth'],
  asyncData ({req, res, error, redirect, commit}) {
    let token;
    if (process.server) {
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    }
    if (process.client) {
      token = Cookie.get("jwt");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    return axios.get(process.env.apiUrl + "/portforlio", config)
      .then((res) => {
        return { portfolio: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  }
}
</script>

<style scoped>
.ke_token {
  width: 26px;
  margin: 5px; 
}
.v-card {
  background: rgba(52, 64, 81, 0.1)!important;
}
</style>