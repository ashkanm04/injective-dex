<script lang="ts" setup>
import { BigNumberInBase } from '@injectivelabs/utils'
import { SwapFormField } from '@/types'
import { MAX_SLIPPAGE } from '@/app/utils/constants'

const dropdownRef = ref<null | { isOpen: boolean }>(null)
const slippageList = ['0.1', '0.5', '1.0']

const isOpen = computed(() => {
  if (!dropdownRef.value) {
    return false
  }

  return dropdownRef.value?.isOpen
})

const {
  value: slippageTolerance,
  errors: slippageToleranceErrors,
  setValue: setSlippageToleranceValue
} = useStringField({
  name: SwapFormField.Slippage,
  initialValue: '0.5',
  rule: 'slippage'
})

const slippageError = computed(() => {
  if (slippageToleranceErrors.value.length === 0) {
    return undefined
  }

  return slippageToleranceErrors.value[0]
})

function checkForInvalidSlippageValue() {
  const slippageValue = new BigNumberInBase(slippageTolerance.value || 0)

  if (slippageValue.lt(0)) {
    setSlippageToleranceValue('0.5')
  }

  if (slippageValue.gt(MAX_SLIPPAGE)) {
    setSlippageToleranceValue(MAX_SLIPPAGE.toFormat(0))
  }
}
</script>

<template>
  <AppTooltip
    :triggers="[]"
    :disabled="isOpen"
    :shown="!isOpen && !!slippageError"
  >
    <BaseDropdown
      ref="dropdownRef"
      popper-class="slippage"
      placement="bottom-end"
    >
      <template #default>
        <div>
          <BaseIcon
            name="gear"
            class="h-5 w-5"
            :class="[
              slippageError
                ? 'text-orange-500 hover:opacity-80'
                : {
                    'text-blue-500 hover:opacity-80': isOpen,
                    'text-gray-500 hover:text-blue-500': !isOpen
                  }
            ]"
          />
        </div>
      </template>

      <template #content>
        <div class="p-4 bg-gray-800 text-white">
          <h3 class="text-xs font-bold uppercase tracking-widest">
            {{ $t('trade.swap.advancedSettings') }}
          </h3>
          <div class="my-4 flex items-center gap-2">
            <span class="text-xs">{{ $t('trade.swap.tolerance') }}</span>
            <AppTooltip :content="$t('trade.swap.tooltip')" />
          </div>

          <div class="flex items-center gap-2 max-xs:flex-wrap">
            <div class="flex items-center gap-2 max-xs:w-full">
              <AppSelectButton
                v-for="slippage in slippageList"
                :key="`slippage-selector-item-${slippage}`"
                v-model="slippageTolerance"
                :value="slippage"
              >
                <template #default="{ isActive }">
                  <AppButton
                    sm
                    class="w-full border-blue-500 border"
                    :class="[
                      isActive
                        ? 'bg-blue-500 text-blue-900 rounded'
                        : 'text-blue-500 rounded'
                    ]"
                  >
                    <div class="mx-auto leading-4">
                      <span class="text-base capitalize">{{ slippage }}</span>
                      <span>%</span>
                    </div>
                  </AppButton>
                </template>
              </AppSelectButton>
            </div>

            <AppInputNumeric
              v-model="slippageTolerance"
              class="ml-auto"
              input-classes="text-right"
              sm
              @blur="checkForInvalidSlippageValue"
            >
              <template v-if="slippageError" #prefix>
                <BaseIcon name="warn" class="min-w-4 text-orange-500 h-4 w-4" />
              </template>

              <template #addon>
                <span class="text-gray-500">%</span>
              </template>
            </AppInputNumeric>
          </div>

          <p v-if="slippageError" class="text-orange-500 mt-4 text-sm">
            {{ slippageError }}
          </p>
        </div>
      </template>
    </BaseDropdown>

    <template #content>
      {{ slippageError }}
    </template>
  </AppTooltip>
</template>

<style>
/*
Todo: add scoped tag once nuxt resolve webpack style loader issue
  https://github.com/nuxt/framework/issues/7194
*/

.slippage.v-popper--theme-dropdown {
  width: calc(90% - 48px);
  max-width: 400px;
}

.slippage.v-popper--theme-dropdown .v-popper__inner {
  @apply border-none bg-transparent shadow-sm;
}
</style>
