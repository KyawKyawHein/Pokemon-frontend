import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserLayout from "./layout/UserLayout";
import GuestLayout from "./layout/GuestLayout";

const router = createBrowserRouter([
    {
        path : "/",
        element : <UserLayout/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    },
    {
        path : "/",
        element : <GuestLayout/>,
        children : [
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])

export default router;