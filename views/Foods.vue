<template>
  <div>
    <div class="food d-flex flex-wrap justify-center pa-8">
      <v-progress-circular v-if="loading" color="primary" size="72" width="8" indeterminate />
      <template v-else>
        <template v-if="foods">
          <h2 v-if="foods.length === 0" class="text--secondary">You haven't added any food yet.</h2>
          <template v-else>
            <Food v-for="({ name }, i) of foods" :key="i" :name="name" @delete="deleteFood(i)" />
          </template>
        </template>
      </template>
    </div>
    <AddFood v-model="toAddFood" @save="(food) => foods.push(food)" />
    <v-btn
      class="add-food font-weight-bold ma-8"
      color="secondary"
      elevation="8"
      rounded
      dark
      x-large
      @click="toAddFood = !toAddFood"
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
      toAddFood: false,
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const foods = await this.$axios.$get('/food');
      this.foods = foods;
    } catch (error) {
      this.$nuxt.$emit('error', error.response.data);
    }
    this.loading = false;
  },
  methods: {
    async deleteFood(i) {
      this.loading = true;
      try {
        const food = this.foods[i];
        await this.$axios.$delete(`/food/${food.id}`);
        this.foods = this.foods.filter(({ name }) => name !== food.name);
      } catch (error) {
        this.$nuxt.$emit('error', error.response.data);
      }
      this.loading = false;
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
