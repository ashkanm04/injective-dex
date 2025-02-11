<script lang="ts" setup>
import { PropType } from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import { ActivityTab } from '@/types'

defineProps({
  status: {
    type: Object as PropType<Status>,
    default: () => new Status(StatusType.Idle)
  }
})

const spotStore = useSpotStore()
const accountStore = useAccountStore()
const positionStore = usePositionStore()
const derivativeStore = useDerivativeStore()

const { t } = useLang()

const tabs = computed(() => [
  {
    label: t('activity.positions'),
    to: { name: ActivityTab.Positions },
    count: positionStore.subaccountPositionsCount
  },
  {
    label: t('activity.derivativeOrders'),
    to: { name: ActivityTab.Derivatives },
    count: derivativeStore.subaccountOrdersCount
  },
  {
    label: t('activity.spotOrders'),
    to: { name: ActivityTab.Spot },
    count: spotStore.subaccountOrdersCount
  },
  {
    label: t('activity.walletHistory'),
    to: { name: ActivityTab.WalletHistory }
  }
])

const tabsFiltered = computed(() =>
  accountStore.isSgtSubaccount
    ? tabs.value.filter(
        (tab) =>
          tab.label !== t('activity.positions') &&
          tab.label !== t('activity.derivativeOrders')
      )
    : tabs.value
)
</script>

<template>
  <div class="overflow-x-auto hide-scrollbar flex-none">
    <div class="flex lg:grid grid-cols-4 gap-4">
      <CommonCardLink
        v-for="tab in tabsFiltered"
        v-bind="{ to: tab.to, isLoading: status.isLoading() }"
        :key="`tab-${tab.label}`"
      >
        <span>{{ tab.label }}</span>

        <template v-if="tab.count" #icon>
          {{ tab.count }}
        </template>

        <template v-else #icon>
          <BaseIcon name="wallet" class="w-3 md:w-3.5 h-auto" />
        </template>
      </CommonCardLink>
    </div>
  </div>
</template>
