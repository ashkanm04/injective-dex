<script setup lang="ts">
import { ZERO_IN_BASE } from '@injectivelabs/sdk-ui-ts'
import { BigNumberInBase } from '@injectivelabs/utils'
import { SpotGridTradingForm } from '@/types'

const gridStrategyStore = useGridStrategyStore()
const formValues = useFormValues<SpotGridTradingForm>()

const profitPerGrid = computed(() => {
  if (
    !formValues.value.lowerPrice ||
    !formValues.value.upperPrice ||
    !formValues.value.grids ||
    !gridStrategyStore.spotMarket ||
    Number(formValues.value.grids) === 0
  ) {
    return ZERO_IN_BASE
  }

  const priceDifference = new BigNumberInBase(formValues.value.upperPrice)
    .minus(formValues.value.lowerPrice)
    .dividedBy(formValues.value.grids)

  return priceDifference.dividedBy(formValues.value.lowerPrice).times(100)
})

const { valueToString: profitPerGridToString } = useBigNumberFormatter(
  profitPerGrid,
  { decimalPlaces: 2 }
)
</script>

<template>
  <div class="flex justify-between items-center border-b pb-2 text-gray-500">
    <div class="flex items-center space-x-2 text-xs">
      <p>{{ $t('sgt.profitGrid') }}</p>
      <AppTooltip :content="$t('sgt.gridIntervalTooltip')" />
    </div>

    <p>{{ profitPerGridToString }} %</p>
  </div>
</template>
