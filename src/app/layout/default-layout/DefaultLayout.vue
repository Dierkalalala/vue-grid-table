<script setup lang="ts">
  import { NConfigProvider } from 'naive-ui'
</script>

<template>
  <n-config-provider>
    <header class="header">

    </header>

    <slot></slot>

    <footer class="footer">

    </footer>
  </n-config-provider>

</template>

<style scoped>
.header {
  margin-bottom: 50px;
}

.footer {
  margin-top: 50px;
}
</style>