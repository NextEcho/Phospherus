import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/console",
    redirect: "/console/dashboard",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/console/dashboard",
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
