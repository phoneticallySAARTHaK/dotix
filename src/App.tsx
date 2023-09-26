import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Categories from "./pages/Categories";
import * as Home from "./pages/Home";
import * as Result from "./pages/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "/home", Component: Home.Component },
      { path: "/quiz" },
      { path: "/result", Component: Result.Component },
      { path: "/leaderboard" },
      { path: "/categories", ...Categories },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
