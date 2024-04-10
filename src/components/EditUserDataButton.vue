<template>
  <div>
    <form @submit.prevent="changePassword">
      <input type="password" v-model="newPassword" placeholder="New password">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { actionTypes } from '@/store/modules/firebasedb.js';

export default {
  name: "AppEditUserDataButton",
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newPassword: ''
    };
  },
  methods: {
    ...mapActions({
      updatePassword: actionTypes.updatePassword
    }),
    changePassword() {
      this.updatePassword({ newPassword: this.newPassword }).then((message) => {
        console.log(message);
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
</script>
