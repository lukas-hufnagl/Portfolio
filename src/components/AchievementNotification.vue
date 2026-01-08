<template>
  <Transition name="slide">
    <div v-if="showNotification && notification" class="fixed top-6 right-6 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-2xl">
      <span class="text-4xl">{{ notification.icon }}</span>
      <div>
        <p class="text-xs text-primary font-semibold uppercase tracking-wider">Achievement Unlocked!</p>
        <p class="font-bold text-black dark:text-white">{{ notification.title }}</p>
        <p class="text-sm text-gray-500">{{ notification.description }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAchievements } from '../composables/useAchievements'
const { notification, showNotification } = useAchievements()
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
