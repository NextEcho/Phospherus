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
				path: "/console/dashboard",
				component: () => import("@/views/Dashboard/index.vue"),
			},
			{
				path: "/console/article",
				component: () => import("@/views/Article/index.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
