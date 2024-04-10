<template>
<<<<<<< HEAD
  <div class="p-5 d-flex flex-column">
    <h2 class="fw-bold font">Notes</h2>
    <div class="d-flex flex-column align-items-center">
      <NotesList :uid="''"></NotesList>
      <NewNoteButton></NewNoteButton>
    </div>
  </div>
=======
  <div>Feed</div>
  <NotesList :uid="''"></NotesList>
  <NewNoteButton></NewNoteButton>
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
</template>

<script>
import NotesList from "@/components/NotesList.vue";
import NewNoteButton from "@/components/NewNoteButton.vue";
export default {
  name: "AppFeedView",
  components: { NotesList, NewNoteButton },
};
</script>
