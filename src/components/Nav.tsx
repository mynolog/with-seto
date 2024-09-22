import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { isLoginSelector } from "../recoil/TokenAtom";

function Nav() {
  const isLogin = useRecoilValue(isLoginSelector);

  return (
    <nav className="w-full h-16 bg-[#736D5D] px-10 text-white">
      <ul className="w-full h-full grid grid-cols-12 items-center">
        {isLogin ? (
          <>
            <li className="col-span-10">
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/my-page">마이페이지</Link>
            </li>
            <li>
              <Link to="/sign-out">로그아웃</Link>
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
  );
}

export default Nav;
