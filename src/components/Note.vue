<template>
  <div
    class="card border-white mb-3 shadow"
    style="max-width: 50rem; width: 80vw; min-height: 10rem"
  >
    <div class="card-body position-relative">
      <div class="d-flex align-items-end">
        <h5 class="card-title">{{ note.data.data.title }}</h5>
        <EditNoteButton
          v-if="isNoteOwner"
          :noteData="note.data.data"
          :noteId="noteId"
        ></EditNoteButton>
      </div>
      <p class="card-text">{{ note.data.data.content }}</p>
      <!-- <p>{{ note.id }}</p> -->
    </div>
    <div class="d-flex flex-row p-2">
      <small
        v-for="(tag, index) in note.data.data.tags"
        :key="index"
        class="p-1 fw-light text-success"
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
import { getAuth } from "firebase/auth";
import DeleteButton from "./DeleteButton.vue";
import EditNoteButton from "./EditNoteButton.vue";

export default {
  name: "AppNotesView",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      auth: "",
      currentUserId: "",
      noteId: this.note.id,
    };
  },
  components: { DeleteButton, EditNoteButton },
  mounted() {
    this.auth = getAuth;
    this.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUserId = user.uid;
      }
    });
  },

  computed: {
    isNoteOwner() {
      return this.note.data.uid === this.currentUserId;
    },
  },
};
</script>
