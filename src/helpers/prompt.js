export const titleParams = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: '',
    },
    {
      role: 'system',
      content:
        'Generate a recipe based on recipe Content. Max. 512 characters, do not generate title',
    },
  ],
  max_tokens: 250,
  top_p: 1,
  temperature: 0.5,
  frequency_penalty: 0,
  presence_penalty: 0,
};
