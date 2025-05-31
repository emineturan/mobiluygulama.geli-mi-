import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { mcp } from '../mcp';

export const booksAgent = new Agent({
  name: 'Books Agent',
  instructions: `
    Your job is to help users with book-related queries. You can search for books,
    get book details, and provide book recommendations. Use the available tools
    to fetch comprehensive book information.
  `,
  model: openai('gpt-4o'),
  tools: async ({ runtimeContext }) => {
    const booksTools = await mcp.getTools();
    return booksTools;
  },
});
