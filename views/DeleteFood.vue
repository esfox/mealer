<template>
  <DialogContent
    :title="`Delete '${food.name}'`"
    :loading="loading"
    is-danger
    @cancel="$emit('finish')"
    @confirm="confirmDelete"
  >
    Are you sure you want to delete '{{ food.name }}'?
    <template #cancel>Cancel</template>
    <template #confirm> <v-icon class="mr-1">mdi-delete</v-icon> Delete</template>
  </DialogContent>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default: () => ({ id: 0, name: '' }),
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async confirmDelete() {
      this.loading = true;

      try {
        await this.$store.dispatch('food/del', this.food.id);
        this.$emit('finish');
      } catch (error) {
        this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
      }

      this.loading = false;
    },
  },
};
</script>

