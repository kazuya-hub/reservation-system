<script setup lang="ts">

import TheHeader from './components/TheHeader.vue'

</script>

<template>
  <TheHeader />

  <main>
    <RouterView />
  </main>

</template>

<style scoped>

:global(body) {
  margin: 0;
}

main {
  padding: 16px;
}

</style>