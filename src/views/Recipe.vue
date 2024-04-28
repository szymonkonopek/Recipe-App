<template>
  <div class="container d-flex flex-column">
    <div class="d-flex flex-column align-items-center">
      <!-- Display data of the recipe. Transfer recipe information. (COMPONENT) -->
      <RecipePageView
        v-if="recipe"
        :recipe="recipe"
        :user="user"
        :averageRating="averageRating"
      ></RecipePageView>
    </div>
  </div>
</template>
<script>
import RecipePageView from '@/components/RecipePageView.vue';
// eslint-disable-next-line import/no-cycle
import { actionTypes } from '../store/modules/firebasedb';

export default {
  name: 'AppRecipeView',
  data() {
    return {
      recipeId: null,
      recipe: null,
      title: '',
      user: '',
      averageRating: '',
    };
  },

  /**
   * created():
 * When the component is created:
 * 1. Retrieves the recipe ID from the route parameters.
 * 2. Fetches the recipe using the ID from the Vuex store.
 *    - If the recipe is found:
 *      - Sets the component's 'recipe' data property.
 *      - Sets the 'title' data property to the recipe's title.
 *      - Fetches the user who created the recipe from the store.
 *        - Sets the 'user' data property to the username of the user.
 *    - If the recipe is not found, redirects to the 'notfound' route.
 */

     /**
 * Fetches reviews for the current recipe from the Vuex store.
 * Updates the component's 'reviews' data property with the fetched reviews.
 * Calculates the average rating based on the fetched reviews.
 * Updates the component's 'averageRating' data property with the calculated value.
 */

  created() {
    this.recipeId = this.$route.params.id;
    this.$store
      .dispatch(actionTypes.getRecipeById, {
        id: this.recipeId,
      })
      .then((recipe) => {
        if (recipe === null) {
          this.$router.push({ name: 'notfound' });
          return;
        }
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

    this.$store
      .dispatch(actionTypes.getReviewsByRecipeId, {
        recipeId: this.recipeId,
      })
      .then((reviews) => {
        this.reviews = reviews;
        console.log('reviews', reviews);
        this.averageRating = this.calculateAverageRating(reviews);
        console.log('averageRating', this.averageRating);
      });
  },
  methods: {
    /**
     * calculateAverageRating(reviews):
 * Calculates the average rating based on the provided array of reviews.
 * If the array is empty, returns an empty string.
 * Otherwise, calculates the average by summing up all ratings and dividing by the number of reviews.
 * Returns the average rating formatted to one decimal place.
 */

    calculateAverageRating(reviews) {
      if (!reviews.length) {
        return '';
      }
      let total = 0;
      reviews.forEach((review) => {
        total += review.data.review;
      });
      return `${(total / reviews.length).toFixed(1)}`;
    },
  },
  components: { RecipePageView },
};
</script>
