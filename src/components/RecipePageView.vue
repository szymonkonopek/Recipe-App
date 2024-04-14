<template>
  <div class="d-flex flex-column">
    <div
      v-if="recipe.images.length > 0"
      style="
        width: 100vw;
        max-height: 50vw;
        min-height: 25rem;
        background-color: rgba(0, 0, 0, 0.5);
        background-blend-mode: multiply;
      "
      :style="{ backgroundImage: 'url(' + recipe.images[0].url + ')' }"
      class="object-fit-cover position-relative mb-5"
    >
      <div class="position-absolute top-0 start-0 pt-5 ps-4">
        <h1 class="text-white fw-bold w-75">{{ title }}</h1>
        <div class="text-white">4.5 <i class="bi bi-star-fill"></i></div>
      </div>
      <div
        class="position-absolute bottom-0 start-0 d-flex flex-row align-items-center pb-5 ps-4"
      >
        <img
          src="../assets/profile/profile-photo.png"
          class="img-fluid justify-content-center pe-2"
          style="max-width: 50px"
        />
        <div class="text-white fw-bold w-75">{{ user }}</div>
      </div>
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
    user: {
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
