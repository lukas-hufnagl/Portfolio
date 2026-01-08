<template>
  <section id="achievements" class="py-16 sm:py-28 lg:py-32 px-5 sm:px-6 lg:px-8 bg-white dark:bg-black">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8 sm:mb-16">
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-black dark:text-white" v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0 }">
          Achievements
        </h2>
        <p class="text-sm sm:text-lg text-gray-600 dark:text-gray-400" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }">
          {{ unlockedCount() }} von {{ totalCount() }} freigeschaltet
        </p>
      </div>

      <!-- Mobile: Horizontal scroll cards -->
      <div class="sm:hidden -mx-5 px-5 overflow-x-auto pb-4 scrollbar-hide">
        <div class="flex gap-4" style="width: max-content;">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.id"
            class="w-[200px] shrink-0 p-5 rounded-2xl border text-center"
            :class="achievement.unlocked 
              ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30' 
              : 'bg-gray-100 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 opacity-60'"
          >
            <div 
              class="text-4xl mb-3"
              :class="achievement.unlocked ? 'grayscale-0' : 'grayscale'"
            >
              {{ achievement.icon }}
            </div>
            <h3 
              class="font-semibold mb-1"
              :class="achievement.unlocked ? 'text-black dark:text-white' : 'text-gray-400'"
            >
              {{ achievement.unlocked ? achievement.title : '???' }}
            </h3>
            <p 
              class="text-sm"
              :class="achievement.unlocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'"
            >
              {{ achievement.unlocked ? achievement.description : 'Noch nicht freigeschaltet' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Desktop: Grid -->
      <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div 
          v-for="(achievement, index) in achievements" 
          :key="achievement.id"
          class="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300"
          :class="achievement.unlocked 
            ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 hover:border-primary/50' 
            : 'bg-gray-100 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 opacity-60'"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :visibleOnce="{ opacity: 1, scale: 1, transition: { delay: index * 80 } }"
        >
          <div class="flex items-center sm:items-start gap-3 sm:gap-4">
            <div 
              class="text-3xl sm:text-4xl transition-all duration-300 shrink-0"
              :class="achievement.unlocked ? 'grayscale-0' : 'grayscale'"
            >
              {{ achievement.icon }}
            </div>
            <div>
              <h3 
                class="font-semibold mb-1 transition-colors"
                :class="achievement.unlocked ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'"
              >
                {{ achievement.unlocked ? achievement.title : '???' }}
              </h3>
              <p 
                class="text-sm"
                :class="achievement.unlocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'"
              >
                {{ achievement.unlocked ? achievement.description : 'Noch nicht freigeschaltet' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll hint for mobile with arrows -->
      <div class="sm:hidden flex items-center justify-center gap-2 mt-6 text-gray-400">
        <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
        <span class="text-xs">Swipe zum Entdecken</span>
        <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>

      <div 
        class="mt-6 sm:mt-12 text-center"
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { delay: 500 } }"
      >
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
          💡 Tipp: Erkunde die Seite um alle Achievements freizuschalten!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAchievements } from '../composables/useAchievements'

const { achievements, unlockedCount, totalCount } = useAchievements()
</script>
