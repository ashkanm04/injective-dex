<script setup lang="ts">
import { UiSpotMarketWithToken } from '@injectivelabs/sdk-ui-ts'

const props = defineProps({
  market: {
    type: Object as PropType<UiSpotMarketWithToken>,
    required: true
  }
})

const walletStore = useWalletStore()

watch(
  () => walletStore.isUserWalletConnected,
  (isConnected) => {
    if (!isConnected) {
      navigateTo(`/auctions/${props.market.slug}/?showAuctions=true`)
    }
  }
)
</script>

<template>
  <div>
    <PartialsAuctionsMyBids
      v-if="walletStore.isUserWalletConnected"
      v-bind="{ market }"
    />
    <div v-else class="text-center">Please Connect Your Wallet</div>
  </div>
</template>
