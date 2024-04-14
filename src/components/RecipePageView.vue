<template>
  <div class="p-5 d-flex flex-column">
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div v-for="image in recipe.images" :key="image">
          <div class="carousel-item active">
            <img class="d-block w-100" src="image.url" alt="First slide" />
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
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
