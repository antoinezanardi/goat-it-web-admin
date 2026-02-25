<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { getRoutes, currentRoute } = useRouter();

const items = computed<NavigationMenuItem[]>(() => {
  const routes = getRoutes();

  return routes.map(route => {
    return {
      label: route.name?.toString() || route.path,
      to: route.path,
      active: currentRoute.value.path === route.path,
    }
  });
});
</script>

<template>
  <UHeader
    title="Goat It Admin"
  >
    <UNavigationMenu :items="items"/>

    <template #right>
      <UColorModeButton
        class="cursor-pointer"
      />

      <UTooltip text="Ouvrir sur GitHub">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/antoinezanardi/goat-it-web-admin"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>