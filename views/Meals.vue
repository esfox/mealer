<template>
  <div class="meals mx-auto">
    <div v-if="loading" class="text-center ma-12">
      <v-progress-circular color="primary" size="72" width="8" indeterminate />
    </div>
    <v-list v-else expand>
      <v-list-group
        v-for="({ date, formatted }, i) of weekDates"
        :key="i"
        :value="true"
        color="none"
      >
        <template #activator>
          <h3 class="mr-4">
            {{ formatted }}
          </h3>
          <v-divider />
        </template>
        <v-list-item class="d-block pt-2">
          <MealTimeFood
            v-for="(mealTime, mealTimeIndex) of mealTimes"
            :key="mealTimeIndex"
            class="meal-time-food"
            :meal-time="mealTime"
            :food="getMealTimeFood(date, mealTime.id)"
            :loading="loadingMeals.includes(getLoadingKey(date, mealTime))"
            @add="({ mealTime }) => showSetFood(date, mealTime)"
            @delete="({ mealTime, food }) => showDeleteFoodConfirm(date, mealTime, food)"
          />
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-dialog v-model="addFoodShown" max-width="500" scrollable>
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
            {{ formattedDate }} | {{ selectedMealTime.name }}
          </span>
        </template>
        <div class="pt-4">Click on the food to add</div>
        <FoodGrid :food="food" class="pt-3" minimal can-click-food @click:food="setFood" />
      </DialogContent>
    </v-dialog>
    <v-dialog v-model="deleteFoodConfirmShown" max-width="500" scrollable>
      <DialogContent
        is-danger
        :title="`Delete '${selectedFood.name}'`"
        @confirm="unsetFood"
        @cancel="hideDeleteFoodConfirm"
      >
        Are you sure you want to delete <strong>{{ selectedFood.name }}</strong> from
        <strong>{{ selectedMealTime.name }}</strong> on <strong>{{ formattedDate }}</strong
        >?
        <template #cancel>Cancel</template>
        <template #confirm> <v-icon class="mr-1">mdi-delete</v-icon> Delete </template>
      </DialogContent>
    </v-dialog>
  </div>
</template>

<script>
import { startOfWeek, format } from 'date-fns';

export default {
  data() {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push({
        formatted: weekStart.toLocaleDateString('default', { month: 'long', day: 'numeric' }),
        date: format(weekStart, 'yyyy-MM-dd'),
      });
      weekStart.setTime(weekStart.getTime() + 1000 * 60 * 60 * 24);
    }

    return {
      weekDates,

      addFoodShown: false,
      deleteFoodConfirmShown: false,

      selectedDate: {},
      selectedMealTime: {},
      selectedFood: {},

      loading: false,
      loadingMeals: [],
    };
  },
  computed: {
    food() {
      return [...this.$store.state.food.list].sort((a, b) => a.name.localeCompare(b.name));
    },
    mealTimes() {
      return this.$store.state.mealTimes.list;
    },
    meals() {
      return this.$store.state.meals.list;
    },
    selectedDateMeals() {
      return this.meals ? this.meals.filter(({ date }) => date === this.selectedDate) : [];
    },
    formattedDate() {
      return new Date(this.selectedDate).toLocaleDateString('default', {
        month: 'long',
        day: 'numeric',
      });
    },
  },
  async created() {
    this.loading = true;

    try {
      await Promise.all([
        this.$store.dispatch('food/load'),
        this.$store.dispatch('mealTimes/load'),
        this.$store.dispatch('meals/load'),
      ]);
    } catch (error) {
      this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
    }

    this.loading = false;
  },
  methods: {
    getMealTimeFood(date, mealTimeID) {
      return this.$store.getters['meals/getMealTimeFood'](date, mealTimeID);
    },
    showSetFood(date, mealTime) {
      this.selectedDate = date;
      this.selectedMealTime = mealTime;
      requestAnimationFrame(() => requestAnimationFrame(() => (this.addFoodShown = true)));
    },
    hideSetFood() {
      this.addFoodShown = false;
    },
    showDeleteFoodConfirm(date, mealTime, food) {
      this.selectedDate = date;
      this.selectedMealTime = mealTime;
      this.selectedFood = food;
      this.deleteFoodConfirmShown = true;
    },
    hideDeleteFoodConfirm() {
      this.deleteFoodConfirmShown = false;
    },
    getLoadingKey(date, mealTime) {
      return `${date}_${mealTime.id}`;
    },
    getSelectedLoadingKey() {
      const date = this.selectedDate;
      const mealTime = this.selectedMealTime;
      return this.getLoadingKey(date, mealTime);
    },
    async setFood(food) {
      this.hideSetFood();
      const loadingKey = this.getSelectedLoadingKey();
      this.loadingMeals.push(loadingKey);
      try {
        await this.$store.dispatch('meals/add', {
          food,
          mealTime: this.selectedMealTime,
          date: this.selectedDate,
        });
      } catch (error) {
        this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
      }
      this.loadingMeals.splice(this.loadingMeals.indexOf(loadingKey), 1);
    },
    async unsetFood() {
      this.hideDeleteFoodConfirm();
      const loadingKey = this.getSelectedLoadingKey();
      this.loadingMeals.push(loadingKey);
      try {
        await this.$store.dispatch('meals/del', {
          foodID: this.selectedFood.id,
          mealTimeID: this.selectedMealTime.id,
          date: this.selectedDate,
        });
      } catch (error) {
        this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
      }
      this.loadingMeals.splice(this.loadingMeals.indexOf(loadingKey), 1);
    },
  },
};
</script>

<style lang="scss">
.meals {
  max-width: 50rem;

  .v-list-item__icon {
    min-width: 1.5rem !important;
    margin-left: 0.75rem !important;
  }

  .meal-time-food {
    .v-chip {
      background: var(--v-secondary-base) !important;
      color: white !important;

      .v-chip__close {
        color: white;
      }
    }
  }
}
</style>
