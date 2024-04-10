<template>
<<<<<<< HEAD
<div style="min-height:90vh">
  <div style="height: 100px"></div>
=======
<div style="height: 50%">
  <div style="height: 5vw"></div>
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
  <div class="container-fluid justify-content-center text-center px-4 py-2 mx-auto my-4">
    <div class="card justify-content-center text-center mx-auto" style="width: 30rem; background: rgba(233, 226, 222, 0.85);border-radius: 16px;box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);backdrop-filter: blur(8px);-webkit-backdrop-filter: blur(8px);">
      <div class="card-body">
        <div>
          <h1>Register</h1>
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
                @click="register"
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
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export default {
  name: "AppRegisterView",
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password).then(
        (data) => {
          console.log(data);
          this.$router.push({ name: "feed" });
        }
      );
    },
    signInWithGoogle() {
      console.log("hello");
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result);
          this.$router.push({ name: "feed" });
        })
        .catch((error) => {
          alert(error.code);
        });
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
