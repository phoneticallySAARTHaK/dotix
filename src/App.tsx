import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "/home", Component: Home.Component },
      { path: "/quiz" },
      { path: "/result" },
      { path: "/leaderboard" },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
