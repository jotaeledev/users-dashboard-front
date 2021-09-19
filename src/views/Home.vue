<template>
  <b-container>
    <h2 class="text-center mb-5">Users List</h2>
    <b-form>
      <b-row>
        <b-col sm="3" xs="12">
          <b-form-group label="Gender">
            <b-form-select
              size="sm"
              class="form-select"
              v-model="filters[0].value"
              :options="optionsGender"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="3" xs="12">
          <b-form-group label="Country">
            <b-form-select
              class="form-select"
              v-model="filters[1].value"
              :options="optionsCountry"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="3" xs="12" class="d-flex align-items-end mt-4 mt-sm-0">
          <b-button variant="primary" @click="getUsersData">Search </b-button>
        </b-col>
      </b-row>
    </b-form>
    <UsersTable
      :itemsTable="itemsTable"
      :fields="fields"
      :allowView="true"
      :loading="loading"
      @showItem="showItem"
    />
  </b-container>
</template>

<script>
import axios from "axios";
import UsersTable from "@/components/UsersTable.vue";

export default {
  name: "Home",
  components: {
    UsersTable
  },
  data() {
    return {
      filters: [
        { key: "gender", value: null },
        { key: "nat", value: null }
      ],
      optionsGender: [
        { value: null, text: "Please select an option" },
        { value: "male", text: "Male" },
        { value: "female", text: "Female" }
      ],
      optionsCountry: [
        { value: null, text: "Please select an option" },
        { value: "ES", text: "Spain" },
        { value: "AU", text: "Australia" },
        { value: "GB", text: "Great Britain" },
        { value: "FI", text: "Finlandia" },
        { value: "NO", text: "Norway" },
        { value: "FR", text: "France" }
      ],
      fields: [
        { key: "gender" },
        { key: "name" },
        { key: "age", label: "Age" },
        { key: "nat", label: "country" },
        { key: "birth", label: "Date of birth" },
        { key: "registered", label: "Date of registration" },
        { key: "actions" }
      ],
      loading: false
    };
  },

  created() {
    if (this.$store.state.usersList.length === 0) this.getUsersData();
  },
  computed: {
    itemsTable() {
      return this.$store.state.usersList;
    }
  },
  methods: {
    getUsersData() {
      this.loading = true;
      this.$store.commit("setUsersList", []);
      axios
        .get(
          "https://randomuser.me/api/?results=100&" + this.getAppliedFilters()
        )
        .then(res => {
          this.$store.commit(
            "setUsersList",
            this.getFormatedUsersList(res.data.results)
          );
          this.loading = false;
        });
    },
    getFormatedUsersList(users) {
      return users.map(user => {
        user.name =
          user.name.title + " " + user.name.first + " " + user.name.last;
        user.age = user.dob.age;
        user.dob = user.dob.date;
        user.registered = user.registered.date;
        return user;
      });
    },
    getAppliedFilters() {
      let filters = "";
      this.filters.forEach(element => {
        filters =
          element.value !== null
            ? `${filters}${element.key}=${element.value}&`
            : filters;
      });
      return filters;
    },
    showItem(user) {
      this.$store.commit("setSelectedUser", user);
      this.$router.push({ name: "User" });
    }
  }
};
</script>
