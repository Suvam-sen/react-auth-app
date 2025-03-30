import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const appRouter = createBrowserRouter([
  { 
    path: "/", 
    element: <Login /> 
  },
  { 
    path: "/register", 
    element: <Register /> 
  },
]);

const AppRouter = () => {
  return <RouterProvider router={appRouter} />;
};

export default AppRouter;