import { Outlet } from 'react-router-dom'
import Nav from './components/Nav.tsx'

function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Nav />
      <Outlet />
    </div>
  )
}

export default App
