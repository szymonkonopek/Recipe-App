<template>
  <div class="bg-light app-style">
    <!-- Top bar (COMPONENT) -->
    <app-top-bar></app-top-bar>
    <router-view style="min-height: 100vh"></router-view>

    <!-- Footer bar (COMPONENT) -->
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppTopBar from '@/components/TopBar.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    AppTopBar,
    AppFooter,
  },
};
</script>

<style>
#app {
  font-family: "Helvetica", sans-serif;
  background-color: WhiteSmoke;
}
.app-style {
  background-image: url("./assets/homeBackground/backgroundPale.jpg");
  background-repeat: repeat;
}
</style>
