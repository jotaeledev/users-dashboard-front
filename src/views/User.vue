<template>
  <div>
    <h2 class="text-center mb-4">User data</h2>
    <b-card class="custom-card shadow-sm" v-if="user">
      <b-container>
        <b-row>
          <b-col md="4" sm="12" class="mb-4 d-flex justify-content-center">
            <b-img rounded="circle" :src="user.picture.large" alt="" />
          </b-col>
          <b-col md="5" sm="12" class="mb-4">
            <Map :coordinates="user.location.coordinates" />
          </b-col>
          <b-col
            md="3"
            sm="12"
            class="d-flex justify-content-end align-items-start mb-4"
          >
            <b-button
              @click="favoriteUser"
              rounded="circle"
              :variant="isFavorite ? 'primary' : 'secondary'"
              class="w-100"
              >Favorite
              <b-icon class="text-white" icon="star-fill"></b-icon>
            </b-button>
          </b-col>
        </b-row>
        <b-row class="my-5">
          <b-col>
            <h3>Personal data</h3>
            <div class="d-inline-block mx-2">
              <span class="font-weight-bold">Name: </span>
              <span>{{ user.name }}</span>
            </div>
            <div class="d-inline-block mx-2">
              <span class="font-weight-bold">Email: </span>
              <span>{{ user.email }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="my-5">
          <b-col>
            <h3>Location data</h3>
            <div class="d-inline-block mx-2">
              <span class="font-weight-bold">City: </span>
              <span>{{ user.location.city }}</span>
            </div>
            <div class="d-inline-block mx-2">
              <span class="font-weight-bold"> Street: </span>
              <span>{{ user.location.street.name }}</span>
            </div>
            <div class="d-inline-block mx-2">
              <span class="font-weight-bold">Phone: </span>
              <span>{{ user.phone }}</span>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
export default {
  name: "User",
  components: {
    Map
  },
  data() {
    return {
      user: this.$store.state.selectedUser
    };
  },
  computed: {
    isFavorite() {
      return this.$store.state.favoritesUsers.some(
        e => e.username === this.user.login.username
      );
    }
  },
  methods: {
    favoriteUser() {
      this.$store.commit("addFavoritesUsers", this.getFormatedUser());
    },
    getFormatedUser() {
      return {
        username: this.user.login.username,
        gender: this.user.gender,
        name: this.user.name,
        email: this.user.email,
        age: this.user.age,
        nat: this.user.gender,
        dob: this.user.dob,
        registered: this.user.registered
      };
    },
    backToHome() {
      if (!this.user.login) this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    this.backToHome();
  }
};
</script>
<style lang="scss" scoped>
.custom-card {
  max-width: 800px;
  margin: 0 auto;
}
.font-weight-bold {
  font-weight: bold;
}
</style>