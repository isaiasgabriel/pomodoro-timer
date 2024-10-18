/*eslint-disable*/
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// The code below can be read as "I am creating a typing for the styled-components module"
// And this typing is based on our defaultTheme file
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { }
}

// Summary:
// 1. We import the file with the theme (defaultTheme) .
// 2. We create a type based on the theme file.
// 3. We add this type inside the DefaultTheme styled-components module.

// This configuration enables the editor to see and use the theme properties (e.g., colors) directly while coding.
// For example, we can easily access the available theme variables with auto-suggestions without needing to open the defaultTheme file.
