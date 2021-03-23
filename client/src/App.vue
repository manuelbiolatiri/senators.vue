<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Manuel's Vue</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">All Senator</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-senator" class="nav-link"
            >Add a Senator</router-link
          >
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
    <div class="col-3 m-auto">
      <Router />
    </div>
  </div>
</template>

<script>
import Router from "./router";
export default {
  name: "app",
  components: {
    Router,
  },
};
</script>