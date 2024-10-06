import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import AppLayout from "@/layout/index.tsx";
import AuthRoute from "./AuthRoute";

const Login = React.lazy(() => import("@/views/Login/index.tsx"));
const Home = React.lazy(() => import("@/views/Home/index.tsx"));
const User = React.lazy(() => import("@/views/User/index.tsx"));
const Tag = React.lazy(() => import("@/views/Tag/index.tsx"));
const Article = React.lazy(() => import("@/views/Article/index.tsx"));
const EditArticle = React.lazy(() => import("@/views/EditArticle/index.tsx"));
const Attachment = React.lazy(() => import("@/views/Attachment/index.tsx"));

const withLoadingComponent = (comp: JSX.Element) => {
    return <Suspense fallback={<div>Loading...</div>}>{comp}</Suspense>;
};

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/console/home" replace /> },
    {
        path: "/console",
        element: <AuthRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { index: true, element: <Navigate to="/console/home" /> },
                    { path: "home", element: withLoadingComponent(<Home />) },
                    { path: "user", element: withLoadingComponent(<User />) },
                    { path: "tag", element: withLoadingComponent(<Tag />) },
                    { path: "article", element: withLoadingComponent(<Article />) },
                    { path: "edit", element: withLoadingComponent(<EditArticle />) },
                    { path: "edit/:id", element: withLoadingComponent(<EditArticle />) },
                    { path: "attachment", element: withLoadingComponent(<Attachment />) },
                ],
            },
        ],
    },
    { path: "/auth/login", element: withLoadingComponent(<Login />) },
]);

export default router;
