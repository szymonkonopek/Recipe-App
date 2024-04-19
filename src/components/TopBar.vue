<!-- eslint-disable max-len -->
<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">

      <div class="">
        <form class="d-flex">
          <form class="container-fluid justify-content-start">
            <router-link :to="{ name: 'home' }" class="navbar-brand fw-bold" aria-current="page">Recipe App</router-link>
          </form>
        </form>
      </div>

      <div class="">
        <form class="d-flex">
          <form class="container-fluid justify-content-start">
            <router-link :to="{ name: 'feed' }" v-if="isLoggedIn" class="btn btn-outline-dark me-2" aria-current="page"><i class="bi bi-journals"></i></router-link>
            <router-link :to="{ name: 'login' }" class="btn btn-outline-dark me-2" type="button" v-if="!isLoggedIn"><i class="bi bi-box-arrow-in-left"></i></router-link>
            <router-link :to="{ name: 'register' }" class="btn btn-outline-dark me-2" v-if="!isLoggedIn"><i class="bi bi-person-plus-fill"></i></router-link>
            <router-link :to="{ name: 'profile' }" class="btn btn-outline-dark me-2" type="button" v-if="isLoggedIn"><i class="bi bi-person-fill"></i></router-link>
            <button class="btn btn-outline-dark me-2" type="button" @click="handleSignOut" v-if="isLoggedIn"><i class="bi bi-box-arrow-right"></i></button>
          </form>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth } from 'firebase/auth';

export default {
  name: 'AppTopBar',
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
