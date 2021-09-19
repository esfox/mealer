<template>
  <DialogContent
    :title="`Edit '${initialName}'`"
    :loading="loading"
    :error="error"
    @cancel="cancel"
    @confirm="save"
  >
    <v-text-field
      v-model="name"
      label="Name"
      filled
      autofocus
      hide-details="auto"
      :error-messages="nameError"
      :disabled="loading"
      @input="nameError = undefined"
    />
    <template #cancel>Cancel</template>
    <template #confirm> <v-icon class="mr-1">mdi-content-save</v-icon> Save </template>
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
      name: this.food.name,
      loading: false,
      error: undefined,
      nameError: undefined,
    };
  },
  computed: {
    initialName() {
      return this.food.name;
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async save() {
      this.loading = true;
      const { data, error } = await this.$api.food.edit(this.food.id, { name: this.name });
      if (data) this.$emit('save', data);
      if (error) {
        const { status } = error.response;
        if (status === 400) this.error = 'Invalid input';
        else this.error = 'An unknown error occurred';
      }
      this.loading = false;
    },
  },
};
</script>
