import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
