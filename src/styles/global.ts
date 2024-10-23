import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }

    :focus{
        outline:0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
    }

    body{
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button{
        font-family:"Roboto", sans-serif;
        font-weight:400;
        font-size:1rem;
    }

`

// 1. Create and export const inside the global style file using createGlobalStyle from styled-components. src > styles > global.ts.
// 2. Add the global CSS configurations for the project.
// 3. Include this component within the App function > app.tsx.
