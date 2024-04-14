<template>
  <div>
    <div v-if="recipes && recipes.length == 0">
      <div class="alert alert-success text-black" role="alert">
        <h4 class="alert-heading">There is no receipes to display!</h4>
        <p>
          Add your favorite recipes just by clicking
          <i class="bi bi-plus-circle display-10"></i> icon, down below.
        </p>
      </div>
    </div>

    <div
      v-else
      v-for="recipe in recipes"
      :key="recipe.id"
      class=""
      style="width: 100%; max-width: 50rem"
    >
      <Recipe :recipe="recipe"></Recipe>
    </div>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/firebasedb';
import { mapState } from 'vuex';
import Recipe from '@/components/Recipe.vue';

export default {
  name: 'AppRecipesListProfileView',
  props: {
    uid: {
      type: String,
      required: false,
    },
    onlyMyRecipes: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    Recipe,
  },
  computed: {
    ...mapState({
      recipes: (state) => state.firebasedb.recipes,
    }),
  },
  created() {
    this.$store.dispatch(actionTypes.getRecipesByUserId, {
      uid: this.uid,
    });
  },
};
</script>
