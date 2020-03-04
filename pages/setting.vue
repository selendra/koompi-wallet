<template>
  <div>
    <v-container>
    <h2>Setting</h2>
    <v-row>
      <v-col>
        <v-card class="detail">
          <br>
          <div class="d-flex flex-column">
            <v-row class="justify-center">
              <img src="~/assets/koompi_logo.png" alt="profile" style="width: 100px; height: 100px;">
            </v-row>
            <div class="pt-5"></div>
            <span style="text-align: center" class="font-weight-thin display-1" v-if="user_profile.first_name || user_profile.mid_name || user_profile.last_name">
              {{ user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name }}
            </span>
            <div v-else style="text-align: center">
              <span style="color: #415593" class="font-weight-thin headline">Please Verify Your Account</span>
              <v-row class="d-flex justify-center pt-6">
                <v-btn to="/verify" color="primary">Verify Account</v-btn>
              </v-row>
            </div>
          </div>
          <div class="setting_button">
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn color="secondary" large @click="openAddAsset()">
                  <span style="color: #fafafa">Add Asset</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn large outlined @click="openChangePassword()">Change Password</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn large outlined @click="handleSignOut()">Sign Out</v-btn>
              </v-col>
            </v-row>            
          </div>
        </v-card>
      </v-col>
    </v-row>
  <!-- Dialog ChangePassword-->
    <v-dialog
      v-model="dialogChangePassword"
      width="90%"
    >
      <v-sheet>
        <div class="container">
          <span class="font-weight-medium headline">Change Password</span>
          <div style="padding: 3% 0"></div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="Old Password"
              outlined
              type="password"
              v-model="current_password"
              :rules="current_passwordRule"
            ></v-text-field>
            <v-text-field
              label="New Password"
              outlined
              type="password"
              v-model="new_password"
              :rules="new_passwordRule"
            ></v-text-field>
            <v-text-field
              label="Confirm New Password"
              outlined
              type="password"
              v-model="new_password1"
              :rules="new_passwordMatch"
            ></v-text-field>
            <v-btn color="#415593" large style="width: 100%" :loading="loading" @click="handleChangePassword()">
              <span style="color: #fafafa">Change Now</span>
            </v-btn>
          </v-form>
        </div>
      </v-sheet>
    </v-dialog>
    <!-- Dialog AddAsset -->
     <v-dialog
      v-model="dialogAddAsset"
      width="90%"
    >
      <v-sheet>
        <div class="container">
          <span class="font-weight-medium headline">Add Asset</span>
          <div style="padding: 3% 0"></div>
          <v-form
            ref="form1"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="Asset Code"
              outlined
              v-model="asset_code"
              :rules="asset_codeRule"
            ></v-text-field>
            <v-text-field
              label="Asset Issuer"
              outlined
              v-model="asset_issuer"
              :rules="asset_issuerRule"
            ></v-text-field>
            <v-btn color="#415593" large style="width: 100%" :loading="loading" @click="handleAddAsset()">
              <span style="color: #fafafa">Add Asset</span>
            </v-btn>
          </v-form>
        </div>
      </v-sheet>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import axios from 'axios';
import { message } from "@/plugins/Mixin/message.js";
import { validate } from '@/plugins/Mixin/validate.js';

export default {
  middleware: ['auth'],
  mixins: [message, validate],
  data() {
    return {
      dialogChangePassword: false,
      dialogAddAsset: false,
      loading: false,

      current_password: '',
      new_password: '',
      new_password1: '',

      asset_code: '',
      asset_issuer: ''
    }
  },
  asyncData({req, res, error, redirect}) {
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
    return axios.get(process.env.apiUrl + "/userprofile", config)
      .then((res) => {
        return { user_profile: res.data }
      })
      .catch((e) => {
        redirect({
          name: 'login'
        })
      })
  },
  methods: {
    openAddAsset() {
      this.dialogAddAsset = true;
    },
    openChangePassword() {
      this.dialogChangePassword = true;
    },
    handleAddAsset() {
      if(this.$refs.form1.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleAddAsset', {
          asset_code: this.asset_code,
          asset_issuer: this.asset_issuer
        })
        .then(() => {
          this.$toast.success(this.msg);
          this.dialogAddAsset = false;
          this.loading = false;
          this.asset_code = '';
          this.asset_issuer = '';
        })
      }
    },
    handleChangePassword() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('users/handleChangePassword', {
          current_password: this.current_password,
          new_password: this.new_password
        })
        .then(() => {
          if(this.type === 'error'){ 
            this.$toast.error(this.msg);
          } else {
            this.$toast.success(this.msg);
          }
          this.dialogChangePassword = false;
          this.loading = false;
          this.current_password= '',
          this.new_password= '',
          this.new_password1= ''
        })
      }
    },
    handleSignOut() {
      this.$store.dispatch('users/handleLogout');
    }
  }
}
</script>

<style scoped>
.setting_button {
  padding-top: 3rem;
}
.container {
  padding: 2.6rem 10%;
}
.v-card {
  background: rgba(52, 64, 81, 0.1)!important;
}
.v-sheet {
  background: #1a2029;
}
</style>