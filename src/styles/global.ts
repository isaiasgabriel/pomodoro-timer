import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: #333;
    color: #FFF;
  }
`

// 1. Create and export const inside the global style file using createGlobalStyle from styled-components. src > styles > global.ts.
// 2. Add the global CSS configurations for the project.
// 3. Include this component within the App function > app.tsx.
