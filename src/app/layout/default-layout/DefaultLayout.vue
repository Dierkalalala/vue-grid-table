<script setup lang="ts">
import {NConfigProvider, NFlex} from 'naive-ui'
import PageContainer from "@/shared/components/page-container";
</script>

<template>
  <n-config-provider>

    <header class="header">
      <PageContainer>
        <n-flex justify="center" gap="50">
          <RouterLink
              to="/frontend"
          >
            Frontend approach
          </RouterLink>

          <RouterLink
              to="/backend"
          >
            Backend approach
          </RouterLink>
        </n-flex>
      </PageContainer>
    </header>

    <slot></slot>
  </n-config-provider>

</template>

<style scoped>
.header {
  margin-bottom: 50px;
}
</style>