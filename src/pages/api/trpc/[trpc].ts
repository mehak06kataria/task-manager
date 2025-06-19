import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "@/env";
// ✅ points to src/env.ts or env.mjs
import { appRouter } from "@/server/api/root"; // ✅ your main router
import { createTRPCContext } from "@/server/api/trpc"; // ✅ context creator

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
