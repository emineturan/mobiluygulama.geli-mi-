import { MCPClient } from '@mastra/mcp';

export const mcp = new MCPClient({
  servers: {
    books: {
      url: new URL('https://server.smithery.ai/@emineturan/books/mcp?api_key=7f76d5a6-af60-4354-a701-aad9e56a0055'),
    },
  },
});
