<template>
  <div>
    <div class="pa-8">
      <v-progress-circular v-if="loading" color="primary" size="72" width="8" indeterminate />
      <template v-else>
        <h2 v-if="!food || food.length === 0" class="text--secondary">
          You haven't added any food yet.
        </h2>
        <template v-else>
          <FoodGrid :food="food" class="justify-center" @edit="promptEdit" @delete="promptDelete" />
        </template>
      </template>
    </div>
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
    <v-dialog v-model="showModal" max-width="350" persistent>
      <template v-if="modalContent === 'add-food'">
        <AddFood @finish="closeModal" />
      </template>
      <template v-if="modalContent === 'edit-food'">
        <EditFood :food="foodToEdit" @finish="closeModal" />
      </template>
      <template v-if="modalContent === 'delete-food'">
        <DeleteFood :food="foodToDelete" @finish="closeModal" />
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      modalContent: undefined,
      foodToEdit: undefined,
      foodToDelete: undefined,
      loading: false,
    };
  },
  computed: {
    food() {
      return this.$store.state.food.list;
    },
  },
  async created() {
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
      this.showModal = true;
      this.modalContent = modalContent;
    },
    closeModal() {
      this.showModal = false;
    },
    promptEdit(foodToEdit) {
      this.foodToEdit = foodToEdit;
      this.openModal('edit-food');
    },
    promptDelete(foodToDelete) {
      this.foodToDelete = foodToDelete;
      this.openModal('delete-food');
    },
  },
};
</script>

<style lang="scss" scoped>
.add-food {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
