import { RouterProvider, createBrowserRouter } from "react-router-dom"
import SignUp from "./components/SignUp"

import Home from "./components/Home"
import Login from "./components/Login"



function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  )
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  )
}

export default App
