import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://silky.moe",
  integrations: [svelte()],
});
