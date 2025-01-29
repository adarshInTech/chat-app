import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import MessagePage from "../components/MessagePage";
import Home from "../pages/Home";
import Logo from "../logo/logo";
import ForgotPassword from "../pages/ForgotPassword";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <Logo>
            <RegisterPage />
          </Logo>
        ),
      },
      {
        path: "email",
        element: (
          <Logo>
            <CheckEmailPage />
          </Logo>
        ),
      },
      {
        path: "password",

        element: (
          <Logo>
            <CheckPasswordPage />
          </Logo>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Logo>
            <ForgotPassword />
          </Logo>
        ),
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default routes;
