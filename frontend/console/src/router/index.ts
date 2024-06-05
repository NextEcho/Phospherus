import { createBrowserRouter } from "react-router-dom";
import Login from "@/views/Login";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Login,
    },
]);

export default router;
