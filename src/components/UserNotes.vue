<template>
  <NotesList v-if="userDetails" :uid="userDetails.uid"></NotesList>
  <NotesList v-else :uid="''"></NotesList>
  <NewNoteButton></NewNoteButton>
</template>

<script>
import NotesList from "@/components/NotesList";
import NewNoteButton from "@/components/NewNoteButton";
import {mapActions} from "vuex";
import {actionTypes} from "@/store/modules/firebasedb";

export default {
  name: "AppUserNotes",
  components: { NotesList, NewNoteButton },
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
