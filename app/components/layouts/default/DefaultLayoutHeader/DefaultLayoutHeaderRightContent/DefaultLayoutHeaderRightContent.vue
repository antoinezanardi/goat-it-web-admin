<script lang="ts" setup>
import { LIGHT_COLOR_MODE } from "~/utils/constants/color/color.constants";

const colorMode = useColorMode();

const { t } = useI18n();

const colorModeSwitchTooltipText = computed<string>(() => {
  const capitalizedNextColorMode = colorMode.value === LIGHT_COLOR_MODE ? "Dark" : "Light";

  return t(`navigation.switchOn${capitalizedNextColorMode}Mode`);
});
</script>

<template>
  <div
    id="default-layout-header-right-content"
    class="flex gap-2 items-center"
  >
    <UTooltip
      id="default-layout-header-github-link-tooltip"
      :text="$t('navigation.openOnGitHub')"
    >
      <UButton
        id="default-layout-header-github-link"
        :aria-label="$t('navigation.openOnGitHub')"
        color="neutral"
        icon="i-lucide-github"
        target="_blank"
        to="https://github.com/antoinezanardi/goat-it-web-admin"
        variant="ghost"
      />
    </UTooltip>

    <UTooltip
      id="default-layout-header-color-mode-switch-tooltip"
      :text="colorModeSwitchTooltipText"
    >
      <div>
        <UColorModeSwitch
          color="secondary"
        />
      </div>
    </UTooltip>

    <LocaleSelect/>
  </div>
</template>