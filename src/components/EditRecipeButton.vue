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
                  rows="6"
                  aria-describedby="textAreaHelpblock"
                  maxlength="2048"
                  required
                  v-model="recipeContent"
                ></textarea>
              </div>
              <small id="textAreaHelpblock" class="form-text text-muted">
                {{ recipeContent.length }}/2048
              </small>
              <div class="form-group">
                <label for="exampleFormSelect">Recipe color </label>
                <select
                  class="form-select"
                  id="selectColor"
                  disabled
                  v-model="recipeColor"
                >
                  <option value="text-bg-white">White chocolate</option>
                  <option value="text-bg-primary">Orange</option>
                  <option value="text-bg-secondary">Mandarine</option>
                  <option value="text-bg-warning">Prosecco</option>
                </select>
              </div>
              <div class="pt-3 pb-3">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox1"
                    value="Meat"
                    v-model="isMeat"
                  />
                  <label class="form-check-label" for="inlineCheckbox1"
                    >Meat</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox2"
                    value="Vegetarian"
                    v-model="isVegetarian"
                  />
                  <label class="form-check-label" for="inlineCheckbox2"
                    >Vegetarian</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox3"
                    value="Vegan"
                    v-model="isVegan"
                  />
                  <label class="form-check-label" for="inlineCheckbox3"
                    >Vegan</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox4"
                    value="Sweet"
                    v-model="isSweet"
                  />
                  <label class="form-check-label" for="inlineCheckbox4"
                    >Sweet</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox5"
                    value="Sour"
                    v-model="isSour"
                  />
                  <label class="form-check-label" for="inlineCheckbox5"
                    >Sour</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox6"
                    value="Hot"
                    v-model="isHot"
                  />
                  <label class="form-check-label" for="inlineCheckbox6"
                    >Hot</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox7"
                    value="Salty"
                    v-model="isSalty"
                  />
                  <label class="form-check-label" for="inlineCheckbox7"
                    >Salty</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox8"
                    value="Seafood"
                    v-model="isSeafood"
                  />
                  <label class="form-check-label" for="inlineCheckbox8"
                    >Seafood</label
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
      isMeat: this.recipeData.tags.includes('Meat'),
      isVegetarian: this.recipeData.tags.includes('Vegetarian'),
      isVegan: this.recipeData.tags.includes('Vegan'),
      isSweet: this.recipeData.tags.includes('Sweet'),
      isSour: this.recipeData.tags.includes('Sour'),
      isHot: this.recipeData.tags.includes('Hot'),
      isSalty: this.recipeData.tags.includes('Salty'),
      isSeafood: this.recipeData.tags.includes('Seafood'),
      recipeColor: this.recipeData.color
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
          tags: [
            this.isMeat ? 'Meat' : null,
            this.isVegetarian ? 'Vegetarian' : null,
            this.isVegan ? 'Vegan' : null,
            this.isSweet ? 'Sweet' : null,
            this.isSour ? 'Sour' : null,
            this.isHot ? 'Hot' : null,
            this.isSalty ? 'Salty' : null,
            this.isSeafood ? 'Seafood' : null,
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
