<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div v-if="successMessage" class="alert alert-success small-alert">{{ successMessage }}</div>
  <div v-if="errorMessage" class="alert alert-info small-alert">{{ errorMessage }}</div>
  <form class="was-validated" v-if="userDetails" @submit.prevent="changePassword">
    <fieldset :disabled="!editingMode">
      <div class="mb-3">
        <fieldset :disabled="editingMode">
          <label for="disabledTextInput" class="form-label">Email</label>
          <input type="text" id="disabledTextInput" class="form-control" :placeholder="userDetails.email">
        </fieldset>
      </div>
      <div class="mb-3" v-if="userDetails.providers.includes('google.com')">
        <fieldset :disabled="editingMode">
          <label for="inputPassword5" class="form-label">Password</label>
          <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"
                 placeholder="•••••••••••">
        </fieldset>
      </div>
      <div v-else>
        <label for="inputPassword5" class="form-label">Password</label>
        <input type="password" id="inputPassword5" required v-model="newPassword" class="form-control" aria-describedby="passwordHelpBlock"
               placeholder="•••••••••••" minlength="6">
        <div class="invalid-feedback">
          Please enter 6 characters password.
        </div>
      </div>
    </fieldset>
    <button type="button" class="btn btn-primary mb-5 mt-4" @click="setEditingMode" v-if="!editingMode">Edit</button>
    <button type="submit" class="btn btn-secondary mb-5 mt-4" :disabled="!newPassword || newPassword.length < 6" @click="changePassword" v-if="editingMode">Submit</button>
    <button type="button" class="btn btn-info mb-5 mx-2 mt-4" @click="setEditingMode" v-if="editingMode">Cancel</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/firebasedb';

export default {
  name: 'AppUserForm',
  components: {},
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userDetails: null,
      editingMode: false,
      newPassword: '',
      repeatPassword: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions({
      getUserDetails: actionTypes.getUserDetails,
      updatePassword: actionTypes.updatePassword,
    }),
    fetchUserDetails() {
      this.getUserDetails().then((userDetails) => {
        this.userDetails = userDetails;
      }).catch((error) => {
        console.error(error);
      });
    },
    setEditingMode() {
      this.editingMode = !this.editingMode;
    },
    changePassword() {
      this.updatePassword({ newPassword: this.newPassword }).then(() => {
        this.successMessage = 'Password change successfully!';
      }).catch((error) => {
        this.errorMessage = 'An error occurred while changing the password - Sign Out and Sign In and try again.';
        console.log(error);
      });
      this.setEditingMode();
    },
  },
  created() {
    this.fetchUserDetails();
  },
};
</script>

<style>
.small-alert {
  padding: 5px 10px;
  font-size: 0.8rem;
  margin-bottom: 10px;
}
</style>
