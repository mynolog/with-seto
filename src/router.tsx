import { createBrowserRouter } from 'react-router-dom'
import Root from './components/Root'

import ProtectedRoute from './routes/ProtectedRoute'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MyPage from './components/MyPage'

export const routes = [
  {
    path: '/',
    element: <Root />,
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
