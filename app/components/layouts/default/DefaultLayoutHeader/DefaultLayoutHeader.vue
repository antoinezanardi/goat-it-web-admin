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
      <UColorModeButton
        class="cursor-pointer"
      />

      <UTooltip
        id="default-layout-header-github-link-tooltip"
        :text="$t('navigation.openOnGitHub')"
      >
        <UButton
          aria-label="GitHub"
          color="neutral"
          icon="i-lucide-github"
          target="_blank"
          to="https://github.com/antoinezanardi/goat-it-web-admin"
          variant="ghost"
        />
      </UTooltip>

      <LocaleSelect/>
    </template>
  </UHeader>
</template>