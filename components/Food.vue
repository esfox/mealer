<template>
  <div>
    <v-card>
      <div class="d-flex align-center text--primary py-3 pl-4 pr-2">
        <h2>{{ name }}</h2>
        <v-menu v-model="showMenu" rounded="lg" offset-y>
          <template #activator>
            <v-btn class="ml-4" icon @click="showMenu = true">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="edit">
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2">mdi-pencil</v-icon>
                Edit
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="red--text" link @click="del">
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2" color="red">mdi-delete</v-icon>
                Delete
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card>
    <v-dialog v-model="showModal" max-width="250">
      <v-card>
        <template v-if="modalContent === 'edit'">
          <v-card-title> Edit Food </v-card-title>
          <v-card-text class="pb-0">
            <v-text-field
              v-model="editData.name"
              label="Name"
              filled
              autofocus
              @focus="onFocusNameEdit"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn depressed @click="closeModal">Cancel</v-btn>
            <v-btn color="secondary" depressed dark @click="$emit('edit')">
              <v-icon class="mr-1">mdi-pencil</v-icon>
              Edit
            </v-btn>
          </v-card-actions>
        </template>
        <template v-if="modalContent === 'delete'">
          <v-card-title> Confirm Delete </v-card-title>
          <v-card-text> Are you sure you want to delete this food? </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn depressed @click="closeModal">Cancel</v-btn>
            <v-btn color="red" depressed dark @click="$emit('delete')">
              <v-icon class="mr-1">mdi-delete</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
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
      showModal: false,
      modalContent: undefined,
      editData: {
        name: this.name,
      },
    };
  },
  methods: {
    closeModal() {
      this.editData = { name: this.name };
      this.showModal = false;
    },
    edit() {
      this.showModal = true;
      this.modalContent = 'edit';
    },
    del() {
      this.showModal = true;
      this.modalContent = 'delete';
    },
  },
};
</script>
