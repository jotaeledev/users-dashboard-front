<template>
  <div>
    <b-navbar toggleable="lg" variant="light" class="shadow-sm p-3 mb-5">
      <b-navbar-brand >Users Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link class="nav-link" to="/" exact>Users</router-link>
          <router-link class="nav-link" to="/favorites">Favorites</router-link>
        </b-navbar-nav>

      
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
<style scoped>
.navbar-light .navbar-nav .nav-link.active-route {
  color: #0d6efd !important;
}
</style>
