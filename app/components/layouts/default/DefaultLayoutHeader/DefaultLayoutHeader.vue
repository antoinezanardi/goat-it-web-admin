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
    <template #title>
      <div class="gap-2 inline-flex items-center">
        <img
          :alt="$t('common.app.logo')"
          class="h-10 w-auto"
          height="128"
          src="/img/logo/logo-128.avif"
          width="128"
        >

        <span
          class="hidden md:inline"
          data-testid="default-layout-header-full-name"
        >
          {{ $t('common.app.name') }}
        </span>

        <span
          class="inline md:hidden"
          data-testid="default-layout-header-short-name"
        >
          {{ $t('common.app.nameShort') }}
        </span>
      </div>
    </template>

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