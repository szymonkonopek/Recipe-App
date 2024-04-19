<!-- eslint-disable vuejs-accessibility/heading-has-content -->
<template>
  <button type="button" class="btn btn-link" @click="deleteRecipe">
    <h4><i class="bi bi-x text-danger"></i></h4>
  </button>
</template>

<script>
// eslint-disable-next-line import/extensions
import { db } from '@/main.js';
import { doc, deleteDoc } from 'firebase/firestore';

export default {
  name: 'DeleteButton',
  props: {
    recipeId: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteRecipe() {
      return new Promise((resolve) => {
        deleteDoc(doc(db, 'recipes', this.recipeId)).then(() => {
          this.$router.go();
          resolve();
        });
      });
    },
  },
};
</script>
