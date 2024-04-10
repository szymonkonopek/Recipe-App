<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'feed' }">Feed</router-link>
    <router-link :to="{ name: 'login' }">Login</router-link>
    <router-link :to="{ name: 'register' }">Register</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  name: "AppTopBar",
  data() {
    return {
      isLoggedIn: "",
      auth: "",
    };
  },
  mounted() {
    this.auth = getAuth;
    this.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    handleSignOut() {
      this.auth()
        .signOut(this.auth)
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
  },
};
</script>
