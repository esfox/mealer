<template>
  <div class="food d-flex flex-wrap" :class="{ minimal }">
    <template v-if="minimal">
      <v-chip
        v-for="(foodElement, i) of food"
        :key="i"
        :close="canRemove"
        class="font-weight-medium text-body-1"
        @click="canClickFood ? $emit('click:food', foodElement) : null"
        @click:close="canRemove ? $emit('delete', foodElement) : null"
      >
        {{ foodElement.name }}
      </v-chip>
      <slot name="append" />
    </template>
    <template v-else>
      <v-card v-for="(foodElement, i) of food" :key="i">
        <div class="d-flex align-center text--primary px-4 pr-2 py-3">
          <h2>{{ foodElement.name }}</h2>
          <v-btn class="ml-2" icon @click="(event) => showFoodMenu(event, foodElement)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </v-card>
    </template>
    <v-menu v-model="menuShown" :activator="menuActivator" rounded="lg" offset-y>
      <v-list>
        <v-list-item link @click="$emit('edit', foodWithOpenMenu)">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-pencil</v-icon>
            Edit
          </v-list-item-title>
        </v-list-item>
        <v-list-item class="red--text" link @click="$emit('delete', foodWithOpenMenu)">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-2" color="red">mdi-delete</v-icon>
            Delete
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Array,
      default: () => [],
    },
    minimal: {
      type: Boolean,
      default: false,
    },
    canRemove: {
      type: Boolean,
      default: false,
    },
    canClickFood: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuShown: false,
      menuActivator: undefined,
      foodWithOpenMenu: undefined,
    };
  },
  methods: {
    showFoodMenu({ target }, food) {
      if (this.menuShown) return (this.menuShown = false);
      this.foodWithOpenMenu = food;
      this.menuActivator = target;
      requestAnimationFrame(() => requestAnimationFrame(() => (this.menuShown = true)));
    },
  },
};
</script>

<style lang="scss" scoped>
.food {
  gap: 1.5rem;

  &.minimal {
    gap: 0.5rem;
  }
}
</style>
