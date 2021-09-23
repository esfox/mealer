<template>
  <div class="pa-12">
    <div v-if="loading" class="text-center">
      <v-progress-circular color="primary" size="72" width="8" indeterminate />
    </div>
    <template v-else>
      <div class="text--secondary mb-2">Click on a date to add a meal</div>
      <v-calendar
        class="calendar"
        :event-ripple="false"
        :events="meals"
        :event-more="false"
        @click:day="showDate"
      >
        <template #day-label="{ day }">
          <div class="d-flex py-2">
            <h3 class="flex-grow-1">{{ day }}</h3>
          </div>
        </template>
        <template #event="{ event }">
          <h2>{{ event.name }}</h2>
        </template>
      </v-calendar>
    </template>
    <CalendarDate
      v-model="dateShown"
      :date="selectedDate"
      :meals="selectedDateMeals"
      @cancel="onHideDate"
    />
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      meals: [],
      mealsByDate: {},
      selectedDate: null,
      dateShown: false,
      loading: false,
    };
  },
  computed: {
    selectedDateMeals() {
      return this.mealsByDate[this.selectedDate];
    },
  },
  async mounted() {
    this.loading = true;
    const { data, error } = await this.$api.meals.get();
    if (data) {
      const meals = [];
      const mealsByDate = {};
      for (let date in data) {
        const mealsThisDate = data[date];
        date = new Date(date);
        mealsByDate[format(date, 'yyyy-MM-dd')] = mealsThisDate;
        for (const { food } of mealsThisDate) {
          meals.push({
            name: food.name,
            start: date,
            end: date,
            color: 'secondary',
            timed: false,
          });
        }
      }
      this.mealsByDate = mealsByDate;
      this.meals = meals;
    }

    if (error) this.$nuxt.$emit('error', error?.response?.data || 'An unknown error occurred');
    this.loading = false;
  },
  created() {
    this.$nuxt.$on('tab-change', () => (this.dateShown = false));
  },
  methods: {
    showDate({ date }) {
      this.dateShown = true;
      this.selectedDate = date;
    },
    onHideDate() {
      this.dateShown = false;
    },
  },
};
</script>

<style lang="scss">
.calendar {
  .v-calendar-weekly__day {
    padding-block-end: 0.5rem;
    transition: 0.2s box-shadow;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%),
        0px 1px 14px 0px rgb(0 0 0 / 12%) !important;
    }
  }

  .v-event {
    width: 80% !important;
    height: 2.25rem !important;
    display: grid;
    place-items: center;
    border-radius: 999px !important;
    margin: auto !important;
    margin-block-start: 0.25rem !important;
  }
}
</style>
