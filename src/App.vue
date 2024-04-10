<template>
  <div>
    <app-top-bar></app-top-bar>
<<<<<<< HEAD
    <router-view class="bg-light"></router-view>
=======
    <router-view></router-view>
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppTopBar from "@/components/TopBar.vue";
import AppFooter from "@/components/Footer";
export default {
  name: "App",
  components: {
    AppTopBar,
<<<<<<< HEAD
    AppFooter,
=======
    AppFooter
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
  },
};
</script>

<style></style>
