<template>
  <div class="p-5 d-flex flex-column">
    <h2 class="fw-bold font">Recipes</h2>
    <div class="d-flex flex-column align-items-center">
      <RecipesList :uid="''"></RecipesList>
      <NewRecipeButton></NewRecipeButton>
    </div>
  </div>
</template>

<script>
import RecipesList from '@/components/RecipesList.vue'
import NewRecipeButton from '@/components/NewRecipeButton.vue'
export default {
  name: 'AppFeedView',
  components: { RecipesList, NewRecipeButton }
}
</script>
