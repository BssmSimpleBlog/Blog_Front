import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import Loading from "../pages/Loading";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/",
      children: [
        { path: "/", element: <Home /> },
        { path: "post", element: <Post /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Home = Loadable(lazy(() => import("../pages/Home")));

//Pages

const Post = Loadable(lazy(() => import("../pages/Post")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const Login = Loadable(lazy(() => import("../pages/Login")));

const Register = Loadable(lazy(() => import("../pages/Register")));
