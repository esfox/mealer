<template>
  <v-bottom-sheet
    v-model="shown"
    max-width="350"
    hide-overlay
    persistent
    no-click-animation
    scrollable
  >
    <DialogContent :title="title" max-height="500" no-actions colored-title-bar @cancel="cancel">
      <h2 class="d-flex text--primary align-center">
        Meals
        <v-divider class="ml-3" />
      </h2>
      <pre
        >{{ JSON.stringify(meals, null, 2) }}
      </pre>
    </DialogContent>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
    meals: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    title() {
      return new Date(this.date).toLocaleDateString('default', { month: 'long', day: 'numeric' });
    },
    shown: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    cancel() {
      this.shown = false;
      this.$emit('cancel');
    },
  },
};
</script>
