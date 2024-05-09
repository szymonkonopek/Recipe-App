<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-5 mt-4">
        <div class="badge bg-success text-wrap fs-5 mb-4 shadow border border-3 border-white">Your Profile</div>

        <!-- Responsible for displaying the data about the user's email, last login, etc. (COMPONENT)-->
        <app-user-data></app-user-data>
      </div>
      <div class="col-lg-7 mt-4">
        <div class="badge bg-success text-wrap fs-5 mb-4 shadow border border-3 border-white">Your recipes</div>

        <!-- Responsible for displaying the user's created recipes-->
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
