<script setup lang="ts">
import { NDataTable, NInput } from 'naive-ui'
import useAsyncProductList from "@/features/async-product-list/useAsyncProductList";

const {
  products,
  isLoading,
  tableRef,
  columns,
  searchString,
  pagination,
  sortProducts,
  filterProducts,
  filterProductsBySearch
} = useAsyncProductList()

</script>

<template>

  <NInput
      :value="searchString"
      @update:value="filterProductsBySearch"
  />

  <NDataTable
    remote
    ref="tableRef"
    :is-loading="isLoading"
    :data="products"
    :columns="columns"
    :pagination="pagination"
    @update:sorter="sortProducts"
    @update:filters="filterProducts"
  />
</template>