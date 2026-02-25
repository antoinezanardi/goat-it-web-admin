<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { getRoutes, currentRoute } = useRouter();

const { t } = useI18n();

const navigationMenuItems = computed<NavigationMenuItem[]>(() => getRoutes().map(route => {
  const routeLabel = route.meta?.titleKey ? t(route.meta.titleKey) : route.name?.toString();
  const isRouteActive = currentRoute.value.path === route.path;

  return {
    label: routeLabel,
    to: route.path,
    active: isRouteActive,
  };
}));
</script>

<template>
  <UHeader
    :title="$t('common.app.name')"
  >
    <UNavigationMenu :items="navigationMenuItems"/>

    <template #right>
      <UColorModeButton
        class="cursor-pointer"
      />

      <UTooltip :text="$t('navigation.openOnGitHub')">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/antoinezanardi/goat-it-web-admin"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>

      <LocaleSelect />
    </template>
  </UHeader>
</template>