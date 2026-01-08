<template>
  <div class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3">
    <div 
      v-if="showPanel"
      class="p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300"
      :class="isDark ? 'bg-zinc-900/90 border-zinc-700' : 'bg-white/90 border-gray-200'"
    >
      <p class="text-sm font-medium mb-3" :class="isDark ? 'text-white' : 'text-black'">
        {{ t('settings.accent') }}
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in colors"
          :key="color.name"
          @click="setAccentColor(color)"
          class="w-8 h-8 rounded-full transition-transform hover:scale-110 ring-2 ring-offset-2"
          :class="activeColor === color.name ? 'ring-white scale-110' : 'ring-transparent'"
          :style="{ background: color.value }"
          :title="color.name"
        />
      </div>
    </div>

    <button
      @click="showPanel = !showPanel"
      class="self-end w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      :class="isDark ? 'bg-zinc-800 text-white' : 'bg-white text-black border border-gray-200'"
    >
      <span class="text-lg sm:text-xl">{{ showPanel ? '✕' : '🎨' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAchievements } from '../composables/useAchievements'

const { t } = useI18n()
const { unlock } = useAchievements()

const showPanel = ref(false)
const isDark = ref(true)
const activeColor = ref('Blue')

interface Color {
  name: string
  value: string
  accent: string
}

const colors: Color[] = [
  { name: 'Blue', value: '#0070F3', accent: '#7928CA' },
  { name: 'Emerald', value: '#10B981', accent: '#34D399' },
  { name: 'Rose', value: '#F43F5E', accent: '#FB7185' },
  { name: 'Amber', value: '#F59E0B', accent: '#FBBF24' },
  { name: 'Violet', value: '#8B5CF6', accent: '#A78BFA' },
  { name: 'Cyan', value: '#06B6D4', accent: '#22D3EE' },
]

const setAccentColor = (color: Color) => {
  activeColor.value = color.name
  document.documentElement.style.setProperty('--color-primary', color.value)
  document.documentElement.style.setProperty('--color-accent', color.accent)
  localStorage.setItem('accentColor', JSON.stringify(color))
  unlock('color_change')
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  
  const savedColor = localStorage.getItem('accentColor')
  if (savedColor) {
    const color = JSON.parse(savedColor)
    activeColor.value = color.name
    document.documentElement.style.setProperty('--color-primary', color.value)
    document.documentElement.style.setProperty('--color-accent', color.accent)
  }

  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
</script>
