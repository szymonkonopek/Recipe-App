<template>
  <div v-bind:class="{'card': true, 'border-white': true, 'mb-3': true, 'shadow': true, [recipeColor]: true }" style="min-height: 10rem">
    <div class="card-body position-relative">
      <div
        class="modal fade"
        :id="'id' + recipeId"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <RecipeModal :recipeData="recipe.data.data" :recipeId="recipeId" />
      </div>

      <div class="d-flex align-items-end">
        <h5
          class="card-title"
          style="cursor: pointer"
          data-bs-toggle="modal"
          :data-bs-target="'#id' + recipeId"
        >
          {{ recipe.data.data.title }}
        </h5>
        <EditRecipeButton
          v-if="isRecipeOwner"
          :recipeData="recipe.data.data"
          :recipeId="recipeId"
        ></EditRecipeButton>
      </div>
      <p class="card-text">{{ recipe.data.data.content }}</p>
    </div>
    <div class="d-flex flex-row p-2">
      <small
        v-for="(tag, index) in recipe.data.data.tags"
        :key="index"
        class="p-1 fw-bold text-white me-2 mt-2 badge bg-success border"
      >
        {{ tag }}
      </small>
    </div>
    <div class="position-absolute end-0">
      <DeleteButton v-if="isRecipeOwner" :recipeId="recipeId"></DeleteButton>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import DeleteButton from './DeleteButton.vue'
import EditRecipeButton from './EditRecipeButton.vue'
import RecipeModal from './RecipeModal.vue'

export default {
  name: 'AppRecipesView',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      auth: '',
      currentUserId: '',
      recipeId: this.recipe.id,
      recipeColor: this.recipe.data.data.color
    }
  },
  components: { DeleteButton, EditRecipeButton, RecipeModal },
  mounted () {
    this.auth = getAuth
    this.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUserId = user.uid
      }
    })
  },

  computed: {
    isRecipeOwner () {
      return this.recipe.data.uid === this.currentUserId
    }
  }
}
</script>
