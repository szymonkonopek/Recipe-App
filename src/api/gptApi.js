import axios from "axios";

const client = axios.create({
  headers: {
    Authorization: "Bearer " + `${process.env.VUE_APP_OPENAI_KEY}`,
  },
});

const enhanceTitle = (params) => {
  return client
    .post("https://api.openai.com/v1/chat/completions", params)
    .then((result) => {
      return result.data;
    });
};

export default {
  enhanceTitle,
};
