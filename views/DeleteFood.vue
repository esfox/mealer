<template>
  <DialogContent
    :title="`Delete '${food.name}'`"
    :loading="loading"
    is-danger
    @cancel="cancel"
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
    cancel() {
      this.$emit('cancel');
    },
    async confirmDelete() {
      this.loading = true;
      const { error } = await this.$api.food.del(this.food.id);
      if (error) this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
      else this.$emit('delete', this.food);
      this.loading = false;
    },
  },
};
</script>

