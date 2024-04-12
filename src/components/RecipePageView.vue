<template>
  <div class="p-5 d-flex flex-column">
    {{ content }}
    <button class="btn ml-2" @click="share">
      <i class="bi bi-share-fill"></i>
    </button>
  </div>
</template>
<script>
// import { actionTypes } from '../store/modules/firebasedb';

export default {
  name: 'AppRecipePageView',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.recipe.data.title,
      content: this.recipe.data.content,
    };
  },
  methods: {
    async share() {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Recipe App',
            text: 'Check out this recipe!',
            url: 'https://recipes-online.netlify.app/' + this.recipeId,
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
