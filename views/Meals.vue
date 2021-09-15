<template>
  <div class="pa-12">
    <div class="text--secondary mb-2">Click on a date to add a meal</div>
    <v-calendar class="calendar" :events="events" @click:day="onClickDay">
      <template #day-label="{ day }">
        <div class="d-flex py-2">
          <h3 class="flex-grow-1">{{ day }}</h3>
        </div>
      </template>
      <template #event="{ event }">
        <h1>{{ event.name }}</h1>
      </template>
    </v-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        {
          name: 'test',
          start: new Date(),
          end: new Date(),
          color: 'secondary',
          timed: false,
        },
        {
          name: 'test',
          start: new Date(),
          end: new Date(),
          color: 'secondary',
          timed: false,
        },
      ],
    };
  },
  methods: {
    onClickDay() {
      console.log('clicked day');
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
    margin: auto !important;
    margin-block-start: 0.25rem !important;
  }
}
</style>
