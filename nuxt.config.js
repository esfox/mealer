import colors from 'vuetify/es5/util/colors';

export default {
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mealer',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'Very simple app to plan your meals' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL || '',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Mealer',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Very simple app to plan your meals',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL || ''}/bentobox.png`,
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'mealer.vercel.app',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/api/index.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/views',
    '~/layouts',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['nuxt-supabase', {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_PUBLIC_KEY,
    }]
  ],

  serverMiddleware: [
    { path: '/api', handler: '~/api/api.js' },
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: colors.red.base,
          secondary: colors.amber.darken3,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
      },
    },
    treeShake: true,
  },
};
