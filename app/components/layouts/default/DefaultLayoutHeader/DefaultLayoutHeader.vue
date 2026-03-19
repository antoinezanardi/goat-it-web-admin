<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const router = useRouter();

const { t } = useI18n();

const navigationMenuItems = computed<NavigationMenuItem[]>(() => router.getRoutes().map(route => {
  const routeLabel = typeof route.meta.titleKey === "string" ? t(route.meta.titleKey) : route.name?.toString();
  const isRouteActive = router.currentRoute.value.path === route.path;

  return {
    label: routeLabel,
    to: route.path,
    active: isRouteActive,
    icon: route.meta.icon,
  };
}));
</script>

<template>
  <UHeader
    id="default-layout-header"
    :title="$t('common.app.name')"
  >
    <UNavigationMenu
      id="default-layout-header-navigation-menu"
      :items="navigationMenuItems"
    />

    <template #right>
      <DefaultLayoutHeaderRightContent/>
    </template>
  </UHeader>
</template>