<template>
  <div class="container justify-content-center mx-2" v-if="userDetails">
    <div class="row justify-content-center">

      <div class="col-md-4 text-center">
        <img src="../assets/profile/profile-photo.png" class="img-fluid justify-content-center" style="max-width: 80px;">
      </div>

      <div class="col-md-8 justify-content-center m-0">

        <div class="badge bg-secondary text-wrap m-0">
          Created
        </div>

        <div class="h6 m-0">{{ userDetails.created }}</div>

        <div class="badge bg-secondary text-wrap mx-0">
          Last login
        </div>

        <div class="h6 m-0">{{ userDetails.lastSignIn }}</div>

        <div class="badge bg-secondary text-wrap mx-0">
          Login provider
        </div>

        <div class="h7 m-0" v-if="userDetails.providers">
          <img v-if="userDetails.providers.includes('google.com')" src="../assets/profile/google-icon.png"
               class="img-fluid justify-content-center" style="max-width: 40px;">
          <img v-else src="../assets/profile/email-icon.png" class="img-fluid justify-content-center"
               style="max-width: 40px;">
        </div>

      </div>

      
    </div>
  </div>
  <app-user-form></app-user-form>
</template>

<script>
import { mapActions } from 'vuex'
import { actionTypes } from '@/store/modules/firebasedb'
import AppUserForm from '@/components/UserForm'

export default {
  name: 'AppUserData',
  components: { AppUserForm },
  data () {
    return {
      userDetails: null
    }
  },
  methods: {
    ...mapActions({
      getUserDetails: actionTypes.getUserDetails
    }),
    fetchUserDetails () {
      this.getUserDetails().then(userDetails => {
        this.userDetails = userDetails
      }).catch(error => {
        console.error(error)
      })
    }
  },
  created () {
    this.fetchUserDetails()
  }
}
</script>

<style>
.h7 {
  font-size: 13px;
}
</style>
