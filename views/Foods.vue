<template>
  <div>
    <div class="food d-flex flex-wrap justify-center pa-8">
      <v-progress-circular v-if="loading" color="primary" size="72" width="8" indeterminate />
      <template v-else>
        <h2 v-if="!foods || foods.length === 0" class="text--secondary">
          You haven't added any food yet.
        </h2>
        <template v-else>
          <Food
            v-for="(food, i) of foods"
            :key="i"
            :name="food.name"
            @edit="promptEdit(food)"
            @delete="promptDelete(food)"
          />
        </template>
      </template>
    </div>
    <portal to="dialog">
      <template v-if="modalContent === 'add-food'">
        <AddFood @finish="closeModal" />
      </template>
      <template v-if="modalContent === 'edit-food'">
        <EditFood :food="foodToEdit" @finish="closeModal" />
      </template>
      <template v-if="modalContent === 'delete-food'">
        <DeleteFood :food="foodToDelete" @finish="closeModal" />
      </template>
    </portal>
    <v-btn
      class="add-food font-weight-bold ma-8"
      color="secondary"
      elevation="8"
      rounded
      dark
      x-large
      @click="openModal('add-food')"
    >
      <v-icon class="mr-1 text-h4">mdi-plus</v-icon>
      <h3>Add Food</h3>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalContent: undefined,
      foodToEdit: undefined,
      foodToDelete: undefined,
      loading: false,
    };
  },
  computed: {
    foods() {
      return this.$store.state.food.list;
    },
  },
  async mounted() {
    this.loading = true;
    try {
      await this.$store.dispatch('food/load');
    } catch (error) {
      this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
    }
    this.loading = false;
  },
  methods: {
    openModal(modalContent) {
      this.$nuxt.$emit('dialog', true);
      this.modalContent = modalContent;
    },
    closeModal() {
      this.$nuxt.$emit('dialog', false);
    },
    promptEdit(foodToEdit) {
      this.openModal('edit-food');
      this.foodToEdit = foodToEdit;
    },
    promptDelete(foodToDelete) {
      this.openModal('delete-food');
      this.foodToDelete = foodToDelete;
    },
  },
};
</script>

<style lang="scss" scoped>
.food {
  gap: 1.5rem;
}

.add-food {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
