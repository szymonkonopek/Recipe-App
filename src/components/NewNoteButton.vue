<template>
  <!-- Button trigger modal -->
  <button
    type="button"
<<<<<<< HEAD
    class="btn btn-success position-fixed bottom-0 end-0 m-3"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <i class="bi bi-plus-circle display-5"></i>
=======
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Add new note
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
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
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">New note</h1>
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
                v-model="noteTitle"
                required
                v-if="enhancedTitle.length == 0"
              />
              <div
                class="d-flex flex-row position-relative"
                v-if="enhancedTitle.length > 0"
              >
                <input
                  type="text"
                  class="form-control"
                  id="titleInput"
                  maxlength="60"
                  aria-describedby="textHelp"
                  v-model="enhancedTitle"
                  disabled
                  required
                  @click="test"
                />
                <div
                  class="position-absolute top-50 end-0 translate-middle-y d-flex flex-row"
                >
                  <button
<<<<<<< HEAD
                    class="btn btn-link text-info p-0"
=======
                    class="btn btn-link text-secondary p-0"
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
                    @click="updateTitle"
                  >
                    <i class="bi bi-check-square-fill"></i>
                  </button>
                  <button
                    class="btn btn-link text-secondary"
                    @click="discardTitle"
                  >
                    <i class="bi bi-x-square"></i>
                  </button>
                </div>
              </div>
              <div id="textHelp" class="form-text">
                Type title of your new note
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Note content</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                aria-describedby="textAreaHelpblock"
                maxlength="255"
                v-model="noteContent"
                required
              ></textarea>
            </div>
            <small id="textAreaHelpblock" class="form-text text-muted">
              {{ noteContent.length }}/255
            </small>
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
<<<<<<< HEAD
                class="btn btn-success p-1 m-1 text-white"
=======
                class="btn btn-primary p-1 m-1 text-white"
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
                @click="submit"
                :disabled="isLoading"
              >
                Submit
              </button>
              <EnhanceTitleButton
                :noteTitle="noteTitle"
                :noteContent="noteContent"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { actionTypes } from "@/store/modules/firebasedb";
import { ref } from "vue";
import EnhanceTitleButton from "./EnhanceTitleButton.vue";
import { mapState } from "vuex";
import { mutationTypes } from "@/store/modules/chatgpt";

export default {
  name: "NewNoteButton",
  computed: {
    ...mapState({
      enhancedTitle: (state) => state.chatgpt.enhancedTitle,
      isLoading: (state) => state.firebase.isLoading,
    }),
  },
  data() {
    return {
      noteTitle: ref(""),
      noteContent: "",
      isSchool: false,
      isWork: false,
      isPersonal: false,
      checkedTags: ref([]),
      isLoading: false,
    };
  },
  methods: {
    submit() {
      if (this.noteTitle.length > 0 && this.noteContent.length > 0) {
        this.$store
          .dispatch(actionTypes.addNote, {
            title: this.noteTitle,
            content: this.noteContent,
            tags: this.checkedTags,
          })
          .then(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            this.$router.go();
          });
      }
    },
    test() {
      console.log("test");
    },
    updateTitle() {
      this.noteTitle = this.enhancedTitle;
      this.$store.commit(mutationTypes.setEnhancedTitle, "");
    },
    discardTitle() {
      this.noteTitle = "";
      this.$store.commit(mutationTypes.setEnhancedTitle, "");
    },
  },
  components: { EnhanceTitleButton },
};
</script>
