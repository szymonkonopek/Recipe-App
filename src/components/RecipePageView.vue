<template>
  <div class="p-5 d-flex flex-column">
    {{ recipeId }}
    {{ title }}
    <button class="btn ml-2" @click="share">
      <i class="bi bi-share-fill"></i>
    </button>
    <button @click="share">Share</button>
  </div>
</template>
<script>
import { actionTypes } from '../store/modules/firebasedb';

export default {
  name: 'AppRecipePageView',
  props: {
    recipeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipe: null,
      title: '',
    };
  },
  created() {
    this.$store
      .dispatch(actionTypes.getRecipeById, {
        id: this.recipeId,
      })
      .then((recipe) => {
        this.recipe = recipe;
        console.log(recipe.data.title);
        this.title = recipe.data.title;
      });
  },
  methods: {
    async share() {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Example Title',
            text: 'Check out this example!',
            url: 'https://example.com',
          });
          console.log('Shared successfully');
        } else {
          console.log('Web Share API not supported');
          // Fallback to other sharing methods
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    },
  },
};
</script>
