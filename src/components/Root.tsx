import { Outlet, Link } from "react-router-dom";
export default function Root() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/sign-up">회원가입</Link>
        </li>
        <li>
          <Link to="/sign-in">로그인</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
