<script lang="ts" setup>
import { PropType } from 'vue'
import { UiMarketWithToken, UiMarketSummary } from '@/types'

defineProps({
  expanded: Boolean,
  isGrid: Boolean,

  market: {
    type: Object as PropType<UiMarketWithToken>,
    required: true
  },

  summary: {
    type: Object as PropType<UiMarketSummary>,
    required: true
  }
})

const emit = defineEmits<{
  'marketsList:toggle': []
}>()

function handleTokenClick() {
  emit('marketsList:toggle')
}
</script>

<template>
  <CommonCard
    no-top-border-radius
    no-padding
    class="h-full px-4"
    data-cy="trading-page-market-info-component"
  >
    <div class="flex items-center flex-wrap lg:flex-nowrap gap-4 h-full">
      <div
        class="flex mt-2 justify-between items-center w-full lg:w-auto lg:mt-0 gap-6"
      >
        <template v-if="isGrid">
          <div class="text-center hidden lg:block">
            <p class="font-semibold text-center px-4">Spot Grid</p>
          </div>

          <div class="w-px h-8 border-r hidden lg:block" />
        </template>

        <div
          v-if="!isGrid"
          class="flex items-center gap-4"
          @click="handleTokenClick"
        >
          <CommonTokenIcon v-if="market.baseToken" :token="market.baseToken" />

          <div class="leading-none select-none cursor-pointer">
            <p class="text-gray-100 font-semibold text-sm flex items-center">
              <span
                data-cy="trading-page-ticker-name-text-content"
                class="whitespace-nowrap overflow-ellipsis overflow-hidden"
              >
                {{ market.ticker }}
              </span>

              <BaseIcon
                name="chevron"
                class="w-auto h-3 text-gray-500 ml-2 transform transition ease-in-out duration-300"
                :class="[expanded ? 'rotate-90' : '-rotate-90']"
              />
            </p>

            <p class="text-gray-500 text-xs">
              {{ market.baseToken.name }}
            </p>
          </div>

          <PartialsCommonMarketAirdrop :market="market" />
        </div>

        <div v-if="!isGrid" class="w-px h-8 border-r hidden lg:block" />

        <PartialsTradingMarketStatsPartialsLastTradedPriceAndChange
          v-if="summary"
          :market="market"
          :summary="summary"
          lg
          is-current-market
          is-stats-bar
        />
      </div>

      <PartialsTradingMarketStatsPartials
        v-if="summary"
        :market="market"
        :summary="summary"
        class="w-full lg:w-auto pb-4 lg:pb-0"
      />
    </div>
  </CommonCard>
</template>
