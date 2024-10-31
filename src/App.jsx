import "./App.css";
//import { MOVIES } from "./mocks/movies";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import NotFound from "./pages/notFound";
import MoviesPage from "./pages/movies";
import RootLayout from "./layout/root-layout";
import MoviesCate from "./pages/movieCate";
import Search from "./pages/search";
import Signup from "./pages/signup";
import Login from "./pages/login";
import MovieDetailPage from "./pages/moiveDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <MoviesCate />,
      },
      {
        path: "movies/:category",
        element: <MoviesPage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
