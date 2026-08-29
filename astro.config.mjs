import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL;
const base = process.env.PUBLIC_BASE_PATH;

export default defineConfig({
  output: "static",
  devToolbar: { enabled: false },
  site: site || undefined,
  base: base || "/",
  build: { format: "directory" }
});
