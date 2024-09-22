import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="w-full h-16 bg-[#736D5D] px-10 text-white">
      <ul className="w-full h-full grid grid-cols-12 items-center">
        <li className="col-span-10">
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/sign-up">회원가입</Link>
        </li>
        <li>
          <Link to="/sign-in">로그인</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
