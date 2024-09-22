import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Root() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Nav />
      <Outlet />
    </div>
  );
}
