<script lang="ts" setup>
import { PieChartOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const selectedKeys = ref<string[]>(["1"]);
</script>

<template>
  <div class="logo" />
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <pie-chart-outlined />
      <span>Option 1</span>
    </a-menu-item>
  </a-menu>
</template>

<style lang="scss" scoped></style>
