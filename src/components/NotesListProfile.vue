<template>
    <div
      v-for="(note) in notes"
      :key="note.id"
      class=""
      style="width: 100%; max-width: 50rem"
    >
      <Note :note="note"></Note>
    </div>
  </template>

<script>
import { actionTypes } from '@/store/modules/firebasedb'
import { mapState } from 'vuex'
import Note from '@/components/Note.vue'

export default {
  name: 'AppNotesListProfileView',
  props: {
    uid: {
      type: String,
      required: false
    },
    onlyMyNotes: {
      type: Boolean,
      required: false
    }
  },
  components: {
    Note
  },
  computed: {
    ...mapState({
      notes: (state) => state.firebasedb.notes
    })
  },
  created () {
    this.$store.dispatch(actionTypes.getNotesByUserId, {
      uid: this.uid
    })
  }

}
</script>
