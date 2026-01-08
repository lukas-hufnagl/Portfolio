<template>
  <section id="timeline" class="py-16 sm:py-28 lg:py-32 px-5 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10 sm:mb-16 lg:mb-20">
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-black dark:text-white" v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0 }">
          {{ t('timeline.title') }}
        </h2>
        <p class="text-sm sm:text-lg text-gray-600 dark:text-gray-400" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }">
          {{ t('timeline.subtitle') }}
        </p>
      </div>

      <div class="relative">
        <div class="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-emerald sm:-translate-x-1/2" />

        <div class="space-y-6 sm:space-y-12 lg:space-y-16">
          <div 
            v-for="(item, index) in timelineItems" 
            :key="item.key"
            class="relative pl-10 sm:pl-0"
            v-motion
            :initial="{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
          >
            <div 
              class="absolute left-0 sm:left-1/2 top-0 sm:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 cursor-pointer transition-transform duration-300"
              :class="{ 'scale-125': expandedItem === index }"
              @click="toggleItem(index)"
            >
              <div class="w-3 h-3 rounded-full bg-white transition-transform duration-300" :class="{ 'scale-0': expandedItem === index }" />
              <svg v-if="expandedItem === index" class="w-4 h-4 text-white absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div :class="['sm:w-[calc(50%-2rem)]', index % 2 === 0 ? 'sm:mr-auto sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8']">
              <div 
                class="p-5 sm:p-6 rounded-2xl sm:rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all duration-300 shadow-sm cursor-pointer sm:cursor-default"
                :class="{ 'border-primary/50 shadow-lg shadow-primary/10': expandedItem === index }"
                @click="toggleItem(index)"
              >
                <span class="inline-block px-3 py-1.5 mb-3 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary">
                  {{ t(`timeline.items.${item.key}.period`) }}
                </span>
                <h3 class="text-base sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-1">
                  {{ t(`timeline.items.${item.key}.title`) }}
                </h3>
                <p class="text-primary font-medium mb-2 sm:mb-3 text-sm">
                  {{ t(`timeline.items.${item.key}.company`) }}
                </p>
                <p 
                  class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-300 overflow-hidden"
                  :class="expandedItem === index ? 'max-h-40' : 'max-h-12 sm:max-h-none line-clamp-2 sm:line-clamp-none'"
                >
                  {{ t(`timeline.items.${item.key}.description`) }}
                </p>
                
                <!-- Expand indicator for mobile -->
                <div 
                  v-if="expandedItem !== index" 
                  class="sm:hidden mt-2 text-xs text-gray-400 flex items-center gap-1"
                >
                  <span>Mehr anzeigen</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div 
                  v-else 
                  class="sm:hidden mt-2 text-xs text-primary flex items-center gap-1"
                >
                  <span>Weniger anzeigen</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()
const expandedItem = ref<number | null>(null)

const toggleItem = (index: number) => {
  if (expandedItem.value === index) {
    expandedItem.value = null
  } else {
    expandedItem.value = index
  }
}

const timelineItems = [
  { key: 'abb' },
  { key: 'aski' },
  { key: 'htl' }
]
</script>
