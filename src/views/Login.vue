<template>
<div style="min-height:90vh">
  <div style="height: 100px"></div>
  <div class="container-fluid justify-content-center text-center col-sm-12 col-lg-8 px-4 py-2 mx-auto my-4">
    <div class="card justify-content-center text-center w-75 mx-auto auth-form">
      <div class="card-body">
        <div>
          <h1>Login</h1>
          <div v-if="error" class="alert alert-danger small-alert">{{ errorToString(error) }}</div>
          <div class="py-2 my-2">
            <div class="input-group input-group-lg py-2">
              <span class="input-group-text" id="inputGroup-sizing-lg">Email</span>
              <input type="text" class="form-control" placeholser="Email" v-model="email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
            </div>
            <div class="input-group input-group-lg py-2">
              <span class="input-group-text" id="inputGroup-sizing-lg">Password</span>
              <input type="password" class="form-control" placeholser="Password" v-model="password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
            </div>
            <div>
              <button
                class="btn btn-lg btn-outline-dark my-2"
                @click="login"
              >
                Submit
              </button>
            </div>
            <div>
              <button
                class="btn btn-lg btn-outline-dark my-2"
                @click="signInWithGoogle"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
export default {
  name: 'AppLoginView',
  methods: {
    login () {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log(data)
          this.$router.push({ name: 'feed' })
        })
        .catch((error) => {
          this.error = error
          console.log(error.code)
        })
    },

    signInWithGoogle () {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result)
          this.$router.push({ name: 'feed' })
        })
        .catch((error) => {
          alert(error.code)
        })
    },

    errorToString (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return 'Invalid email'
        case 'auth/user-not-found':
          return 'User not found'
        case 'auth/missing-password':
          return 'Missing password'
        case 'auth/invalid-login-credentials':
          return 'Invalid login credentials'
        default:
          return 'Unknown error'
      }
    }
  },
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  }
}
</script>
