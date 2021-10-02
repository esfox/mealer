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
      @set-food="showSetFood"
      @cancel="onHideDate"
    />
    <v-dialog v-model="setFoodShown" max-width="350" persistent scrollable>
      <SetFood @finish="setFoodShown = false" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      selectedDate: null,
      dateShown: false,
      setFoodShown: false,
    };
  },
  computed: {
    mealsByDate() {
      return this.$store.state.meals.mappedByDate;
    },
    meals() {
      const meals = [];
      for (let date in this.mealsByDate) {
        for (const { food } of this.mealsByDate[date]) {
          date = new Date(date);
          meals.push({
            name: food.name,
            start: date,
            end: date,
            color: 'secondary',
            timed: false,
          });
        }
      }
      return meals;
    },
    selectedDateMeals() {
      return this.mealsByDate ? this.mealsByDate[this.selectedDate] : [];
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
    this.$nuxt.$on('tab-change', () => (this.dateShown = false));
  },
  methods: {
    showDate({ date }) {
      this.dateShown = true;
      this.selectedDate = date;
    },
    showSetFood() {
      this.setFoodShown = true;
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
