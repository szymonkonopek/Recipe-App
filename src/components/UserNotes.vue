<template>
  <NotesListProfileView  v-if="userDetails" :uid="userDetails.uid"></NotesListProfileView >
  <NewNoteButton></NewNoteButton>
</template>

<script>
import NotesListProfileView from '@/components/NotesListProfile'
import NewNoteButton from '@/components/NewNoteButton'
import { mapActions } from 'vuex'
import { actionTypes } from '@/store/modules/firebasedb'

export default {
  name: 'AppUserNotes',
  components: { NotesListProfileView, NewNoteButton },
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
  mounted () {
    this.fetchUserDetails()
  },
  created () {
    this.fetchUserDetails()
  }
}
</script>
