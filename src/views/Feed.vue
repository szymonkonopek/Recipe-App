<template>
  <div class="container d-flex flex-column">
    <div
      style="
        width: calc(100% + 24px);
        max-height: 50vw;
        min-height: 25rem;
        background-color: rgba(0, 0, 0, 0.5);
        background-blend-mode: multiply;
        margin-left: -12px;
        background-size: cover;
      "

      :style="{
              backgroundImage:
                'url(' +
                'https://firebasestorage.googleapis.com/v0/b/recipeapp-f5c59.appspot.com/o/feed-cover%2Ffood-cover.jpg?alt=media&token=1bddfaea-b69e-4ea9-8d46-1aa131d7df5f' +
                ')',
            }
      "
      class="object-fit-cover position-relative mb-4 shadow-lg border-bottom border-5 border-primary"
    >
      <div class="container position-absolute top-0 start-0 d-flex justify-content-center align-items-center h-100 w-100">
        <h1 class="text-white text-center fw-bold w-75">Check available recipes</h1>
      </div>
    </div>
    
    <div class="d-flex flex-column align-items-center">
      <!-- Responsible for displaying a list of recipes. (COMPONENT) -->
      <RecipesList :uid="''"></RecipesList>
      <!-- Represents a button for adding a new recipe. (COMPONENT) -->
      <NewRecipeButton></NewRecipeButton>
    </div>
  </div>
</template>

<script>
import RecipesList from '@/components/RecipesList.vue';
import NewRecipeButton from '@/components/NewRecipeButton.vue';

export default {
  name: 'AppFeedView',
  components: { RecipesList, NewRecipeButton },
};
</script>
