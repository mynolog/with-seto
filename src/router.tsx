import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyPage from "./components/MyPage";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "my-page",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
