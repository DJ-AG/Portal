import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useNavigation,
  useLocation,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Landing from './pages/landing';
import {CookieChecker} from "./util/cookie-checker";

// This import the BrowserRouter, Routes, and Route components from the react-router-dom library.
// These components are used to create a routing system for the application.

import { Provider } from "react-redux";
// This import the Provider component from the react-redux library.
// This component is used to connect the Redux store to the React application.

import { store } from "./Redux/store";
const loader = async () => {

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function Layout() {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        <Outlet />
      ) : (
        <div className="flex flex-col flex-1 px-20 py-[50px]">
          {navigation.state !== "idle" && <p>Navigation in progress...</p>}
          <Outlet />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <CookieChecker />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>
  );
}