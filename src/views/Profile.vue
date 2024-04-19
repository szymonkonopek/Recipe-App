<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-5 mt-4">
        <div class="badge bg-success text-wrap fs-5 mb-4">Your Profile</div>
        <app-user-data></app-user-data>
      </div>
      <div class="col-lg-7 mt-4">
        <div class="badge bg-success text-wrap fs-5 mb-4">Your recipes</div>
        <app-user-recipes></app-user-recipes>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import AppUserData from '@/components/UserData';
// eslint-disable-next-line import/extensions
import AppUserRecipes from '@/components/UserRecipes';

export default {
  name: 'AppProfileView',
  components: { AppUserRecipes, AppUserData },
};
</script>
