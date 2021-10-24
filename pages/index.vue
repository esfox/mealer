<template>
  <v-tabs-items v-if="authenticated" v-model="tab" class="tabs">
    <v-tab-item>
      <Meals />
    </v-tab-item>
    <v-tab-item>
      <Food />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  async middleware({ $supabase, redirect }) {
    if (process.client && !(await $supabase.auth.session())) return redirect('/login');
  },
  data() {
    return {
      tab: 0,
      authenticated: false,
    };
  },
  created() {
    setTimeout(async () => {
      if (!(await this.$supabase.auth.session())) return this.$router.replace('/login');
      this.authenticated = true;
    }, 1000);

    this.$supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') this.$router.replace('/login');
    });

    this.$nuxt.$on('tab-change', (tab) => (this.tab = tab));
  },
};
</script>

<style lang="scss">
.tabs {
  height: 100%;

  .v-window-item {
    height: 100%;
  }
}
</style>
