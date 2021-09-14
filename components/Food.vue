<template>
  <div>
    <v-card>
      <div class="d-flex align-center text--primary py-3 pl-4 pr-2">
        <h2>{{ name }}</h2>
        <v-menu v-model="showMenu" rounded="lg" offset-y>
          <template #activator="{ on, attributes }">
            <v-btn class="ml-4" icon v-bind="attributes" v-on="on" @click="showMenu = true">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="$emit('edit')">
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2">mdi-pencil</v-icon>
                Edit
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="red--text" link @click="$emit('delete')">
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2" color="red">mdi-delete</v-icon>
                Delete
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>
