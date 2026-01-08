<template>
  <section id="about" class="py-16 sm:py-28 lg:py-32 px-5 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-x-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-10 sm:mb-16">
        <!-- Profile Image -->
        <div class="mb-6 sm:mb-8" v-motion :initial="{ opacity: 0, scale: 0.8 }" :visibleOnce="{ opacity: 1, scale: 1 }">
          <div class="relative inline-block">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-emerald rounded-full blur-md opacity-60"></div>
            <div class="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl bg-gradient-to-br from-primary to-accent">
              <img 
                src="/me.jpg" 
                alt="Lukas Hufnagl" 
                class="w-full h-full object-cover object-top"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
            </div>
          </div>
        </div>
        
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-black dark:text-white" v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0 }">
          {{ t('about.title') }}
        </h2>
        <p class="text-sm sm:text-lg text-gray-600 dark:text-gray-400" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }">
          {{ t('about.subtitle') }}
        </p>
      </div>

      <div class="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
        <!-- Left: About Text & Stats -->
        <div v-motion :initial="{ opacity: 0, x: -40 }" :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 200 } }">
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8">
            {{ t('about.description') }}
          </p>

          <div class="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-8">
            <div 
              v-for="(stat, index) in stats" 
              :key="stat.label" 
              class="text-center p-4 sm:p-4 rounded-2xl sm:rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
              @click="animateStat(index)"
              :class="{ 'animate-tap': activeStat === index }"
            >
              <div class="text-3xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{{ stat.value }}</div>
              <div class="text-xs sm:text-sm text-gray-500 mt-1">{{ stat.label }}</div>
            </div>
          </div>

          <!-- Interests - Interactive Tap to Highlight -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3 text-black dark:text-white">
              Interessen
            </h3>
            <!-- Mobile: 2-row grid -->
            <div class="sm:hidden grid grid-cols-3 gap-2">
              <button 
                v-for="(interest, index) in interests" 
                :key="interest"
                @click="toggleInterest(index)"
                class="px-2 py-2 rounded-full text-xs text-center transition-all duration-300 active:scale-95"
                :class="activeInterests.includes(index) 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25' 
                  : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300'"
              >
                {{ interest }}
              </button>
            </div>
            <!-- Desktop: Wrap -->
            <div class="hidden sm:flex flex-wrap gap-2">
              <button 
                v-for="(interest, index) in interests" 
                :key="interest"
                @click="toggleInterest(index)"
                class="px-3 py-1.5 rounded-full text-sm transition-all duration-300 active:scale-95"
                :class="activeInterests.includes(index) 
                  ? 'bg-gradient-to-r from-primary to-accent text-white scale-105 shadow-lg shadow-primary/25' 
                  : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'"
              >
                {{ interest }}
              </button>
            </div>
          </div>

          <a href="#" class="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform text-sm sm:text-base">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {{ t('about.downloadCV') }}
          </a>
        </div>

        <!-- Right: Skills -->
        <div class="w-full" v-motion :initial="{ opacity: 0, x: 40 }" :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 300 } }">
          <h3 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-black dark:text-white flex items-center justify-between">
            {{ t('skills.title') }}
            <span class="sm:hidden text-xs text-gray-400 font-normal flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
              </svg>
              Swipe
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </h3>
          
          <!-- Mobile: Horizontal Scroll Skills - Edge to Edge -->
          <div class="sm:hidden -mx-5 overflow-x-auto pb-4 scrollbar-hide touch-pan-x">
            <div class="inline-flex gap-3 min-w-max px-5">
              <button 
                v-for="(skill, index) in skills" 
                :key="skill.name"
                @click="toggleSkill(index)"
                class="group w-28 shrink-0 p-3 rounded-xl border transition-all duration-300 active:scale-95"
                :class="activeSkills.includes(index)
                  ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50 shadow-lg shadow-primary/10'
                  : 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'"
              >
                <div class="text-2xl mb-1.5 transition-transform duration-300" :class="{ 'scale-110': activeSkills.includes(index) }">{{ skill.icon }}</div>
                <p class="font-medium text-xs text-black dark:text-white mb-0.5 truncate">{{ skill.name }}</p>
                <p class="text-[9px] text-gray-500 truncate">{{ skill.category }}</p>
              </button>
            </div>
          </div>

          <!-- Desktop: Grid -->
          <div class="hidden sm:grid grid-cols-2 gap-3 lg:gap-4">
            <div 
              v-for="skill in skills" 
              :key="skill.name"
              class="group p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl group-hover:scale-110 transition-transform">{{ skill.icon }}</span>
                <div class="min-w-0">
                  <p class="font-medium text-base text-black dark:text-white group-hover:text-primary transition-colors truncate">{{ skill.name }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ skill.category }}</p>
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

const activeStat = ref<number | null>(null)
const activeInterests = ref<number[]>([])
const activeSkills = ref<number[]>([])

const animateStat = (index: number) => {
  activeStat.value = index
  setTimeout(() => {
    activeStat.value = null
  }, 300)
}

const toggleInterest = (index: number) => {
  if (activeInterests.value.includes(index)) {
    activeInterests.value = activeInterests.value.filter(i => i !== index)
  } else {
    activeInterests.value.push(index)
  }
}

const toggleSkill = (index: number) => {
  if (activeSkills.value.includes(index)) {
    activeSkills.value = activeSkills.value.filter(i => i !== index)
  } else {
    activeSkills.value.push(index)
  }
}

const stats = [
  { value: '3+', label: 'Jahre' },
  { value: '∞', label: 'Kaffee' },
  { value: '10+', label: 'Skills' }
]

const interests = [
  '🎮 Gaming',
  '💻 Coding',
  '🎵 Musik',
  '🏃 Fitness',
  '✈️ Reisen',
  '📚 Lernen'
]

const skills = [
  { name: 'TypeScript', icon: '📘', category: 'Language' },
  { name: 'JavaScript', icon: '🟨', category: 'Language' },
  { name: 'Vue.js', icon: '💚', category: 'Frontend' },
  { name: 'C#', icon: '🟪', category: 'Backend' },
  { name: '.NET', icon: '🟣', category: 'Framework' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Styling' },
  { name: 'MySQL', icon: '🗄️', category: 'Database' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', category: 'Cloud' },
  { name: 'GitHub', icon: '🐙', category: 'Tools' },
]
</script>
