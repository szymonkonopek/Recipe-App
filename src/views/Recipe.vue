<template>
  <div class="p-5 d-flex flex-column">
    <div class="d-flex flex-column align-items-center">
      <RecipePageView :recipeId="recipeId"></RecipePageView>
    </div>
  </div>
</template>
<script>

import RecipePageView from '@/components/RecipePageView.vue'
export default {
  name: 'AppRecipeView',
  data() {
    return {
      recipeId: null
    };
  },
  created() {
    // Access the recipe ID from the route parameters
    this.recipeId = this.$route.params.id;
  },
  components: { RecipePageView}

}
</script>