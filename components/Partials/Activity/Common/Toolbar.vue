<script lang="ts" setup>
import type { Token } from '@injectivelabs/token-metadata'
import { TradeDirection, TradeExecutionType } from '@injectivelabs/sdk-ts'
import {
  BusEvents,
  ActivityField,
  ConditionalOrderType,
  ActivityForm,
  ActivityPage,
  UiMarketWithToken,
  ActivityTab
} from '@/types'

const route = useRoute()
const spotStore = useSpotStore()
const derivativeStore = useDerivativeStore()
const resetForm = useResetForm<ActivityForm>()
const { t } = useLang()

const routeName = computed(() => route.name as string)

const { value: denom } = useStringField({
  name: ActivityField.Denom,
  rule: ''
})
const { value: side } = useStringField({ name: ActivityField.Side, rule: '' })
const { value: type } = useStringField({ name: ActivityField.Type, rule: '' })

const hasActiveFilters = computed(
  () => !!denom.value || !!side.value || !!type.value
)

const isSpot = computed(
  () =>
    routeName.value.startsWith(ActivityTab.Spot) ||
    routeName.value.startsWith(ActivityTab.WalletHistory)
)

const markets = computed<UiMarketWithToken[]>(() =>
  isSpot.value ? spotStore.markets : derivativeStore.markets
)

const tokens = computed(() => {
  if (!markets.value) {
    return []
  }

  const tokens = markets.value.reduce((tokens, market) => {
    return [...tokens, market.baseToken, market.quoteToken]
  }, [] as Token[])

  const uniqueTokens = [
    ...new Map(tokens.map((token) => [token.denom, token])).values()
  ]

  return uniqueTokens
})

const showTypeField = computed(() => {
  return [
    ActivityPage.DerivativeOrderHistory,
    ActivityPage.DerivativeTradeHistory,
    ActivityPage.DerivativeTriggers,
    ActivityPage.SpotOrderHistory,
    ActivityPage.SpotTradeHistory
  ].includes(route.name as ActivityPage)
})

const showSideField = computed(
  () =>
    !routeName.value.includes(ActivityTab.WalletHistory) &&
    !routeName.value.includes(ActivityPage.FundingPayments) &&
    !routeName.value.includes(ActivityPage.SwapHistory)
)

const sideOptions = computed(() => {
  if (routeName.value.startsWith(ActivityTab.Positions)) {
    return [
      {
        display: t('trade.long'),
        value: TradeDirection.Long
      },
      {
        display: t('trade.short'),
        value: TradeDirection.Short
      }
    ]
  }

  return [
    {
      display: t('trade.buy'),
      value: TradeDirection.Buy
    },
    {
      display: t('trade.sell'),
      value: TradeDirection.Sell
    }
  ]
})

const typeOptions = computed(() => {
  let result = [
    {
      display: t('trade.limit'),
      value: `${TradeExecutionType.LimitFill}`
    },
    {
      display: t('trade.market'),
      value: `${TradeExecutionType.Market}`
    }
  ]

  if (routeName.value.startsWith(ActivityTab.Spot)) {
    return result
  }

  const derivativeTypes = [
    {
      display: `${t('trade.stopLoss')} ${t('trade.limit')}`,
      value: `${TradeExecutionType.LimitFill}-${ConditionalOrderType.StopLoss}`
    },
    {
      display: `${t('trade.stopLoss')} ${t('trade.market')}`,
      value: `${TradeExecutionType.Market}-${ConditionalOrderType.StopLoss}`
    },
    {
      display: `${t('trade.takeProfit')} ${t('trade.limit')}`,
      value: `${TradeExecutionType.LimitFill}-${ConditionalOrderType.TakeProfit}`
    },
    {
      display: `${t('trade.takeProfit')} ${t('trade.market')}`,
      value: `${TradeExecutionType.Market}-${ConditionalOrderType.TakeProfit}`
    }
  ]

  if (routeName.value.includes(ActivityPage.DerivativeTriggers)) {
    return derivativeTypes
  }

  if (
    routeName.value.includes(ActivityPage.DerivativeOrderHistory) ||
    routeName.value.includes(ActivityPage.DerivativeTradeHistory)
  ) {
    result = [...result, ...derivativeTypes]
  }

  return result
})

function handleClearFilters() {
  resetForm()
  useEventBus<string>(BusEvents.ActivityFilterUpdate).emit()
}

function handleUpdate() {
  useEventBus<string>(BusEvents.ActivityFilterUpdate).emit()
}
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between gap-4 w-full">
    <div class="grid grid-cols-4 items-center gap-4 w-full">
      <PartialsActivityCommonMarketFilter
        v-if="!routeName.includes(ActivityPage.SwapHistory)"
        v-model="denom"
        class="col-span-2 sm:col-span-1"
        :tokens="tokens"
        @update:model-value="handleUpdate"
      />

      <AppSelectField
        v-if="showTypeField"
        v-model="type"
        class="col-span-2 sm:col-span-1"
        :options="typeOptions"
        :placeholder="$t('activity.common.type')"
        clearable
        data-cy="universal-table-filter-by-type-drop-down"
        @update:model-value="handleUpdate"
      />

      <AppSelectField
        v-if="showSideField"
        v-model="side"
        class="col-span-2 sm:col-span-1"
        :options="sideOptions"
        :placeholder="$t('trade.side')"
        clearable
        data-cy="universal-table-filter-by-asset-input"
        @update:model-value="handleUpdate"
      />

      <div
        class="flex items-center justify-between gap-1 text-sm col-span-4 sm:col-span-1"
        :class="{ 'justify-self-end': !hasActiveFilters }"
      >
        <AppButton
          v-if="hasActiveFilters"
          class="border-gray-500 text-gray-500 px-3"
          sm
          @click="handleClearFilters"
        >
          <div class="items-center flex gap-1">
            <BaseIcon name="close" is-md />
            <span>{{ $t('filters.clearAll') }}</span>
          </div>
        </AppButton>

        <PartialsActivityRefreshButton @click="handleClearFilters" />
      </div>
    </div>

    <div id="activity-toolbar-action" />
  </div>
</template>
