import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Form from "./Pages/Form/Form.tsx"
// import Layout from "./Pages/Layout/Layout.tsx"
// import DisplayPage from "./Pages/DisplayPage/DisplayPage.tsx"
import Layout from "./Pages/Layout/Layout.tsx"

let routers = createBrowserRouter([
  // {
    // path: "/",
    // element: <Layout/> , children: [
      {path: "/", element: <Form/>},
      {path:"/meeting-minutes", element: <Layout/>}
    // ]
  // }
])
export default function App() {
  return (
    <RouterProvider router={routers} />
 )
}
