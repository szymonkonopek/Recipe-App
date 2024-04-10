<template>
  <button
<<<<<<< HEAD
    class="btn btn-info p-1 m-1 text-white"
=======
    class="btn btn-primary p-1 m-1 text-white"
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
    @click="enhanceTitle"
    :disabled="isLoading"
  >
    Enhance
  </button>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "../store/modules/chatgpt";
export default {
  name: "EnhanceTitleButton",
  props: {
    noteTitle: {
      type: String,
      required: true,
    },
    noteContent: {
      type: String,
      required: true,
    },
  },
  methods: {
    enhanceTitle() {
      this.$store
        .dispatch(actionTypes.enhanceTitle, {
          noteTitle: this.noteTitle,
          noteContent: this.noteContent,
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
