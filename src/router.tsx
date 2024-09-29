import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import ProtectedRoute from './routes/ProtectedRoute'
import SignIn from './components/auth/SignIn.tsx'
import SignUp from './components/auth/SignUp.tsx'
import MyPage from './components/user/MyPage.tsx'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'logout',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
          },
        ],
      },
      {
        path: 'my-page',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
