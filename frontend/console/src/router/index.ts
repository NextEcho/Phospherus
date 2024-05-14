import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("@/views/Login/index.vue"),
    },
    {
        path: "/console",
        component: () => import("@/layout/index.vue"),
        redirect: "/console/dashboard",
        children: [
            {
                path: "/dashboard",
                component: () => import("@/views/Dashboard/index.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
