<template>
  <div class="p-5 d-flex flex-column">
    <h2 class="fw-bold font">Recipes</h2>
    <div class="d-flex flex-column align-items-center">
      <NotesList :uid="''"></NotesList>
      <NewNoteButton></NewNoteButton>
    </div>
  </div>
</template>

<script>
import NotesList from '@/components/NotesList.vue'
import NewNoteButton from '@/components/NewNoteButton.vue'
export default {
  name: 'AppFeedView',
  components: { NotesList, NewNoteButton }
}
</script>
