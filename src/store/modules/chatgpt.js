/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import { titleParams } from '../../helpers/prompt.js';
import gptApi from '../../api/gptApi.js';

// Define constant action and mutation types for enhancing content
export const actionTypes = {
  enhanceContent: '[gpt] Enhance Content',
};

export const mutationTypes = {
  enhanceContentStart: '[gpt] Enhance Content Start',
  enhanceContentSuccess: '[gpt] Enhance Content Success',
  enhanceContentFailure: '[gpt] Enhance Content Failure',

  setEnhancedContent: '[gpt] Set Enhanced Content',
};

// Define initial state for the content enhancement feature
const state = {
  isLoading: false,
  enhancedContent: '',
};

const mutations = {
  [mutationTypes.enhanceContentStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.enhanceContentSuccess](state, payload) {
    // state.isLoading = false;
    state.enhancedContent = payload;
  },
  [mutationTypes.enhanceContentFailure]() {},
  [mutationTypes.setEnhancedContent](state, payload) {
    state.enhancedContent = payload;
    state.isLoading = false;
  },
};

const actions = {

  /**
 * Action to enhance content using GPT API.
 * Modifies message content with recipe title and content, then calls GPT API to enhance content.
 * Commits a mutation to indicate content enhancement has started.
 * Upon successful enhancement, commits a mutation to update enhanced content and resolves with the new title.
 */

  [actionTypes.enhanceContent](context, { recipeTitle, recipeContent }) {
    titleParams.messages[0].content = `Recipe content: ${recipeContent}, title: ${recipeTitle}`;
    return new Promise((resolve) => {
      context.commit(mutationTypes.enhanceContentStart);
      gptApi.enhanceContent(titleParams).then((response) => {
        const newTitle = response.choices[0].message.content;
        context.commit(mutationTypes.enhanceContentSuccess, newTitle);
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
