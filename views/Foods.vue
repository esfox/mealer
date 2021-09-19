<template>
  <div>
    <div class="food d-flex flex-wrap justify-center pa-8">
      <v-progress-circular v-if="loading" color="primary" size="72" width="8" indeterminate />
      <template v-else>
        <template v-if="foods">
          <h2 v-if="foods.length === 0" class="text--secondary">You haven't added any food yet.</h2>
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
      </template>
    </div>
    <v-dialog v-model="showModal" max-width="350" persistent>
      <template v-if="modalContent === 'add-food'">
        <AddFood @save="addFood" @cancel="closeModal" />
      </template>
      <template v-if="modalContent === 'edit-food'">
        <EditFood :food="foodToEdit" @save="editFood" @cancel="closeModal" />
      </template>
      <template v-if="modalContent === 'delete-food'">
        <DeleteFood :food="foodToDelete" @delete="deleteFood" @cancel="closeModal" />
      </template>
    </v-dialog>
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
      foods: undefined,
      showModal: false,
      modalContent: undefined,
      foodToEdit: undefined,
      foodToDelete: undefined,
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const { data, error } = await this.$api.food.get();
    if (data) this.foods = data;
    if (error) this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
    this.loading = false;
  },
  methods: {
    openModal(modalContent) {
      this.showModal = true;
      this.modalContent = modalContent;
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = undefined;
    },
    promptEdit(foodToEdit) {
      this.openModal('edit-food');
      this.foodToEdit = foodToEdit;
    },
    promptDelete(foodToDelete) {
      this.openModal('delete-food');
      this.foodToDelete = foodToDelete;
    },
    addFood(food) {
      this.foods.push(food);
      this.closeModal();
    },
    editFood(food) {
      this.foods.find(({ id }) => id === food.id).name = food.name;
      this.closeModal();
    },
    deleteFood(food) {
      this.foods = this.foods.filter(({ name }) => name !== food.name);
      this.closeModal();
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
