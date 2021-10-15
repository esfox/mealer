<template>
  <div class="meals-food">
    <div>
      <MealTimeFood
        v-for="(mealTime, i) of mealTimes"
        :key="i"
        :meal-time="mealTime"
        :food="getMealTimeFood(mealTime.id, date)"
        :loading="loadingMealTimesIDs.includes(mealTime.id)"
        @add="showSetFood"
        @delete="showDeleteFoodConfirm"
      />
    </div>
    <v-bottom-sheet v-model="addFoodShown" max-width="500" no-click-animation scrollable>
      <DialogContent
        title="Add Food"
        max-height="600"
        no-actions
        colored-title-bar
        @cancel="hideSetFood"
      >
        <template #title-append>
          <v-icon class="mx-2">mdi-chevron-right</v-icon>
          <span class="title-append font-weight-regular">
            {{ formattedDate }} | {{ mealTimeToEditFood.name }}
          </span>
        </template>
        <FoodGrid :food="food" class="pt-6" minimal can-click-food @click:food="setFood" />
      </DialogContent>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="deleteFoodConfirmShown" max-width="500" no-click-animation scrollable>
      <DialogContent
        is-danger
        :title="`Delete '${foodToDelete.name}'`"
        @confirm="unsetFood"
        @cancel="hideDeleteFoodConfirm"
      >
        Are you sure you want to delete <strong>{{ foodToDelete.name }}</strong> from
        <strong>{{ mealTimeToEditFood.name }}</strong> on <strong>{{ formattedDate }}</strong
        >?
        <template #cancel>Cancel</template>
        <template #confirm> <v-icon class="mr-1">mdi-delete</v-icon> Delete </template>
      </DialogContent>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    meals: {
      type: Array,
      default: undefined,
    },
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      addFoodShown: false,
      deleteFoodConfirmShown: false,
      mealTimeToEditFood: {},
      foodToDelete: {},
      loadingMealTimesIDs: [],
    };
  },
  computed: {
    mealTimes() {
      return this.$store.state.mealTimes.list;
    },
    food() {
      return [...this.$store.state.food.list].sort((a, b) => a.name.localeCompare(b.name));
    },
    formattedDate() {
      return new Date(this.date).toLocaleDateString('default', { month: 'long', day: 'numeric' });
    },
  },
  async created() {
    this.loading = true;

    try {
      await this.$store.dispatch('food/load');
    } catch (error) {
      this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
    }

    try {
      await this.$store.dispatch('mealTimes/load');
    } catch (error) {
      this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
    }

    this.loading = false;
  },
  methods: {
    getMealTimeFood(mealTimeID, date) {
      return this.$store.getters['meals/getMealTimeFood'](mealTimeID, date);
    },
    showSetFood({ mealTime }) {
      this.mealTimeToEditFood = mealTime;
      requestAnimationFrame(() => requestAnimationFrame(() => (this.addFoodShown = true)));
    },
    hideSetFood() {
      this.addFoodShown = false;
    },
    showDeleteFoodConfirm({ mealTime, food }) {
      this.mealTimeToEditFood = mealTime;
      this.foodToDelete = food;
      this.deleteFoodConfirmShown = true;
    },
    hideDeleteFoodConfirm() {
      this.deleteFoodConfirmShown = false;
    },
    async setFood(food) {
      this.hideSetFood();
      const mealTime = this.mealTimeToEditFood;
      this.loadingMealTimesIDs.push(mealTime.id);
      try {
        await this.$store.dispatch('meals/add', {
          food,
          mealTime,
          date: this.date,
        });
      } catch (error) {
        this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
      }
      this.loadingMealTimesIDs.splice(this.loadingMealTimesIDs.indexOf(mealTime.id), 1);
    },
    async unsetFood() {
      this.hideDeleteFoodConfirm();
      const mealTime = this.mealTimeToEditFood;
      this.loadingMealTimesIDs.push(mealTime.id);
      try {
        await this.$store.dispatch('meals/del', {
          foodID: this.foodToDelete.id,
          mealTimeID: mealTime.id,
          date: this.date,
        });
      } catch (error) {
        this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
      }
      this.loadingMealTimesIDs.splice(this.loadingMealTimesIDs.indexOf(mealTime.id), 1);
    },
  },
};
</script>

<style lang="scss">
.meals-food {
  .v-chip {
    background: var(--v-secondary-base) !important;
    color: white !important;

    .v-chip__close {
      color: white;
    }
  }
}
</style>
