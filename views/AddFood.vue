<template>
  <DialogContent
    title="Add Food"
    :colored-title-bar="true"
    :loading="loading"
    :error="error"
    @cancel="cancel"
    @confirm="save"
  >
    <v-text-field
      v-model="food.name"
      label="Name"
      placeholder="Pizza"
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
  data() {
    return {
      food: {
        name: '',
      },
      loading: false,
      error: undefined,
      nameError: undefined,
    };
  },
  methods: {
    cancel() {
      this.$emit('finish');
      this.food = {};
      this.error = undefined;
      this.nameError = undefined;
    },
    async save() {
      this.loading = true;

      try {
        await this.$store.dispatch('food/add', this.food);
        this.food = {};
        this.$emit('finish');
      } catch (error) {
        const { status } = error.response;
        if (status === 409) this.nameError = 'This food name already exists';
        else if (status === 400) this.nameError = 'Invalid input';
        else this.error = 'An unknown error occurred';
      }

      this.loading = false;
    },
  },
};
</script>
