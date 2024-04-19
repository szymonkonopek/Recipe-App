<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div class="d-flex flex-column w-100">
    <div
      v-if="recipe"
      style="
        width: calc(100% + 24px);
        max-height: 50vw;
        min-height: 25rem;
        background-color: rgba(0, 0, 0, 0.5);
        background-blend-mode: multiply;
        margin-left: -12px;
        background-size: cover;

      "

      :style="
        recipe.images.length > 0
          ? { backgroundImage: 'url(' + recipe.images[0].url + ')' }
          : {
              backgroundImage:
                'url(' +
                'https://firebasestorage.googleapis.com/v0/b/recipeapp-f5c59.appspot.com/o/recipe-cover%2Frecipe-cover.png?alt=media&token=23e17530-5f7f-4e42-96f0-46429473909c' +
                ')',
            }
      "
      class="object-fit-cover position-relative mb-4 shadow-lg border-bottom border-5 border-primary"
    >
      <div class="position-absolute top-0 start-0 pt-4 ps-4">
        <h1 class="text-white fw-bold w-75">{{ title }}</h1>
        <div v-if="averageRating !== ''" class="text-white">
          {{ averageRating }} <i class="bi bi-star-fill"></i>
        </div>
      </div>
      <div
        class="position-absolute bottom-0 start-0 d-flex flex-row align-items-center pb-4 ps-4"
      >
        <img
          src="../assets/profile/profile-photo.png"
          class="img-fluid justify-content-center pe-2"
          style="max-width: 50px"
        />
        <div class="text-white fw-bold w-75">{{ user }}</div>
      </div>
      <button
        class="btn ml-2 position-absolute bottom-0 end-0 bg-primary mb-4 me-4"
        @click="share"
      >
        <i class="bi bi-share-fill"></i>
      </button>
    </div>

    <div class="container mb-5 d-flex flex-column">
      <h1 class="fw-bold">Recipe:</h1>
      <div style="white-space: pre-line; min-height: 25vh;" class="bg-light p-3 rounded shadow-lg">
        {{ content.replace(/(?<!\d)\./g, ".\n") }}
      </div>
      <ReviewStars :recipe-id="recipeId"></ReviewStars>
      </div>
      <div style="width: calc(100% + 24px); margin-left:-12px">
      <div
        class="bg-primary wave"
        style="height: 6rem; width: 100%"
      ></div>
      <div
        class="d-flex flex-col align-items-center flex-column gap-2 bg-primary pb-5"
      >
        <div v-for="image in recipe.images" :key="image">
          <AppImage
            :image="image"
            :canDelete="recipe.uid == currentUserUid"
            :images="recipe.images"
            :recipeId="recipeId"
          />
        </div>
      </div>
      <div class="px-3 pb-3 bg-primary" v-if="recipe.uid == currentUserUid">
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="handleImageUpload"
        />
        <button
          button
          class="btn btn-secondary mt-3 w-100"
          @click="uploadImage"
          :disabled="!imageSet || imageUploading"
        >
        <span v-if="imageUploading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

          Upload Image
        </button>
      </div>

    </div>
  </div>
</template>
<script>
import { getAuth } from 'firebase/auth';
import { actionTypes } from '../store/modules/firebasedb';
import AppImage from './Image.vue';
import ReviewStars from './ReviewStars.vue';

export default {
  name: 'AppRecipePageView',
  components: {
    AppImage,
    ReviewStars,
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
    averageRating: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      title: this.recipe.data.title,
      content: this.recipe.data.content,
      currentUserUid: '',
      imageSet: false,
      imageUploading: false,
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
            url: `https://recipes-online.netlify.app/${this.recipeId()}`,
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
      this.imageSet = true;
      [this.image] = event.target.files;
    },

    uploadImage() {
      console.log('Uploading image');
      console.log(this.recipe);
      this.imageUploading = true;
      this.$store
        .dispatch(actionTypes.uploadImage, {
          recipeId: this.recipeId,
          image: this.image,
          images: this.recipe.images,
        })
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
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
