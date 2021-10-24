<template>
  <div class="week-picker d-flex justify-center align-center">
    <v-autocomplete
      ref="input"
      v-model="currentWeek"
      :items="weeks"
      label="Date Range"
      outlined
      dense
      hide-details
      @change="onWeekChange"
    />
  </div>
</template>

<script>
import { subWeeks, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { getWeekDates } from '~/assets/helpers';

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const currentDate = new Date();
    const fromDate = subWeeks(currentDate, 4);
    const weeks = [];
    let currentWeek;
    for (let i = 0; i < 8; i++) {
      const week = addWeeks(fromDate, i);
      const start = startOfWeek(week, { weekStartsOn: 1 });
      const end = endOfWeek(week, { weekStartsOn: 1 });

      const startString = start.toLocaleDateString('default', {
        month: 'long',
        day: 'numeric',
      });

      const endString = end.toLocaleDateString('default', {
        month: 'long',
        day: 'numeric',
      });

      const weekData = { text: `${startString} - ${endString}`, value: start };
      const currentTime = currentDate.getTime();
      if (start.getTime() <= currentTime && end.getTime() >= currentTime) currentWeek = weekData;

      weeks.push(weekData);
    }

    return {
      weekDates: this.value,
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      weeks,
      currentWeek,
    };
  },
  computed: {
    displayDate() {
      const [year, month] = new Date().toISOString().substr(0, 7).split('-');
      return `${this.months[month - 1]}, ${year}`;
    },
  },
  methods: {
    onWeekChange(startDate) {
      this.$refs.input.blur();
      this.$emit('input', getWeekDates(startDate).shift());
    },
  },
};
</script>

<style lang="scss">
.week-picker {
  .month-year {
    max-width: 15rem !important;

    .v-input__slot,
    input {
      cursor: pointer !important;
    }
  }
}
</style>
