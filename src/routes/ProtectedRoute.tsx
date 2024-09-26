import { useAuthStore } from '../stores/auth/store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore()

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />
}

export default ProtectedRoute
