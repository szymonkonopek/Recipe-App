export const titleParams = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: ''
    },
    {
      role: 'system',
      content:
        'Type enhanced title, based on recipe Content. Max. 80 characters, return just title string'
    }
  ],
  max_tokens: 250,
  top_p: 1,
  temperature: 0.5,
  frequency_penalty: 0,
  presence_penalty: 0
}
