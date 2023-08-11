require('dotenv').config()
import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'pt_BR',
    },
    titleTemplate: '%s - Vicente 5 anos',
    title: 'Vicente 5 anos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Você está convidado para um dia cheio de aventuras em meu aniversário!',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        property: 'og:description',
        content: 'Você está convidado para um dia cheio de aventuras em meu aniversário!',
      },
      { hid: 'og:title', name: 'og:title', content: 'Vicente 5 anos' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://vicentecarlosmeira.com.br',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://vicentecarlosmeira.com.br/icon.jpeg',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://vicentecarlosmeira.com.br/icon.jpeg',
      },
    ],
  },

  /**
   * Loading config component
   */
  loading: '~/components/AppLoading.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/toasted.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-axios', '~/plugins/vue-the-mask'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/toast'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://birthdays-api.rafaelmeira.com.br',
  },

  /**
   * Toast options
   */
  toast: {
    position: 'top-center',
    iconPack: 'mdi',
    duration: 5000,
    action: {
      icon: 'mdi-close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#ff3130',
          accent: '#e83906',
          secondary: '#023280',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
