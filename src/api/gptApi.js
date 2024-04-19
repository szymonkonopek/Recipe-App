import axios from 'axios';

const client = axios.create({
  headers: {
    Authorization: 'Bearer ' + `${process.env.VUE_APP_OPENAI_KEY}`,
  },
});

const enhanceContent = (params) => client
  .post('https://api.openai.com/v1/chat/completions', params)
  .then((result) => result.data);

export default {
  enhanceContent,
};
