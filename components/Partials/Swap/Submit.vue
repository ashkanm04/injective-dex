<script lang="ts" setup>
import { BigNumberInWei, BigNumberInBase } from '@injectivelabs/utils'
import { Modal, SwapForm, SwapFormField } from '@/types'
import { tradeErrorMessages } from '@/app/client/utils/validation/trade'

const swapStore = useSwapStore()
const modalStore = useModalStore()
const walletStore = useWalletStore()
const formValues = useFormValues<SwapForm>()
const formErrors = useFormErrors()
const { accountBalancesWithToken } = useBalance()

const props = defineProps({
  isLoading: Boolean,
  showErrorState: Boolean,

  queryError: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  submit: []
  'update:inputQuantity': []
  'update:outputQuantity': []
}>()

const END_OF_COUNTDOWN = 0

const swapTimeRemaining = ref(0)
const rateExpired = ref(false)
const countdownInterval = ref(undefined as NodeJS.Timeout | undefined)

const { inputToken, invalidInput, maximumInput } = useSwap(formValues)

const hasAmounts = computed(() => {
  return (
    new BigNumberInBase(formValues.value[SwapFormField.InputAmount] || '').gt(
      0
    ) &&
    new BigNumberInBase(formValues.value[SwapFormField.OutputAmount] || '').gt(
      0
    )
  )
})

const handlerFunction = computed(() =>
  rateExpired.value ? getResultQuantity : submit
)

const hasErrors = computed(
  () =>
    Object.keys(formErrors.value).length > 0 ||
    (swapStore.isInputEntered && invalidInput.value) ||
    insufficientBalance.value
)

const formError = computed(() => {
  const [formError] = Object.values(formErrors.value)

  return formError
})

const selectedTokenBalance = computed(() => {
  const balance = accountBalancesWithToken.value?.find(
    ({ denom }) => denom === inputToken.value?.denom
  )

  return inputToken.value
    ? new BigNumberInWei(balance?.availableMargin || '').toBase(
        inputToken.value.token.decimals
      )
    : new BigNumberInBase(0)
})

const insufficientBalance = computed(() => {
  const amount = swapStore.isInputEntered
    ? formValues.value[SwapFormField.InputAmount]
    : maximumInput.value

  if (new BigNumberInBase(amount || 0).lte(selectedTokenBalance.value)) {
    return
  }

  return tradeErrorMessages.enoughBalance()
})

function resetCountdownValues() {
  clearInterval(countdownInterval.value)
  rateExpired.value = false
  swapTimeRemaining.value = END_OF_COUNTDOWN
}

function startSwapCountdown() {
  const MAX_COUNTDOWN_IN_SECONDS = 5
  const TIMER_DECREMENT_IN_SECONDS = 1

  swapTimeRemaining.value = MAX_COUNTDOWN_IN_SECONDS
  countdownInterval.value = setInterval(() => {
    swapTimeRemaining.value -= TIMER_DECREMENT_IN_SECONDS

    if (swapTimeRemaining.value === END_OF_COUNTDOWN) {
      clearInterval(countdownInterval.value)

      rateExpired.value = true
    }
  }, 1000)
}

function submit() {
  emit('submit')
}

function getResultQuantity() {
  if (swapStore.isInputEntered) {
    return emit('update:outputQuantity')
  }

  emit('update:inputQuantity')
}

function handleConnect() {
  modalStore.openModal(Modal.Connect)
}

watch(
  [() => swapStore.outputQuantity, () => swapStore.inputQuantity],
  () => {
    resetCountdownValues()
    startSwapCountdown()
  },
  { deep: true }
)

watch(
  [
    () => formValues.value[SwapFormField.OutputAmount],
    () => formValues.value[SwapFormField.InputAmount]
  ],
  ([newInputAmount, newOutputAmount]) => {
    if (!newInputAmount || !newOutputAmount) {
      resetCountdownValues()
    }
  }
)
</script>

<template>
  <div>
    <AppButton
      v-if="!walletStore.isUserWalletConnected"
      lg
      class="w-full bg-blue-500 text-blue-900 font-semibold"
      @click="handleConnect"
    >
      {{ $t('trade.swap.connect_wallet') }}
    </AppButton>

    <AppButton
      v-else
      class="mb-2 w-full text-gray-525 text-opacity-100"
      :class="{
        'bg-blue-500 text-white ':
          swapTimeRemaining && !isLoading && !hasErrors && !queryError,
        'bg-gray-475 text-white':
          rateExpired && hasAmounts && !props.isLoading && !hasErrors
      }"
      :classes="'border border-accent-500 text-accent-500  bg-opacity-50'"
      xl
      :disabled="isLoading || !!hasErrors || !hasAmounts"
      :is-loading="isLoading"
      @click="handlerFunction"
    >
      <div class="max-auto w-full">
        <Transition name="fade">
          <span v-if="!isLoading && swapStore.isInputEntered && invalidInput">
            {{ $t('trade.swap.swapAmountTooLow') }}
          </span>

          <span v-else-if="insufficientBalance">
            {{ insufficientBalance }}
          </span>

          <span v-else-if="formError">
            {{ formError }}
          </span>

          <span v-else-if="queryError">
            {{ queryError }}
          </span>

          <span v-else-if="swapTimeRemaining">
            {{ $t('trade.swap.swapTime', { swapTimeRemaining }) }}
          </span>

          <span v-else-if="showErrorState">
            {{ $t('trade.swap.currentlyOffline') }}
          </span>

          <span
            v-else-if="rateExpired && hasAmounts"
            class="flex items-center justify-center gap-1"
          >
            <span>
              {{ $t('trade.swap.rateExpired') }}
            </span>

            <BaseIcon
              name="rotate"
              class="h-3 w-3 cursor-pointer scale-x-[-1] rotate-45"
              @click="getResultQuantity"
            />
          </span>

          <span v-else>
            {{ $t('trade.swap.enterAmount') }}
          </span>
        </Transition>
      </div>
    </AppButton>
  </div>
</template>
