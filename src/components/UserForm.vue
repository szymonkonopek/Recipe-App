<template>
  <form v-if="userDetails">
    <fieldset disabled>
      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Email</label>
        <input type="text" id="disabledTextInput" class="form-control" :placeholder="userDetails.email">
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
    </fieldset>
  </form>
</template>

<script>
import {mapActions} from "vuex";
import {actionTypes} from "@/store/modules/firebasedb";

export default {
  name: "AppUserForm",
  components: {},
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