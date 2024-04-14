<template>
  <div class="p-5 d-flex flex-column">
    <div class="d-flex flex-column align-items-center">
      <RecipePageView v-if="recipe" :recipe="recipe"></RecipePageView>
    </div>
  </div>
</template>
<script>
import RecipePageView from '@/components/RecipePageView.vue';
import { actionTypes } from '../store/modules/firebasedb';

export default {
  name: 'AppRecipeView',
  data() {
    return {
      recipeId: null,
      recipe: null,
      title: '',
      user: '',
    };
  },
  created() {
    this.recipeId = this.$route.params.id;
    this.$store
      .dispatch(actionTypes.getRecipeById, {
        id: this.recipeId,
      })
      .then((recipe) => {
        this.recipe = recipe;
        this.title = recipe.data.title;
        this.$store
          .dispatch(actionTypes.getUserById, {
            id: this.recipe.uid,
          })
          .then((user) => {
            console.log('user', user);
            this.user = user.username;
          });
      });
  },
  components: { RecipePageView },
};
</script>
