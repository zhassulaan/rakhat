<template>
  <div class="default-layout">
    <app-header />
    <!-- <div class="container"> -->
      <slot></slot>
    <!-- </div> -->
    <app-footer />
  </div>
</template>

<script setup name="DefaultLayout">
import { defineAsyncComponent } from "@vue/runtime-core";

const AppHeader = defineAsyncComponent(() =>
  import("@/components/shared/AppHeader")
);
const AppFooter = defineAsyncComponent(() =>
  import("@/components/shared/AppFooter")
);
</script>
