<script setup lang="ts">
import Sider from "@/layout/Sider/index.vue";
import Header from "@/layout/Header/index.vue";
import Footer from "@/layout/Footer/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
</script>

<template>
	<a-layout style="min-height: 100vh">
		<Sider />
		<a-layout>
			<Header />
			<a-layout-content style="margin: 0 16px">
				<Breadcrumb />
				<router-view></router-view>
			</a-layout-content>
			<a-layout-footer style="text-align: center">
				<Footer />
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<style lang="scss" scoped></style>
