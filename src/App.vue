<template>
  <div id="app">
    <app-top-bar></app-top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppTopBar from "@/components/TopBar.vue";
export default {
  name: "App",
  components: {
    AppTopBar,
  },
};
</script>

<style></style>
