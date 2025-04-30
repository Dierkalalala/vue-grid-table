<script setup lang="ts">
  import useProductTable from "@/entities/product-table/useProductTable.ts";
  import { NDataTable, NInput } from 'naive-ui'

  const {
    columns,
    filteredProducts,
    searchString
  } = useProductTable()
</script>

<template>

  <n-input class="search-input" v-model:value="searchString" />

  <n-data-table
      virtual-scroll
      max-height="700"
      :columns="columns"
      :data="filteredProducts"
  />
</template>

<style>
.search-input {
  margin-bottom: 20px;
}
</style>