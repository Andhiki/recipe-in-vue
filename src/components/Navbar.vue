<script setup lang="ts">
import Container from "./Container.vue";
import ThemeToggle from "./ThemeToggle.vue";
// import { RouterLink } from "vue-router";
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-background shadow-sm"
  >
    <Container class="flex items-center justify-between">
      <h1>Your fav recipe app.</h1>
      <nav class="flex items-center gap-4">
        <!-- <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink> -->
        <ThemeToggle />
      </nav>
    </Container>
  </header>
</template>
