<script setup lang="ts">
import { Modal } from '@/types'
import {
  spotGridMarkets,
  gridStrategyAuthorizationMessageTypes
} from '@/app/data/grid-strategy'
import { backupPromiseCall } from 'app/utils/async'

const authZStore = useAuthZStore()
const modalStore = useModalStore()
const gridStrategyStore = useGridStrategyStore()
const { $onError } = useNuxtApp()

watch(
  () => modalStore.modals[Modal.CheckSpotGridAuth],
  (isOpened) => {
    if (isOpened) {
      handleCheckAuth()
    }
  }
)

function handleCheckAuth() {
  const gridMarket = spotGridMarkets.find(
    (m) => m.slug === gridStrategyStore.spotMarket?.slug
  )

  const isAuthorized = gridStrategyAuthorizationMessageTypes.every((m) =>
    authZStore.granterGrants.some(
      (g) =>
        g.authorization.endsWith(m) && g.grantee === gridMarket?.contractAddress
    )
  )

  if (isAuthorized) {
    modalStore.closeModal(Modal.CheckSpotGridAuth)
    modalStore.openModal(Modal.CreateSpotGridStrategy)
  } else {
    handleAuthorization()
  }
}

function handleAuthorization() {
  const gridMarket = spotGridMarkets.find(
    (market) => market.slug === gridStrategyStore.spotMarket!.slug
  )

  if (!gridMarket) {
    return
  }

  authZStore
    .grantAuthorization({
      grantee: gridMarket.contractAddress,
      messageTypes: gridStrategyAuthorizationMessageTypes
    })
    .then(() => {
      modalStore.closeModal(Modal.CheckSpotGridAuth)
      modalStore.openModal(Modal.CreateSpotGridStrategy)

      backupPromiseCall(() => authZStore.fetchGrants())
    })
    .catch((e) => {
      modalStore.closeModal(Modal.CheckSpotGridAuth)
      $onError(e)
    })
}

function closeModal() {
  modalStore.closeModal(Modal.CheckSpotGridAuth)
}
</script>
<template>
  <AppModal
    key="authz-grid-spot"
    :is-open="modalStore.modals[Modal.CheckSpotGridAuth]"
    @modal:closed="closeModal"
  >
    <template #title>
      <p class="[text-transform:none] text-lg font-bold p-2">
        {{ $t('sgt.aFewClicksBeforeTheStrategyIsCreated') }}
      </p>
    </template>

    <div class="max-w-md">
      <p class="mb-6">
        {{
          $t(
            'sgt.thereAre2TransactionsRequiredToCreateAndEnableSpotGridTrading'
          )
        }}
      </p>
      <div class="flex items-start">
        <div class="p-4">
          <div
            class="w-8 h-8 rounded-full bg-blue-400 text-white grid place-items-center"
          >
            1
          </div>
        </div>
        <div>
          <p>{{ $t('sgt.letHelixSendsYouRequestForTransactions') }}</p>
          <p class="text-gray-400">{{ $t('sgt.pleaseConfirmOnYourWallet') }}</p>
        </div>
      </div>

      <div class="flex items-center">
        <div class="p-4">
          <div
            class="w-8 h-8 rounded-full bg-gray-700 text-white grid place-items-center"
          >
            2
          </div>
        </div>
        <div>
          <p>{{ $t('sgt.createYourGridTradingStrategy') }}</p>
        </div>
      </div>
    </div>
  </AppModal>
</template>
