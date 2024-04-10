<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ note.data.data.title }}</h5>
      <p class="card-text">{{ note.data.data.content }}</p>
      <p>{{ note.id }}</p>
    </div>
    <div v-for="(tag, index) in note.data.data.tags" :key="index">
      <span class="badge rounded-pill bg-primary">tag : {{ tag }}</span>
    </div>
    <div>
      <DeleteButton v-if="isNoteOwner"></DeleteButton>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import DeleteButton from "./DeleteButton.vue";

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
    };
  },
  components: { DeleteButton },
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
