<template>
  <div class="wrapper">
    <div>
      <h1 class="text-center primary--text">🍱 Mealer</h1>
      <v-btn class="mt-8" rounded x-large @click="loginWithGoogle">
        <img src="google-logo.svg" alt="Google Logo" class="mr-2" />
        Login with Google
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  methods: {
    async loginWithGoogle() {
      await this.$supabase.auth.signIn({ provider: 'google' });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  place-items: center;
  height: 100%;
}
</style>
