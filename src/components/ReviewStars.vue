<!-- eslint-disable max-len -->
<template>
  <div v-if="canReview" class="bg-primary p-2 my-3 rounded w-100 d-flex align-items-center justify-content-center flex-column shadow-lg">
    <div class="d-flex align-items-center pb-3">
      <div v-for="star in 5" :key="star">
        <i
          @click="rating = star"
          @keydown="handleKeyDown"
          :class="rating >= star ? 'bi bi-star-fill text-white h1 px-1' : 'bi bi-star h1 px-1'"
          tabindex="0"
        ></i>
      </div>
    </div>
    <button :disabled="rating == 0" class="btn btn-outline-light fw-bold" @click="addReview">Rate this review!</button>
  </div>
</template>

<script>
import { actionTypes } from '../store/modules/firebasedb';

export default {
  name: 'ReviewStars',
  props: {
    recipeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rating: 0,
      canReview: false,
    };
  },
  methods: {
    addReview() {
      this.$store
        .dispatch(actionTypes.addReview, {
          recipeId: this.recipeId,
          review: this.rating,
        }).then(() => {
          this.canReview = false;
          this.$router.go();
        });
    },
  },
  created() {
    this.$store.dispatch(actionTypes.checkifCanReview, {
      recipeId: this.recipeId,
    }).then((canReview) => {
      this.canReview = canReview;
    });
  },
};
</script>
