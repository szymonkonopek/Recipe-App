<template>
  <div class="container d-flex flex-column">
    <div class="d-flex flex-column align-items-center">
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
