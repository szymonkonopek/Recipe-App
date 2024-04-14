<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-success position-fixed bottom-0 end-0 m-3 shadow"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <i class="bi bi-plus-circle display-5"></i>
  </button>

  <!-- Modal -->
  <div
    class="modal fade modal-lg"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-bind:class="{ 'modal-content': true, [recipeColor]: true }">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">New recipe</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent>
            <div class="mb-3">
              <label for="titleInput" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="titleInput"
                maxlength="60"
                aria-describedby="textHelp"
                v-model="recipeTitle"
                required
              />
            </div>
            <div v-show="enhancedContent == 0" class="form-group">
              <label for="exampleFormControlTextarea1">Recipe content</label>
              <textarea
                ref="textarea1"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                aria-describedby="textAreaHelpblock"
                v-model="recipeContent"
                required
                v-autoH
              ></textarea>
            </div>
            <div
              v-show="enhancedContent.length > 0"
              class="form-group position-relative"
            >
              <label for="exampleFormControlTextarea1">Recipe content</label>
              <div
                class="position-absolute top-0 end-0 translate-middle-y d-flex flex-row mt-2"
              >
                <button class="btn btn-link text-info p-0" @click="updateTitle">
                  <i class="bi bi-check-square-fill"></i>
                </button>
                <button
                  class="btn btn-link text-secondary"
                  @click="discardTitle"
                >
                  <i class="bi bi-x-square"></i>
                </button>
              </div>
              <textarea
                ref="textarea2"
                class="form-control"
                id="exampleFormControlTextarea2"
                rows="6"
                aria-describedby="textAreaHelpblock"
                v-model="enhancedContent"
                required
              ></textarea>
            </div>
            <small id="textAreaHelpblock" class="form-text text-muted">
              {{ recipeContent.length }}/2048
            </small>
            <div class="form-group">
              <label for="exampleFormSelect">Set color recipe </label>
              <select
                class="form-select"
                id="selectColor"
                v-model="recipeColor"
              >
                <option value="text-bg-white">White</option>
                <option value="text-bg-primary">Light Brown</option>
                <option value="text-bg-secondary">Dark Brown</option>
                <option value="text-bg-warning">Light Sea</option>
              </select>
            </div>
            <div class="pt-3 pb-3">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkbox1"
                  value="School"
                  v-model="checkedTags"
                />
                <label class="form-check-label" for="inlineCheckbox1"
                  >School</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkbox2"
                  value="Work"
                  v-model="checkedTags"
                />
                <label class="form-check-label" for="inlineCheckbox2"
                  >Work</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkbox3"
                  value="Personal"
                  v-model="checkedTags"
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Personal</label
                >
              </div>
            </div>
            <div>
              <button
                class="btn btn-success p-1 m-1 text-white"
                @click="submit"
                :disabled="isLoading"
              >
                Submit
              </button>
              <EnhanceTitleButton
                :recipeTitle="recipeTitle"
                :recipeContent="recipeContent"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { actionTypes } from '@/store/modules/firebasedb';
import { ref } from 'vue';
import EnhanceTitleButton from './EnhanceTitleButton.vue';
import { mapState } from 'vuex';
import { mutationTypes } from '@/store/modules/chatgpt';

export default {
  name: 'NewRecipeButton',
  computed: {
    ...mapState({
      enhancedContent: (state) => state.chatgpt.enhancedContent,
      isLoading: (state) => state.firebase.isLoading,
    }),
  },
  data() {
    return {
      recipeTitle: ref(''),
      recipeContent: '',
      checkedTags: ref([]),
      recipeColor: 'text-bg-white',
      isLoading: false
    };
  },
  methods: {
    submit() {
      if (this.recipeTitle.length > 0 && this.recipeContent.length > 0) {
        this.$store
          .dispatch(actionTypes.addRecipe, {
            title: this.recipeTitle,
            content: this.recipeContent,
            tags: this.checkedTags,
            color: this.recipeColor,
          })
          .then(async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.$router.go();
          });
      }
    },
    updateTitle() {
      this.recipeContent = this.enhancedContent;
      this.$store.commit(mutationTypes.setEnhancedContent, '');
    },
    discardTitle() {
      this.recipeContent = '';
      this.$store.commit(mutationTypes.setEnhancedContent, '');
    },
  },
  components: { EnhanceTitleButton },
};
</script>
