<script setup lang="ts">
import { ref } from "vue";
import { DashboardFilled, FileFilled } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";

const route = useRoute();
const selectedKeys = ref<string[]>([route.path]);
const collapsed = ref<boolean>(false);
</script>

<template>
	<a-layout-sider
		class="layout-sider"
		v-model:selectedKeys="selectedKeys"
		v-model:collapsed="collapsed"
		collapsible>
		<div class="logo"></div>
		<a-menu theme="dark" mode="inline">
			<a-menu-item key="/console/dashboard">
				<DashboardFilled />
				<span>仪表盘</span>
			</a-menu-item>
			<a-menu-item key="/console/article">
				<FileFilled />
				<span>文章管理</span>
			</a-menu-item>
		</a-menu>
	</a-layout-sider>
</template>
<style lang="scss" scoped>
.layout-sider {
	.logo {
		height: 32px;
		margin: 16px;
		background: rgba(255, 255, 255, 0.3);
	}
}
</style>
