import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import Admin from "../pages/Admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [{
            path: "",
            element: <Home/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword/>
        },
        {
            path: "/register",
            element: <Register/>
        },{
            path: "/admin-panel",
            element: <Admin/>
        }
]}   
])

export default router;