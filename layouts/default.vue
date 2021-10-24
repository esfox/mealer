<template>
  <v-app class="app">
    <v-app-bar app dark color="primary">
      <v-toolbar-title class="text-h4 font-weight-bold"> 🍱 Mealer </v-toolbar-title>
      <v-spacer />
      <v-menu v-if="user.name && user.image" offset-y>
        <template #activator="{ on, attributes }">
          <v-btn
            class="px-4"
            color="transparent"
            depressed
            x-large
            rounded
            v-bind="attributes"
            v-on="on"
          >
            <v-avatar size="40"><img :src="user.image" :alt="user.name" /></v-avatar>
            <h3 class="pl-2">{{ user.name }}</h3>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="logout">
            <v-icon>mdi-logout</v-icon>
            <v-list-item-title class="pl-2">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer class="footer" elevation="8" app fixed padless>
      <v-tabs
        v-model="tab"
        class="tabs"
        slider-size="4"
        color="white"
        background-color="primary"
        dark
        grow
        @change="$nuxt.$emit('tab-change', tab)"
      >
        <v-tab class="font-weight-bold py-8">
          <v-icon large class="pr-3">mdi-food-fork-drink</v-icon>
          <h2>Meals</h2>
        </v-tab>
        <v-tab class="font-weight-bold">
          <v-icon class="pr-3">mdi-calendar-month</v-icon>
          <h2>Food</h2>
        </v-tab>
      </v-tabs>
    </v-footer>
    <v-snackbar v-model="error" class="mb-6" color="error" elevation="8" timeout="3000" text>
      {{ errorMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      error: undefined,
      errorMessage: '',
      showDialog: false,
      user: {
        name: '',
        image: '',
      },
    };
  },
  created() {
    if (process.client) {
      setTimeout(async () => {
        const user = await this.$supabase.auth.user();
        if (!user) return;
        const { user_metadata: userInfo } = user;
        this.user.name = userInfo.full_name;
        this.user.image = userInfo.avatar_url;
      }, 1000);

      this.$nuxt.$on('error', (error) => {
        this.error = true;
        this.errorMessage = error;
      });
    }
  },
  methods: {
    async logout() {
      await this.$supabase.auth.signOut();
    },
  },
};
</script>

<style lang="scss">
html {
  overflow-y: auto !important;
}

.app {
  .footer {
    z-index: 9999;

    .tabs .v-tabs-bar {
      height: 64px;
    }
  }

  .v-tab {
    text-transform: none !important;
  }
}
</style>
