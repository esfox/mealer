<template>
  <div class="meal-time-food grey lighten-4 rounded-lg pa-3 pb-4 mb-2">
    <div class="text-body-2">{{ mealTime.name }}</div>
    <div class="food d-flex flex-wrap align-center pt-3">
      <template v-if="food.length > 0">
        <FoodGrid :food="food" minimal can-remove @delete="deleteFood">
          <template #append>
            <v-btn icon @click="addFood">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </FoodGrid>
      </template>
      <v-btn v-else class="mx-auto" color="primary" rounded depressed @click="addFood">
        <v-icon class="mr-1">mdi-plus</v-icon>
        Add Food
      </v-btn>
    </div>
    <v-overlay :value="loading" absolute>
      <v-progress-circular class="my-1" color="white" size="28" indeterminate />
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    mealTime: {
      type: Object,
      default: () => ({}),
    },
    food: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addFood() {
      this.$emit('add', { mealTime: this.mealTime });
    },
    deleteFood(food) {
      this.$emit('delete', { mealTime: this.mealTime, food });
    },
  },
};
</script>

<style scoped>
.meal-time-food {
  position: relative;
}
</style>
