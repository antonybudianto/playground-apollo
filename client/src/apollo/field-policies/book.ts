import type { FieldPolicy } from "@apollo/client";
import { extractDirective } from "../util";

const initBookFieldPolicy = (): FieldPolicy => {
  return {
    // args, context
    keyArgs(_, ctx) {
      const { directiveName } = extractDirective(ctx.field);
      switch (directiveName) {
        case "books-from-feed": {
          return ["@connection", ["key"]];
        }
        default:
          return [];
      }
    },

    merge(existing = [], incoming = [], ctx) {
      const { directiveName } = extractDirective(ctx.field);
      switch (directiveName) {
        case "books-from-feed": {
          return [...existing, ...incoming];
        }
        default:
          return incoming;
      }
    },
  };
};

export default initBookFieldPolicy;
