export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  env: {
    apiUrl: 'https://testnet-api.zeetomic.com/pub/v1'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
 plugins: [
  { src: '~/plugins/vue-qr', ssr: false },
  { src: '~/plugins/vue-qrcode-reader', ssr: false },
  { src: '~/plugins/chart'},
],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],
  css: [
    '~/assets/main.css'
  ],
  toast: {
    position: 'top-center',
    theme: "bubble", 
    duration: '3000',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {icons: 'fa'},
    theme: {
      dark: true,
    }
  },
  icon: {
    iconSrc: './assets/koompi_icon_launcher.png',
  },
  manifest: {
    short_name: 'Koompi Wallet',
    name: 'Koompi Wallet',
    start_url: '/',
    theme_color: '#222834',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
