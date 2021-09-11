<template>
  <div>
    <div class="food d-flex flex-wrap justify-center pa-12">
      <v-card v-for="({ name }, i) of foods" :key="i">
        <v-card-title>{{ name }}</v-card-title>
      </v-card>
    </div>
    <v-btn
      class="add-food font-weight-bold text-capitalize ma-8"
      color="secondary"
      elevation="8"
      rounded
      dark
      x-large
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
      foods: [
        {
          name: 'Adobo',
        },
        {
          name: 'French Fries',
        },
        {
          name: 'Burger Steak',
        },
      ],
    }
  },
}
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
