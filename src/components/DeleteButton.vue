<template>
<<<<<<< HEAD
  <button type="button" class="btn btn-link" @click="deleteNote">
    <h4><i class="bi bi-x text-danger"></i></h4>
  </button>
</template>

<script>
import { db } from "@/main.js";
import { doc, deleteDoc } from "firebase/firestore";
export default {
  name: "DeleteButton",
  props: {
    noteId: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteNote() {
      return new Promise((resolve) => {
        deleteDoc(doc(db, "notes", this.noteId)).then(() => {
          this.$router.go();
          resolve();
        });
      });
    },
  },
};
=======
    <button
      type="button"
      class="btn btn-danger"
    >
      Delete
    </button>
</template>


<script>
export default {
    name: "DeleteButton",
}
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
</script>
