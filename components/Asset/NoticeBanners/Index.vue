<script setup lang="ts">
import { BANNER_NOTICE_ENABLED } from '@/app/utils/constants/setup'
import { NoticeBanner, Banner } from '@/types'

const appStore = useAppStore()

const banners: Banner[] = [
  {
    key: NoticeBanner.sheduledUpgradeMarch,
    label: `banners.banner-${NoticeBanner.sheduledUpgradeMarch}`
  }
]

const filteredBanners = computed(() =>
  banners.filter(
    (banner) => !appStore.userState.bannersViewed.includes(banner.key)
  )
)
</script>

<template>
  <div v-if="BANNER_NOTICE_ENABLED">
    <AssetNoticeBannersBanner
      v-for="banner in filteredBanners"
      :key="`banner-${banner.key}`"
      v-bind="{ noticeBanner: banner }"
    />
  </div>
</template>
