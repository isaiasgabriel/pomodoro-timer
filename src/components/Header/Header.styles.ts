import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      // Why do we create 2 transparent borders instead of just specifyng a border in the hover?
      // Because when you create the border only with the hover, it creates a behavior that moves the icon up a little bit

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
        // This class is created by the NavLink when the component is clicked
      }
    }
  }

  img {
    width: 2rem;
    height: 2rem;
  }
`
