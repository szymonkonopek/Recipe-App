<template>
  <div class="p-5 d-flex flex-column">
    {{ recipeId }}
    {{ title }}
    <button class="btn ml-2" @click="share">
        <i class="bi bi-share-fill"></i>
    </button>
    </div>
</template>
<script>

import { actionTypes } from '../store/modules/firebasedb'

export default {
  name: 'AppRecipePageView',
  props: {
    recipeId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      recipe: null,
      title: ""
    }
  },
  created () {
    this.$store.dispatch(actionTypes.getRecipeById, {
      id: this.recipeId
    }).then((recipe) => {
      this.recipe = recipe
      console.log(recipe.data.title)
      this.title = recipe.data.title
    })
  }
}
</script>