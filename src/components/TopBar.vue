<!-- eslint-disable max-len -->
<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">

      <div class="">
        <form class="d-flex">
          <form class="container-fluid justify-content-start">
            <router-link :to="isLoggedIn ? { name: 'feed' } : { name: 'home'}" class="navbar-brand fw-light" aria-current="page">Recipe App</router-link>
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
            <button class="btn btn-outline-dark" type="button" @click="handleSignOut" v-if="isLoggedIn"><i class="bi bi-box-arrow-right"></i></button>

          </form>
        </form>
      </div>
    </div>
  </nav>

   <!-- Toast -->
   <div id="signOutToast" class="toast align-items-center text-black bg-info border-0 border-black position-fixed top-0 start-50 translate-middle-x m-3" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        You have been signed out.
      </div>
      <button type="button" class="btn-close btn-close-black me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
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
          // Show toast after signing out
          const toast = new bootstrap.Toast(document.getElementById('signOutToast'));
          toast.show();
        });
    },
  },
};
</script>
