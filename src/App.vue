<template>
  <component :is="layout"> 
    <router-view /> 
  </component>
</template>

<!-- <script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { markRaw, ref } from "vue";

const layout = ref(null);
layout.value = markRaw(DefaultLayout);
</script> -->

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ImageLayout from "@/layouts/ImageLayout.vue";
export default {
  components: {
    ImageLayout,
    DefaultLayout,
  },
  computed: {
    layout() {
      console.log(this.$route.meta)
      return (this.$route.meta.layout || 'default') + '-layout'
      // console.log(this.$route.meta)
    }
  }
}
</script>