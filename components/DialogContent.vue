<template>
  <v-card :max-height="maxHeight">
    <v-toolbar
      class="toolbar pr-0"
      v-bind="{
        color: coloredTitleBar ? 'primary' : '',
        dark: coloredTitleBar,
        elevation: coloredTitleBar ? undefined : 0,
      }"
    >
      <v-toolbar-title class="d-flex align-center font-weight-bold">
        {{ title }}
        <slot name="title-append" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon :disabled="loading" @click="$emit('cancel')"><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card-text class="px-5">
      <slot />
    </v-card-text>
    <v-card-actions v-if="!noActions" class="d-flex align-center pb-4 px-5">
      <span v-if="error" class="error--text">{{ error }}</span>
      <v-spacer />
      <v-btn class="px-3" depressed large :disabled="loading" @click="$emit('cancel')">
        <slot name="cancel" />
      </v-btn>
      <v-btn
        class="px-3"
        depressed
        large
        dark
        :color="isDanger ? 'red' : 'secondary'"
        :loading="loading"
        @click="$emit('confirm')"
      >
        <slot name="confirm" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    coloredTitleBar: {
      type: Boolean,
      default: false,
    },
    noActions: {
      type: Boolean,
      default: false,
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  z-index: 1;
}
</style>
