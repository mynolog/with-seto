import { useAuthStore } from '../../stores/auth/store.ts'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    postLogout()
  }

  const postLogout = async () => {
    const result = await logout()
    if (result) {
      navigate('/')
    }
  }
  return <button onClick={handleLogoutClick}>로그아웃</button>
}
