<template>
  <v-app>
    <v-app-bar app dark extension-height="58" color="primary">
      <v-toolbar-title class="text-h4 font-weight-bold">
        🍱 Mealer
      </v-toolbar-title>
      <template #extension>
        <v-tabs v-model="tab" grow @change="$nuxt.$emit('tab-change', tab)">
          <v-tab class="font-weight-bold py-4">
            <v-icon large class="pr-3">mdi-food-fork-drink</v-icon>
            <h2>Food</h2>
          </v-tab>
          <v-tab class="font-weight-bold py-4">
            <v-icon class="pr-3">mdi-calendar-month</v-icon>
            <h2>Meals</h2>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
    }
  },
}
</script>

<style>
html {
  overflow-y: auto !important;
}

.v-tab {
  text-transform: none !important;
}
</style>
