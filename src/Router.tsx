import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}

// 1. npm i react-router-dom
// 2. create the pages. src > pages > Home.tsx, History.tsx
// 3. create the router file. src > Router.tsx
// 4. Add the routes by wrapping every <Route/> inside the <Routes/> component
// 5. Add the Router component inside the App.tsx file using the BrowserRouter from react-router-dom
// 6. Be sure that the BrowserRouter wraps your Router component!!!

// <BrowserRouter>
//   <Router />
// </BrowserRouter>
