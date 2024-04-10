<template>
  <div v-bind:class="{'card': true, 'border-white': true, 'mb-3': true, 'shadow': true, [noteColor]: true }" style="min-height: 10rem">
    <div class="card-body position-relative">
      <div
        class="modal fade"
        :id="'id' + noteId"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <NoteModal :noteData="note.data.data" :noteId="noteId" />
      </div>

      <div class="d-flex align-items-end">
        <h5
          class="card-title"
          style="cursor: pointer"
          data-bs-toggle="modal"
          :data-bs-target="'#id' + noteId"
        >
          {{ note.data.data.title }}
        </h5>
        <EditNoteButton
          v-if="isNoteOwner"
          :noteData="note.data.data"
          :noteId="noteId"
        ></EditNoteButton>
      </div>
      <p class="card-text">{{ note.data.data.content }}</p>
    </div>
    <div class="d-flex flex-row p-2">
      <small
        v-for="(tag, index) in note.data.data.tags"
        :key="index"
        class="p-1 fw-bold text-white me-2 mt-2 badge bg-success border"
      >
        {{ tag }}
      </small>
    </div>
    <div class="position-absolute end-0">
      <DeleteButton v-if="isNoteOwner" :noteId="noteId"></DeleteButton>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import DeleteButton from './DeleteButton.vue'
import EditNoteButton from './EditNoteButton.vue'
import NoteModal from './NoteModal.vue'

export default {
  name: 'AppNotesView',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      auth: '',
      currentUserId: '',
      noteId: this.note.id,
      noteColor: this.note.data.data.color
    }
  },
  components: { DeleteButton, EditNoteButton, NoteModal },
  mounted () {
    this.auth = getAuth
    this.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUserId = user.uid
      }
    })
  },

  computed: {
    isNoteOwner () {
      return this.note.data.uid === this.currentUserId
    }
  }
}
</script>
