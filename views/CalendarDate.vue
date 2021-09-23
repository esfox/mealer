<template>
  <v-bottom-sheet
    v-model="shown"
    max-width="350"
    hide-overlay
    persistent
    no-click-animation
    scrollable
  >
    <DialogContent :title="title" max-height="500" no-actions colored-title-bar @cancel="cancel">
      <div v-if="mealTimes.length === 0" class="text-subtitle-1 text-center">
        No food set for this day.
      </div>
      <div v-for="({ mealTime, foods }, mealTimeIndex) of mealTimes" :key="mealTimeIndex">
        <h2 class="d-flex text--primary align-center">
          {{ mealTime.name }}
          <v-divider class="ml-3" />
        </h2>
        <div class="foods d-flex flex-wrap pt-3 pb-5">
          <v-btn
            v-for="({ name }, foodIndex) of foods"
            :key="foodIndex"
            class="text-body-1 font-weight-medium"
            depressed
            rounded
          >
            {{ name }}
          </v-btn>
        </div>
      </div>
      <v-btn class="d-block mt-4 mx-auto" color="secondary" rounded dark depressed large>
        <v-icon class="text-h5 mr-1">mdi-plus</v-icon>
        Add Food
      </v-btn>
    </DialogContent>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
    meals: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    title() {
      return new Date(this.date).toLocaleDateString('default', { month: 'long', day: 'numeric' });
    },
    mealTimes() {
      const mealTimes = {};
      for (const { mealTime, food } of this.meals) {
        if (!mealTime) continue;

        const { id } = mealTime;
        if (!mealTimes[id]) mealTimes[id] = { mealTime, foods: [] };

        mealTimes[id].foods.push(food);
      }

      return Object.values(mealTimes).sort((a, b) => a.mealTime.id < b.mealTime.id);
    },
    shown: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    cancel() {
      this.shown = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.foods {
  gap: 0.4rem;
}
</style>
