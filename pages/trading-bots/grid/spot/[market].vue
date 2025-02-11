<script lang="ts" setup>
import { UiSpotMarketWithToken } from '@injectivelabs/sdk-ui-ts'
import { Status, StatusType } from '@injectivelabs/utils'
import { Modal, UiMarketWithToken } from '@/types'
import { addressAndMarketSlugToSubaccountId } from '@/app/utils/helpers'

definePageMeta({
  middleware: ['markets', 'grid-strategy-subaccount']
})

const spotStore = useSpotStore()
const authZStore = useAuthZStore()
const modalStore = useModalStore()
const walletStore = useWalletStore()
const accountStore = useAccountStore()
const gridStrategyStore = useGridStrategyStore()
const { $onError } = useNuxtApp()

const filterByCurrentMarket = ref(false)
const isWelcomeBannerViewed = ref(false)
const status = reactive(new Status(StatusType.Loading))

const market = computed(() => gridStrategyStore.spotMarket)

function onLoad(pageMarket: UiMarketWithToken) {
  Promise.all([
    spotStore.streamTrades(pageMarket.marketId),
    spotStore.streamOrderbookUpdate(pageMarket.marketId)
  ]).catch($onError)

  gridStrategyStore.$patch({
    spotMarket: pageMarket as UiSpotMarketWithToken
  })

  fetchData(
    walletStore.isUserWalletConnected
      ? addressAndMarketSlugToSubaccountId(walletStore.address, pageMarket.slug)
      : undefined
  )
}

function fetchData(subaccountId?: string) {
  status.setLoading()

  Promise.all([
    authZStore.fetchGrants(),
    accountStore.streamBankBalance(),
    gridStrategyStore.fetchStrategies(),
    accountStore.fetchAccountPortfolio(),
    accountStore.streamSubaccountBalance(subaccountId)
  ])
    .catch($onError)
    .finally(() => {
      status.setIdle()

      if (
        gridStrategyStore.strategies.length === 0 &&
        !isWelcomeBannerViewed.value
      ) {
        modalStore.openModal(Modal.SgtBanner)
        isWelcomeBannerViewed.value = true
      }
    })
}
</script>

<template>
  <PartialsTradingLayout is-spot is-grid @loaded="onLoad">
    <template #trading-form>
      <PartialsGridStrategySpotForm v-if="market" :market="market" />
    </template>

    <template #orders>
      <PartialsGridStrategySpotStrategies
        v-if="market"
        v-model:filterByCurrentMarket="filterByCurrentMarket"
        v-bind="{
          market,
          status
        }"
      />
    </template>

    <template #modals>
      <ModalsSgtBanner />
    </template>
  </PartialsTradingLayout>
</template>
