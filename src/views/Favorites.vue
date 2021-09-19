<template>
  <b-container>
    <b-row>
      <b-col>
        <notifications class="mr-3 mt-3" group="favorites" />
        <h2 class="text-center">Favorites Users List</h2>
        <b-button
          @click="exportFavoritesList"
          rounded="circle"
          variant="primary"
          class="mx-2"
          >Export List
          <b-icon class="text-white" icon="download"></b-icon>
        </b-button>
        <b-button
          @click="$bvModal.show('modal-save')"
          rounded="circle"
          variant="success "
          :disabled="itemsTable.length === 0"
          class="mx-2"
          >Save List
          <b-icon class="text-white" icon="cloud-upload"></b-icon>
        </b-button>
        <UsersTable :itemsTable="itemsTable" :fields="fields" />
      </b-col>
    </b-row>
    <b-modal
      id="modal-save"
      ref="modal-save"
      title="Save Favorites Users"
      hide-footer
    >
      <b-form-group class="mb-3" label="List name">
        <b-form-input
          v-model="listName"
          placeholder="Enter list name"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          class="mx-1"
          block
          variant="danger"
          @click="$bvModal.hide('modal-save')"
          >Close</b-button
        >
        <b-button
          variant="success"
          class="mx-1"
          block
          :disabled="listName === ''"
          @click="saveFavoritesUsersList()"
          >Save</b-button
        >
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import UsersTable from "@/components/UsersTable.vue";
import { UtilsMixin } from "@/mixins/utils.js";
import UserService from "@/services/userService.js";
export default {
  name: "Favorites",
  mixins: [UtilsMixin],
  components: {
    UsersTable
  },
  data() {
    return {
      listName: "",
      fields: [
        { key: "gender" },
        { key: "name" },
        { key: "email", label: "Email" },
        { key: "age", label: "Age" },
        { key: "nat", label: "Nationality" },
        { key: "birth", label: "Date of birth" },
        { key: "registered", label: "Date of registration" }
      ]
    };
  },
  computed: {
    itemsTable() {
      return this.$store.state.favoritesUsers;
    }
  },
  methods: {
    exportFavoritesList() {
      const users = this.itemsTable.map(user => {
        delete user.username;
        return user;
      });
      this.exportExcel(users, "FavoritesUsers");
    },
    saveFavoritesUsersList() {
      try {
        UserService.post({ name: this.listName, users: this.itemsTable }).then(
          res => {
            if (res.status === 200) {
              this.resetPage();
            } else {
              this.showErrorNotify();
            }
          }
        );
      } catch (error) {
        this.showErrorNotify();
      }
    },
    showSuccessNotify() {
      this.$notify({
        group: "favorites",
        title: "Operation success",
        type: "success",
        text: "The list of favorite users has been saved"
      });
    },
    showErrorNotify() {
      this.$notify({
        group: "favorites",
        title: "Operation error",
        type: "error",
        text: "The favorites list could not be saved at this time"
      });
    },
    resetPage() {
      this.$refs["modal-save"].hide();
      this.showSuccessNotify();
      this.listName = "";
      this.$store.commit("clearFavoritesUsers");
    }
  }
};
</script>
