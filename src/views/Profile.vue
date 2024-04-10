<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 mt-4">
        <div class="badge bg-success text-wrap fs-5 mb-4">Your Profile</div>
        <app-user-data></app-user-data>
      </div>
      <div class="col-md-8 mt-4">
        <div class="badge bg-success text-wrap fs-5 mb-4">Your recipes</div>
        <app-user-notes></app-user-notes>
      </div>
    </div>
  </div>
</template>

<script>
import AppUserData from '@/components/UserData'
import AppUserNotes from '@/components/UserNotes'

export default {
  name: 'AppProfileView',
  components: { AppUserNotes, AppUserData }
}
</script>
