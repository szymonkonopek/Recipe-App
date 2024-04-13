<template>
  <div class="p-5 d-flex flex-column">
    {{ content }}
    <button class="btn ml-2" @click="share">
      <i class="bi bi-share-fill"></i>
    </button>
    <div>
      <input type="file" @change="handleImageUpload" />
      <button @click="uploadImage">Upload Image</button>
    </div>
    <div v-if="recipe" class="d-flex flex-column">
      <div v-for="image in recipe.images" :key="image">
        <img :src="image" class="h-50 w-50 mt-1" />
      </div>
    </div>
  </div>
</template>
<script>
import { actionTypes } from '../store/modules/firebasedb';

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
  computed: {
    recipeId() {
      return this.recipe.id;
    },
  },
  methods: {
    async share() {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Recipe App',
            text: 'Check out this recipe!',
            url: 'https://recipes-online.netlify.app/' + this.recipeId(),
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
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    uploadImage() {
      console.log('Uploading image');
      console.log(this.recipe);
      this.$store.dispatch(actionTypes.uploadImage, {
        recipeId: this.recipeId,
        image: this.image,
        images: this.recipe.images,
      });
    },
  },
};
</script>
