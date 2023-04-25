/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(node:(.*)$)",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/ui/(.*)$",
    "^@/hooks/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/public/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    "prettier-plugin-tailwindcss", // MUST come last
  ],
  pluginSearchDirs: false,
}
