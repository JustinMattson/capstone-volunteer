<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <!-- <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img alt="Vue logo" src="../assets/logo.png" class="sml-img" />olen-Told
    </router-link>-->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      Please Help
      <img
        class="rotateImg180"
        alt="Vue logo"
        src="../assets/logo.png"
        style="height:30px;object-position: -11px; margin-left:-15px"
      />
      <img
        class="rotateImg180"
        alt="Vue logo"
        src="../assets/logo.png"
        style="height:30px;object-position: 11px;"
      />
      <span style="margin-left:-15px;">e!</span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" :class="{ active: $route.name == 'Jobs' }">
          <router-link :to="{ name: 'Jobs' }" class="nav-link">Jobs</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link" :to="{ name: 'Profile' }">Profile</router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$store.dispatch("getProfile");
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style scoped>
.sml-img {
  height: 3rem;
}
.rotateImg180 {
  transform: rotate(180deg);
}
</style>
