import { HeaderContainer } from './Header.styles'
import { NavLink } from 'react-router-dom'

import logoPomodoro from '../../assets/logo-pomodoro.svg'
import { Scroll, Timer } from 'phosphor-react'

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={logoPomodoro} alt=""></img>
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          {/* The title property on NavLink is used to specify a tooltip that appears when the user hovers over the link. */}
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

// NavLink allows users to move between different parts of a SPA without reloading the page.
