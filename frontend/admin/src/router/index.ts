import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/Home/index.vue"),
	},
	{
		path: "/about",
		name: "About",
		component: () => import("@/views/About/index.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
