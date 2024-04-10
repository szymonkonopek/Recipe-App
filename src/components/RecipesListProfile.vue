<template>
    <div
      v-for="(recipe) in recipes"
      :key="recipe.id"
      class=""
      style="width: 100%; max-width: 50rem"
    >
      <Recipe :recipe="recipe"></Recipe>
    </div>
  </template>

<script>
import { actionTypes } from '@/store/modules/firebasedb'
import { mapState } from 'vuex'
import Recipe from '@/components/Recipe.vue'

export default {
  name: 'AppRecipesListProfileView',
  props: {
    uid: {
      type: String,
      required: false
    },
    onlyMyRecipes: {
      type: Boolean,
      required: false
    }
  },
  components: {
    Recipe
  },
  computed: {
    ...mapState({
      recipes: (state) => state.firebasedb.recipes
    })
  },
  created () {
    this.$store.dispatch(actionTypes.getRecipesByUserId, {
      uid: this.uid
    })
  }

}
</script>
