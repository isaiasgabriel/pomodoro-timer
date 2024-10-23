import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './DefaultLayout.styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}

// DefaultLayout is a component that wraps all the pages of the application.
// By using this architecture, the Header component is rendered only once.
// The Outlet serves as a reserved space where you can render other components of the application.
// In Router.tsx, you can place these components within the Outlet.

// Setup for DefaultLayout:
// 1. Create a DefaultLayout file
// 2. In this file, define the DefaultLayout component that includes:
//    - The Header component, which will be reused across different pages.
//    - The Outlet component, which will render the content of the nested routes.
// 3. Ensure that the DefaultLayout component is properly exported so it can be used in other files.
// 4. In your Router file (e.g., Router.tsx), import the DefaultLayout component and use it to wrap the routes.
