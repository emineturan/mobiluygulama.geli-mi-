import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const BOOKS_MCP_URL = "https://server.smithery.ai/@emineturan/books/mcp?api_key=7f76d5a6-af60-4354-a701-aad9e56a0055";

export const getBookDefinitionsTool = createTool({
  id: "getBookDefinitions",
  description: "Get book definitions and details from the books MCP server",
  inputSchema: z.object({
    word: z.string(),
  }),
  outputSchema: z.object({
    definition: z.string().nullable(),
    partOfSpeech: z.string().nullable(),
    examples: z.array(z.string()).nullable(),
  }),
  execute: async ({ context }) => {
    const response = await fetch(BOOKS_MCP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "get_definitions",
          arguments: {
            "word": context.word
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error.message}`);
    }

    return data.result;
  },
});

export const getBookDetailsTool = createTool({
  id: "getBookDetails",
  description: "Get detailed book information",
  inputSchema: z.object({
    word: z.string(),
  }),
  outputSchema: z.object({
    details: z.string(),
  }),
  execute: async ({ context }) => {
    const response = await fetch(BOOKS_MCP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "get_word_details",
          arguments: {
            "word": context.word
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error.message}`);
    }

    return { details: data.result };
  },
});

export const searchBooksTool = createTool({
  id: "searchBooks",
  description: "Search for books using various criteria",
  inputSchema: z.object({
    query: z.string(),
  }),
  outputSchema: z.object({
    searchResults: z.string(),
  }),
  execute: async ({ context }) => {
    const response = await fetch(BOOKS_MCP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "search_word",
          arguments: {
            "query": context.query
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error.message}`);
    }

    return { searchResults: data.result };
  },
});
