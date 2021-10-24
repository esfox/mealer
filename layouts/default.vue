<template>
  <v-app>
    <v-app-bar app dark color="primary">
      <v-toolbar-title class="text-h4 font-weight-bold"> 🍱 Mealer </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer app fixed padless elevation="8">
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
    };
  },
  created() {
    this.$nuxt.$on('error', (error) => {
      this.error = true;
      this.errorMessage = error;
    });
  },
};
</script>

<style>
html {
  overflow-y: auto !important;
}

.tabs .v-tabs-bar {
  height: 64px;
}

.v-tab {
  text-transform: none !important;
}
</style>
