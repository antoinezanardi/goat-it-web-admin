<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const router = useRouter();

const { t } = useI18n();

const navigationMenuItems = computed<NavigationMenuItem[]>(() => router.getRoutes()
  .toSorted((routeA, routeB) => (routeA.meta.order ?? Number.MAX_SAFE_INTEGER) - (routeB.meta.order ?? Number.MAX_SAFE_INTEGER))
  .map(route => {
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

    <template #body>
      <UNavigationMenu
        id="default-layout-header-mobile-navigation-menu"
        class="-mx-2.5"
        :items="navigationMenuItems"
        orientation="vertical"
      />
    </template>

    <template #right>
      <DefaultLayoutHeaderRightContent/>
    </template>
  </UHeader>
</template>