import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  success: 'green',
  danger: 'red',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 0;
  border-radius: 5px;
  color: white;

  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
`

// Setup:
// npm i styled-components
// npm i @types/styled-components -D
// vscode styled components extension

// Usage:
// 1. We create the button component using the styled-components library.
// 2. Styled-components allows us to define both CSS and component logic together in a JS/TS file.
// 3. In the same file, we can define the interfaces, types, component, and CSS, simplifying the structure.
