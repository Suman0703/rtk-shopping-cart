import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'

// Layout wraps every page — Navbar will go here later
const Layout = () => {
  return (
    <div>
      {/* Navbar will go here in Step 5 */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App