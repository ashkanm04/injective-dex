<script setup lang="ts">
import { Modal } from '@/types'

const modalStore = useModalStore()

function handleOpenModal() {
  modalStore.openModal(Modal.InstitutionalForm)
}
</script>

<template>
  <div
    class="bg-[url('/images/learn_more_bg.png')] bg-center bg-cover py-10 md:py-20"
  >
    <div class="text-center flex flex-col items-center space-y-6">
      <img src="/svg/message_cloud.svg" alt="" />
      <h2 class="text-4xl">{{ $t('institutional.learnMore') }}</h2>
      <h2 class="text-4xl">{{ $t('institutional.talkToUs') }}</h2>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md"
        @click="handleOpenModal"
      >
        {{ $t('institutional.getInTouch') }}
      </button>
    </div>
  </div>
</template>
