<template>
  <div class="meals">
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
          <DateMeals :meals="mealsByDate[date]" :date="date" />
        </v-list-item>
      </v-list-group>
    </v-list>
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
      loading: false,
    };
  },
  computed: {
    meals() {
      return this.$store.state.meals.list;
    },
    mealsByDate() {
      const mealsByDate = {};
      for (const meal of this.meals) {
        const { date } = meal;
        if (!mealsByDate[date]) mealsByDate[date] = [];
        mealsByDate[date].push(meal);
      }
      return mealsByDate;
    },
    selectedDateMeals() {
      return this.meals ? this.meals.filter(({ date }) => date === this.selectedDate) : [];
    },
  },
  async created() {
    this.loading = true;
    try {
      await this.$store.dispatch('meals/load');
    } catch (error) {
      this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
    }
    this.loading = false;
  },
};
</script>

<style lang="scss">
.meals {
  .v-list-item__icon {
    min-width: 1.5rem !important;
    margin-left: 0.75rem !important;
  }
}
</style>
