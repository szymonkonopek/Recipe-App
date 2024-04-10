<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
    <button @click="login">Submit</button>
    <button @click="signInWithGoogle">Login With Google</button>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "AppLoginView",
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log(data);
          this.$router.push({ name: "feed" });
        })
        .catch((error) => {
          console.log(error.code);
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
