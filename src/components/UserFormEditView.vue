<template>
  <form v-if="userDetails">
      <div class="mb-3">
        <fieldset disabled>
          <label for="disabledTextInput" class="form-label">Email</label>
          <input type="text" id="disabledTextInput" class="form-control" placeholder="someone@example.com" :value="userDetails.email">
        </fieldset>
      </div>
      <div class="mb-3">
        <label for="inputPassword5" class="form-label">Password</label>
        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"
               placeholder="•••••••••••">
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled>
          <label class="form-check-label" for="disabledFieldsetCheck">
            Tu pewnie coś będzie albo i nie
          </label>
        </div>
      </div>
    <app-edit-user-data-button></app-edit-user-data-button>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import {mapActions} from "vuex";
import AppEditUserDataButton from "@/components/EditUserDataButton";
import {actionTypes} from "@/store/modules/firebasedb";

export default {
  name: "AppUserFormEditView",
  components: {AppEditUserDataButton},
  data() {
    return {
      userDetails: null
    };
  },
  methods: {
    ...mapActions({
      getUserDetails: actionTypes.getUserDetails
    }),
    fetchUserDetails() {
      this.getUserDetails().then(userDetails => {
        this.userDetails = userDetails;
      }).catch(error => {
        console.error(error);
      });
    }
  },
  created() {
    this.fetchUserDetails();
  }
};
</script>