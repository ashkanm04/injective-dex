<script lang="ts" setup>
defineProps({
  sm: Boolean,

  routeSymbols: {
    type: Array as PropType<string[]>,
    required: true
  }
})
</script>

<template>
  <template v-for="(symbol, index) in routeSymbols" :key="symbol">
    <span>{{ symbol }}</span>

    <BaseIcon
      v-if="index !== routeSymbols?.length - 1"
      name="arrow"
      class="rotate-180 w-3 h-3 cursor-text"
      :class="[sm ? 'w-3 h-3' : 'w-4 h-4']"
    />
  </template>
</template>
