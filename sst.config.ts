import { SSTConfig } from "sst";
import { StackContext, NextjsSite } from "sst/constructs";

export default {
  config() {
    return {
      name: "task-manager",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }: StackContext) {
      const site = new NextjsSite(stack, "Site", {
        path: ".",
        environment: {
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
      });

      stack.addOutputs({
        URL: site.url,
      });
    });
  },
} satisfies SSTConfig;
