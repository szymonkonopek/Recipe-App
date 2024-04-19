<template>
  <div class="d-flex flex-column">
    <footer class="text-center text-black mt-auto bg-primary">
      <div class="container p-4 pb-0 d-flex align-items-center justify-content-center">
        <section class="">
          <p
            class="d-flex justify-content-center align-items-center"
            v-if="!isLoggedIn"
          >
            <span class="me-3">Register for free</span>
            <router-link
              :to="{ name: 'register' }"
              class="btn btn-outline-dark me-2"
              >Sign Up!</router-link
            >
          </p>
          <p
            class="d-flex justify-content-center align-items-center"
            v-if="isLoggedIn"
          >
            <span class="me-2">Daily recipes</span>
          </p>
        </section>
      </div>
      <div class="text-center p-3 bg-secondary">
        © 2024 Copyright |
        <a class="text-black" href="https://uek.krakow.pl/"
          >Cracow University Of Economy</a
        >
      </div>
    </footer>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';

export default {
  name: 'AppFooter',
  data() {
    return {
      isLoggedIn: '',
      auth: '',
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
          this.$router.push({ name: 'home' });
        });
    },
  },
};
</script>
