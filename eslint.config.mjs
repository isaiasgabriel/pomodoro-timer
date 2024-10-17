import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})
export default [...compat.extends('@rocketseat/eslint-config/react')]

// Setup Instructions:
// 1. Install the "ESLint" VsCode extension
// 2. npm i eslint -D
// 3. npm i @rocketseat/eslint-config -D
// 4. Create ".eslintrc.json" file:
//
// {
//     "extends": "@rocketseat/eslint-config/react"
// }
//
// 5. npx @eslint/migrate-config .eslintrc.json
// 6. npm install @eslint/js @eslint/eslintrc -D
// 7. Delete the ".eslintrc.json" file
// 8. "ctrl+shift+p" > reload window
// 9. "npx eslint src/ --fix"
// 10. "package.json" > scripts > "lint": "eslint src/ --fix"

// Prettier:
// If you use prettier create a ".prettierrc":

// {
//   "singleQuote": true,
//   "semi": false
// }
