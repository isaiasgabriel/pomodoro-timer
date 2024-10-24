import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 2rem 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%; // This option makes the first column - task - 50% of the width of the component
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
}
// The "as const" tells TypeScript that the value of each key is not a generic string, but the exact literal value (e.g., 'green-500' for the green key).
// When you don't specify "as const", TypeScript infers the value of each key as a generic string:
//
// {
//   green: string;
//   yellow: string;
//   red: string;
// }
//
// This is necessary because when we connect to our theme colors in the background property,
// we need the exact color value for TypeScript to correctly understand the specific type.

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

// "shouldForwardProp" allows to create a validation function that controls wich props are passed to the DOM element.
// In this case we allow the "statuscolor" and "children" props to be sent to our DOM.
// The "children" prop is necessary because we need to it display the component's text.
export const Status = styled.span.withConfig({
  shouldForwardProp: (prop) => prop === 'statuscolor' || prop === 'children',
})<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  // ::before and ::after are elements that we create inside the tag that go, currently before or after our element
  // if we want it to be visible we need a content
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
