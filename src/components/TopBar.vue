<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand fw-bold" aria-current="page">Recipe App</router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isLoggedIn">
            <router-link :to="{ name: 'feed' }" class="nav-link active" aria-current="page">Feed</router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link :to="{ name: 'feed' }" class="nav-link disabled">Feed</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <form class="container-fluid justify-content-start">
            <router-link :to="{ name: 'login' }" class="btn btn-outline-dark me-2" type="button" v-if="!isLoggedIn">Login</router-link>
            <router-link :to="{ name: 'register' }" class="btn btn-outline-dark me-2" v-if="!isLoggedIn">Register</router-link>
            <router-link :to="{ name: 'profile' }" class="btn btn-outline-dark me-2" type="button" v-if="isLoggedIn">Profile</router-link>
            <button class="btn btn-outline-dark me-2" type="button" @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
          </form>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth } from 'firebase/auth'

export default {
  name: 'AppTopBar',
  data () {
    return {
      isLoggedIn: '',
      auth: ''
    }
  },
  mounted () {
    this.auth = getAuth
    this.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    })
  },
  methods: {
    handleSignOut () {
      this.auth()
        .signOut(this.auth)
        .then(() => {
          this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>
