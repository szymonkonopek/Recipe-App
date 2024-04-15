<template>
  <div class="position-relative" style="height: 20rem; width: 20rem">
    <button
      v-if="canDelete"
      class="btn btn-primary position-absolute top-0 end-0 bg-primary-transparent mt-2 me-2"
      @click="deleteImage"
    >
      <i class="bi bi-trash display-10 h6 text-black"></i>
    </button>
    <img
      :src="image.url"
      style="height: 20rem; width: 20rem"
      class="object-fit-cover border rounded shadow border-primary"
      @click="openImage"
    />
  </div>
</template>

<script>
import { actionTypes } from '../store/modules/firebasedb';
export default {
  name: 'AppImage',
  props: {
    image: {
      type: Object,
      required: true,
    },
    canDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
    recipeId: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },

  methods: {
    deleteImage() {
      this.$store
        .dispatch(actionTypes.deleteImage, {
          recipeId: this.recipeId,
          image: this.image,
          images: this.images,
        })
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          this.$router.go();
        });
    },
    openImage() {
      window.open(this.image.url, '_blank');
    },
  },
};
</script>
