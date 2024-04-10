<template>
  <div>
    <h1>Register</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Login With Google</button>
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
