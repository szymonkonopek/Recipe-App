import { titleParams } from "../../helpers/prompt.js";
import gptApi from "../../api/gptApi.js";

export const actionTypes = {
  enhanceTitle: "[gpt] Enhance Title",
};

export const mutationTypes = {
  enhanceTitleStart: "[gpt] Enhance Title Start",
  enhanceTitleSuccess: "[gpt] Enhance Title Success",
  enhanceTitleFailure: "[gpt] Enhance Title Failure",

  setEnhancedTitle: "[gpt] Set Enhanced Title",
};

const state = {
  isLoading: false,
  enhancedTitle: "",
};
const mutations = {
  [mutationTypes.enhanceTitleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.enhanceTitleSuccess](state, payload) {
    //state.isLoading = false;
    state.enhancedTitle = payload;
  },
  [mutationTypes.enhanceTitleFailure]() {},

  [mutationTypes.setEnhancedTitle](state, payload) {
    state.enhancedTitle = payload;
<<<<<<< HEAD
    state.isLoading = false;
=======
>>>>>>> 8fcf12ea80472e24c875fbb1f4ef29c4b595be51
  },
};

const actions = {
  [actionTypes.enhanceTitle](context, { noteTitle, noteContent }) {
    titleParams.messages[0].content = `Note content: ${noteContent}, title: ${noteTitle}`;
    return new Promise((resolve) => {
      context.commit(mutationTypes.enhanceTitleStart);
      gptApi.enhanceTitle(titleParams).then((response) => {
        const newTitle = response.choices[0].message.content;
        context.commit(mutationTypes.enhanceTitleSuccess, newTitle);
        resolve(newTitle);
      });
    });
  },
};

export default {
  actions,
  mutations,
  state,
};
