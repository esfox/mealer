<template>
  <v-tabs-items v-model="tab" class="tabs">
    <v-tab-item>
      <Foods />
    </v-tab-item>
    <v-tab-item> </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
    }
  },
  created() {
    this.$nuxt.$on('tab-change', (tab) => (this.tab = tab))
  },
}
</script>

<style lang="scss">
.tabs {
  height: 100%;

  .v-window-item {
    height: 100%;
  }
}
</style>
