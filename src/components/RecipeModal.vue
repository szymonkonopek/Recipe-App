<template>
  <div class="modal-dialog">
    <div v-bind:class="{'modal-content': true, [recipeColor]: true}">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">
          {{ recipeData.title }}
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body position-relative">
        <div>{{ recipeData.content }}</div>
        <div class="d-flex flex-row">
          <small
            v-for="(tag, index) in recipeData.tags"
            :key="index"
            class="fw-bold text-white me-2 mt-2 badge bg-success border"
          >
            {{ tag }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeModal',
  props: {
    recipeData: {
      type: Object,
      required: true
    },
    recipeId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      recipeColor: this.recipeData.color
    }
  }
}
</script>
