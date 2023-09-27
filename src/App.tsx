import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Categories from "./pages/Categories";
import * as Home from "./pages/Home";
import * as Quiz from "./pages/Quiz";
import * as QuizOptions from "./pages/QuizOptions";
import * as Result from "./pages/Result";
import * as Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    loader: Root.loader,
    children: [
      {
        path: "/home",
        Component: Home.Component,
        loader: Home.loader,
        shouldRevalidate: ({ nextUrl }) => !nextUrl.href.includes("home"),
        children: [
          { path: "options", ...QuizOptions },
          { path: "categories", ...Categories },
        ],
      },
      { path: "/quiz", ...Quiz },
      { path: "/result", Component: Result.Component },
      { path: "/leaderboard" },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
