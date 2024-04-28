<!-- eslint-disable vuejs-accessibility/alt-text -->
<template>
  <div style="min-height: 90vh" class="container">
    <div class="text-center justify-content-center p-4">
      <h1 class="text-center fw-bold font">Create an account</h1>
    </div>
    <div class="container-fluid justify-content-center text-center pb-4">
      <div class="card justify-content-center text-center shadow">
        <div class="card-body">
          <div>
            <div class="row">
              <div class="col-lg-6">
                <img src="../assets/login/signup.png" class="img-fluid" />
              </div>
              <div class="col-lg-6">

                <!-- If the error with authentication occurs, then it displays appropriate information. (FUNCTION)-->
                <h2>Register to Recipe App</h2>
                <div v-if="error" class="alert alert-danger small-alert">
                  {{ errorToString(error) }}
                </div>

                <div class="py-2 my-2">
                  <div class="input-group input-group mb-3 py-2">
                    <span class="input-group-text" id="inputGroup-sizing"
                      >Email</span
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholser="Email"
                      v-model="email"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing"
                    />
                  </div>

                  <div class="input-group input-group mb-3 py-2">
                    <span class="input-group-text" id="inputGroup-sizing"
                      >Password</span
                    >
                    <input
                      type="password"
                      class="form-control"
                      placeholser="Password"
                      v-model="password"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing"
                    />
                  </div>
                  <!-- Flexible element which displays an information if the password has an appropriate length. (ELEMENT) -->
                  <div
                    v-if="password.length > 0 && password.length < 8"
                    class="text-danger"
                  >
                    Password is too short (min. 8 characters)
                  </div>

                  <div>
                    <!-- Button responsible for registering in with email. Disabled when password has less than 8 letters. (FUNCTION)-->
                    <button
                      class="btn btn-lg btn-primary text-black my-2 rounded-pill"
                      @click="register"
                      :disabled="password.length < 8"
                    >
                      Submit
                    </button>
                  </div>

                  <div
                    class="text-center justify-content-center p-1 text-muted"
                  >
                    or
                  </div>

                  <div>
                    <!-- Button responsible for signing in with google. (FUNCTION)-->
                    <button
                      class="btn btn-lg btn-outline-primary my-2 rounded-pill"
                      @click="signInWithGoogle"
                    >
                      Sign in with Google
                      <img
                        class="img-fluid justify-content-center"
                        style="max-width: 20px"
                        src="../assets/login/google-icon.png"
                      />
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
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
// eslint-disable-next-line import/no-cycle, import/extensions
import { db } from '@/main.js';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default {
  name: 'AppRegisterView',
  methods: {

/** register():
 * Registers a new user using email and password authentication.
 * Utilizes Firebase's createUserWithEmailAndPassword method for registration.
 * Upon successful registration:
 *   - Saves user data to Firestore database.
 *   - Redirects the user to the feed page.
 * Handles registration errors by setting the 'error' property and logging the error code.
 * If the browser supports vibration, triggers a short vibration upon error.
 */

    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          setDoc(doc(db, 'users', data.user.uid), {
            username: this.email.split('@')[0].split('.')[0],
            uid: data.user.uid,
            created: serverTimestamp(),
          });
          this.$router.push({ name: 'feed' });
        })
        .catch((error) => {
          this.error = error;
          console.log(error.code);
          if ('vibrate' in navigator) {
            navigator.vibrate(100);
          }
        });
    },

/**  signInWithGoogle():
 * Initiates Google sign-in authentication flow.
 * Uses Firebase's GoogleAuthProvider to create a sign-in provider.
 * Displays a pop-up for Google sign-in authentication.
 * Upon successful authentication:
 *   - Logs the user information.
 *   - Saves user data to Firestore database.
 *   - Redirects the user to the feed page.
 * Handles errors by displaying the error code in an alert.
 * If the browser supports vibration, triggers a short vibration upon error.
 */

    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result);
          setDoc(doc(db, 'users', result.user.uid), {
            username: result.user.displayName,
            uid: result.user.uid,
            created: serverTimestamp(),
          });
          this.$router.push({ name: 'feed' });
        })
        .catch((error) => {
          alert(error.code);
          if ('vibrate' in navigator) {
            navigator.vibrate(100);
          }
        });
    },

    /** errorToString(error):
 * Converts Firebase authentication error codes to human-readable error messages.
 * Handles common authentication error cases like invalid email, user not found, missing password,
 * and invalid login credentials, providing corresponding error messages.
 * If the error code is not recognized, returns a generic "Unknown error" message.
 */

    errorToString(error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return 'Invalid email';
        case 'auth/user-not-found':
          return 'User not found';
        case 'auth/missing-password':
          return 'Missing password';
        case 'auth/invalid-login-credentials':
          return 'Invalid login credentials';
        case 'auth/missing-email':
          return 'Missing email';
        default:
          return 'Unknown error';
      }
    },
  },

  /**
 *  data option is used to define the initial state of a component.
 *  It returns an object containing the data properties that will be used within the component.
 */

  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
};
</script>
