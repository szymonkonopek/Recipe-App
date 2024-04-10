<template>
  <div>
    <app-top-bar></app-top-bar>
    <router-view class="bg-light"></router-view>
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
    AppFooter,
  },
};
</script>

<style></style>
