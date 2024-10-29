import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

const BaseCountDownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  gap: 0.5rem;
  font-weight: bold;

  color: ${(props) => props.theme['gray-100']};

  // When the is cursor disabled the opacity is reduced
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['green-500']};

  // :not(:disabled):hover > when you hover over when the cursor is enabled
  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['red-500']};

  // :not(:disabled):hover > when you hover over when the cursor is enabled
  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
