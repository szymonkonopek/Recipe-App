<template>
  <button
    class="btn btn-info p-1 m-1 text-white"
    @click="enhanceTitle"
    :disabled="isLoading"
  >
    Enhance
  </button>
</template>

<script>
import { mapState } from 'vuex';
import { actionTypes } from '../store/modules/chatgpt';

export default {
  name: 'EnhanceTitleButton',
  props: {
    recipeTitle: {
      type: String,
      required: true,
    },
    recipeContent: {
      type: String,
      required: true,
    },
  },
  methods: {
    enhanceTitle() {
      this.$store
        .dispatch(actionTypes.enhanceContent, {
          recipeTitle: this.recipeTitle,
          recipeContent: this.recipeContent,
        })
        .then((responce) => {
          console.log(responce);
        });
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.chatgpt.isLoading,
    }),
  },
};
</script>
