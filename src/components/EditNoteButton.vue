<template>
  <!-- Button trigger modal -->
  <button
    class="btn btn-secondary"
    data-bs-toggle="modal"
    data-bs-target="#editModal"
    
  >
    Edit note
  </button>

  <!-- Modal -->
  <div
    class="modal fade modal-lg"
    id="editModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div>
              <!-- Display note information here -->
              <div class="mb-3">
              <label for="titleInput" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="titleInput"
                maxlength="60"
                aria-describedby="textHelp"
                disabled
              />
            </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Note content</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  aria-describedby="textAreaHelpblock"
                  maxlength="255"
                  required
                ></textarea>
              </div>
              <small id="textAreaHelpblock" class="form-text text-muted">
              </small>
              <div class="pt-3 pb-3">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox1"
                    value="School"
                    v-model="isSchool"
                  />
                  <label class="form-check-label" for="inlineCheckbox1"
                    >School</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox2"
                    value="Work"
                    v-model="isWork"
                  />
                  <label class="form-check-label" for="inlineCheckbox2"
                    >Work</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox3"
                    value="Personal"
                    v-model="isPersonal"
                  />
                  <label class="form-check-label" for="inlineCheckbox3"
                    >Personal</label
                  >
                </div>
              </div>
            </div>
            <div>
              <button
                class="btn btn-primary p-1 m-1 text-white"
                @click="submit"
                :disabled="isLoading"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main.js";
import {
  //collection,
  //getDocs,
  //getDoc,
  doc,
  //addDoc,
  //where,
  //query,
  //deleteDoc,
  updateDoc,
  //serverTimestamp,
  //orderBy,
} from "firebase/firestore";
export default {
name: "EditNoteButton",
props: {
  // Props to receive note information
  note: {
    type: Object,
    required: true
  }
},
data() {
  return {
  }
},
methods: {
  editNote() {
    // check the id of note
    // save the id of note
    // find the id of the note
    // save the info about note to variable
    // display info
    
  },
  submit() {
    return new Promise((resolve) => {
      console.log(this.noteContent)
      const noteRef = doc(db, "notes", this.note.id); // Załóżmy, że "users" to nazwa kolekcji

      
      updateDoc(noteRef, {
          "data.content": this.noteContent,
          "data.tags": [
            this.isSchool ? "School" : null,
            this.isWork ? "Work" : null,
            this.isPersonal ? "Personal" : null,
          ].filter((tag) => tag !== null),
        });
      resolve()
    })
  }
  },
};
</script>