import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import LoadingScreen from "../pages/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
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
        { path: "/explore", element: <Explore /> },
        { path: "/reels", element: <Reels /> },
        { path: "/message", element: <Message /> },
        { path: "/profile", element: <Profile /> },
        { path: "/loading", element: <Loading /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Home = Loadable(lazy(() => import("../pages/Home")));

//Pages
const Explore = Loadable(lazy(() => import("../pages/Explore")));

const Reels = Loadable(lazy(() => import("../pages/Reels")));

const Message = Loadable(lazy(() => import("../pages/Message")));

const Profile = Loadable(lazy(() => import("../pages/Profile")));

const Loading = Loadable(lazy(() => import("../pages/LoadingScreen")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const Login = Loadable(lazy(() => import("../pages/Login")));

const Register = Loadable(lazy(() => import("../pages/Register")));
