<template>
  <!-- Button trigger modal -->
  <button
    class="btn btn-link text-info"
    data-bs-toggle="modal"
    :data-bs-target="'#id_edit' + recipeId"
  >
    <i class="bi bi-pencil"></i>
  </button>

  <!-- Modal -->
  <div
    class="modal fade modal-lg"
    :id="'id_edit' + recipeId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-bind:class="{ 'modal-content': true, [recipeColor]: true }">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit recipe</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent>
            <div>
              <div class="mb-3">
                <label for="titleInput" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="titleInput"
                  maxlength="60"
                  aria-describedby="textHelp"
                  v-model="recipeTitle"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Recipe content</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  aria-describedby="textAreaHelpblock"
                  maxlength="255"
                  required
                  v-model="recipeContent"
                ></textarea>
              </div>
              <small id="textAreaHelpblock" class="form-text text-muted">
                {{ recipeContent.length }}/255
              </small>
              <div>Recipe visible for others?</div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="true"
                  v-model="recipeVisibleForOthers"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="false"
                  v-model="recipeVisibleForOthers"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  No
                </label>
              </div>
              <div class="form-group">
                <label for="exampleFormSelect">Recipe color </label>
                <select
                  class="form-select"
                  id="selectColor"
                  disabled
                  v-model="recipeColor"
                >
                  <option value="text-bg-white">White</option>
                  <option value="text-bg-primary">Light Brown</option>
                  <option value="text-bg-secondary">Dark Brown</option>
                  <option value="text-bg-warning">Light Sea</option>
                </select>
              </div>
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
                class="btn btn-success p-1 m-1 text-white"
                @click="submit"
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
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/main.js';

export default {
  name: 'EditRecipeButton',
  props: {
    recipeData: {
      type: Object,
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipeTitle: this.recipeData.title,
      recipeContent: this.recipeData.content,
      isSchool: this.recipeData.tags.includes('School'),
      isWork: this.recipeData.tags.includes('Work'),
      isPersonal: this.recipeData.tags.includes('Personal'),
      recipeColor: this.recipeData.color,
      recipeVisibleForOthers: this.recipeData.visibleForOthers,
    };
  },
  methods: {
    async submit() {
      const docRef = doc(db, 'recipes', this.recipeId);
      const docSnapshot = await getDoc(docRef);
      const currentData = docSnapshot.data();

      // Merge existing data with updated data
      const updatedData = {
        ...currentData,
        data: {
          title: this.recipeTitle,
          content: this.recipeContent,
          color: this.recipeColor,
          visibleForOthers: this.recipeVisibleForOthers === 'true',
          tags: [
            this.isSchool ? 'School' : null,
            this.isWork ? 'Work' : null,
            this.isPersonal ? 'Personal' : null,
          ].filter((tag) => tag !== null),
        },
      };
      updateDoc(docRef, updatedData);

      await new Promise((resolve) => setTimeout(resolve, 500));
      this.$router.go();
    },
  },
};
</script>
