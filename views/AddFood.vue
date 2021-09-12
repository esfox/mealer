<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-toolbar class="pr-0" color="primary" dark>
        <v-toolbar-title class="font-weight-bold">Add Food</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text class="d-flex flex-column mt-8">
        <v-text-field
          v-model="food.name"
          label="Name"
          placeholder="Pizza"
          filled
          autofocus
          :error-messages="nameError"
          @input="nameError = undefined"
        />
        <div class="d-flex align-center">
          <span v-if="error" class="error--text">{{ error }}</span>
          <v-spacer />
          <v-btn color="secondary" large rounded :loading="loading" @click="save">
            <v-icon class="mr-1">mdi-content-save</v-icon>
            <h3>Save</h3>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
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
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    close() {
      this.show = false;
      this.error = undefined;
      this.nameError = undefined;
    },
    async save() {
      this.loading = true;
      try {
        const savedFood = await this.$axios.$post('/food', this.food);
        this.show = false;
        this.food = {};
        this.$emit('save', savedFood);
      } catch (error) {
        const { status } = error.response;
        if (status === 409) this.nameError = 'This food name already exists';
        else if (status === 400) this.error = 'Invalid input';
        else this.error = 'An unknown error occurred';
      }
      this.loading = false;
    },
  },
};
</script>
