<template>
<div style="min-height: 90vh">
  <div class='text-center justify-content-center p-4'><h1 class="text-center">Welcome back!</h1></div>
  <div class="container-fluid justify-content-center text-center pb-4 px-4">
    <div class="card justify-content-center text-center shadow">
      <div class="card-body">
        <div>
          <div class="row">
            <div class="col-lg-6"><img src="../assets/login/login.png" class="img-fluid"></div>
            <div class="col-lg-6">
              <h2>Sign in to Recipe App</h2>
              <div v-if="error" class="alert alert-danger small-alert">{{ errorToString(error) }}</div>
              <div class="py-2 my-2">
                <div class="input-group input-group mb-3 py-2">
                  <span class="input-group-text" id="inputGroup-sizing">Email</span>
                  <input type="text" class="form-control" placeholser="Email" v-model="email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing">
                </div>
                <div class="input-group input-group mb-3 py-2">
                  <span class="input-group-text" id="inputGroup-sizing">Password</span>
                  <input type="password" class="form-control" placeholser="Password" v-model="password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing">
                </div>
                <div>
                  <button
                    class="btn btn-primary btn-lg text-black my-2 rounded-pill"
                    @click="login"
                  >
                    Submit
                  </button>
                </div>
                <div class='text-center justify-content-center p-1 text-muted'>or</div>
                <div>
                  <button
                    class="btn btn-lg btn-outline-primary my-2 rounded-pill"
                    @click="signInWithGoogle"
                  >
                    Sign in with Google   <img class="img-fluid justify-content-center" style="max-width: 20px;" src="../assets/login/google-icon.png">
                  </button>
                </div>
              </div>
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
          if ("vibrate" in navigator) {
            navigator.vibrate(100);
          } else {
            console.log("Vibration not supported");
          }
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
          if ("vibrate" in navigator) {
            navigator.vibrate(100);
          } else {
            console.log("Vibration not supported");
          }
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
