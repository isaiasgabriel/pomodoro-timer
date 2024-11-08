import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap; /* The flex-wrap sets if flex components should stay on the same line or can wrap in multiple lines */
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

// BaseInput is a template for our inputs. We set the general styles here,
// and the specifics for each component can be specified below.
// This way, we can reuse our code and make small adjustments for each input.

export const TaskInput = styled(BaseInput)`
  flex: 1; //This option will make the task input take up as much space as possible

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
  //When you create a datalist inside an input, it automatically creates an arrow to show the available options,
  // to hide this arrow we need to setup this configuration above.
`

export const MinutesInput = styled(BaseInput)`
  width: 4rem;
`
