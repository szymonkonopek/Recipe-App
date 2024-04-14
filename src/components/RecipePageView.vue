<template>
  <div class="p-5 d-flex flex-column">
    {{ content }}
    <button class="btn ml-2" @click="share">
      <i class="bi bi-share-fill"></i>
    </button>
    <div v-if="recipe.uid == currentUserUid">
      <input type="file" @change="handleImageUpload" />
      <button @click="uploadImage">Upload Image</button>
    </div>
    <div v-if="recipe" class="d-flex flex-column">
      <div v-for="image in recipe.images" :key="image">
        <AppImage
          :image="image"
          :canDelete="recipe.uid == currentUserUid"
          :images="recipe.images"
          :recipeId="recipeId"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { actionTypes } from '../store/modules/firebasedb';
import { getAuth } from 'firebase/auth';
import AppImage from './Image.vue';

export default {
  name: 'AppRecipePageView',
  components: {
    AppImage,
  },
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
      currentUserUid: '',
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
      this.$store
        .dispatch(actionTypes.uploadImage, {
          recipeId: this.recipeId,
          image: this.image,
          images: this.recipe.images,
        })
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          this.$router.go();
        });
    },
  },
  mounted() {
    this.auth = getAuth;
    this.auth().onAuthStateChanged((user) => {
      this.currentUserUid = user.uid;
      console.log('uid', user.uid);
    });
  },
};
</script>
