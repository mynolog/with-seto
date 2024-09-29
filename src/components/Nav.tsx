import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/auth/store'
import Logout from './Logout'

function Nav() {
  const { isLoggedIn } = useAuthStore()

  return (
    <nav className="w-full h-16 bg-[#736D5D] px-10 text-white m-0">
      <ul className="w-full h-full grid grid-cols-12 items-center">
        {isLoggedIn ? (
          <>
            <li className="col-span-10">
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/my-page">마이페이지</Link>
            </li>
            <li>
              {/* <Link to="/sign-out">로그아웃</Link> */}
              <Logout />
            </li>
          </>
        ) : (
          <>
            <li className="col-span-10">
              <Link to="/">홈</Link>
            </li>

            <li>
              <Link to="/sign-up">회원가입</Link>
            </li>
            <li>
              <Link to="/sign-in">로그인</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
