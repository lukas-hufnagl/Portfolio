<template>
  <section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-black px-4 sm:px-6 lg:px-8">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 -left-20 w-72 sm:w-96 lg:w-[500px] h-72 sm:h-96 lg:h-[500px] bg-primary/30 rounded-full blur-[100px] animate-pulse" />
      <div class="absolute bottom-1/4 -right-20 w-64 sm:w-80 lg:w-[400px] h-64 sm:h-80 lg:h-[400px] bg-accent/30 rounded-full blur-[80px] animate-pulse" style="animation-delay: 1s" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 lg:w-[600px] h-80 sm:h-96 lg:h-[600px] bg-emerald/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s" />
    </div>

    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] dark:opacity-[0.05]" />

    <div class="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-3">
      <button 
        @click="toggleTheme" 
        class="group w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm hover:scale-110 transition-all duration-300"
      >
        <svg v-if="isDark" class="w-5 h-5 sm:w-5 sm:h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
        </svg>
        <svg v-else class="w-5 h-5 sm:w-5 sm:h-5 text-gray-700 group-hover:rotate-[360deg] transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
        </svg>
      </button>
      <button 
        @click="toggleLocale" 
        class="px-3 sm:px-4 py-2 rounded-full bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm hover:scale-105 transition-all text-xs sm:text-sm font-medium text-gray-700 dark:text-white"
      >
        {{ locale === 'de' ? 'EN' : 'DE' }}
      </button>
    </div>

    <div class="relative z-10 text-center w-full max-w-5xl mx-auto pt-16 sm:pt-0">
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-3 sm:mb-4" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
        {{ t('hero.greeting') }}
      </p>

      <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 text-black dark:text-white tracking-tight px-2" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
        {{ t('hero.name') }}
      </h1>

      <div class="h-7 sm:h-10 md:h-12 mb-6 sm:mb-8 overflow-hidden" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400 } }">
        <p class="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-r from-primary via-accent to-emerald bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
          {{ typedText }}<span class="animate-blink">|</span>
        </p>
      </div>

      <p class="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }">
        {{ t('hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }">
        <a 
          href="#about" 
          class="group relative px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium overflow-hidden transition-colors duration-300"
        >
          <span class="relative z-10 group-hover:text-white transition-colors duration-300">Mehr über mich</span>
          <div class="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
        <a 
          href="#contact" 
          class="px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 dark:border-white/20 rounded-full font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-primary transition-all duration-300"
        >
          {{ t('hero.contact') }}
        </a>
      </div>

      <div class="flex justify-center gap-4 sm:gap-6 mt-12 sm:mt-16" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 800 } }">
        <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" class="p-2 sm:p-3 rounded-full text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110">
          <component :is="social.icon" class="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>
    </div>

    <a 
      href="#about" 
      class="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-all duration-500 group"
      :class="isAtTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'"
    >
      <!-- Desktop: Scroll indicator -->
      <span class="text-xs sm:text-sm hidden sm:block">Scroll</span>
      <div class="hidden sm:flex w-6 h-10 rounded-full border-2 border-current justify-center pt-2">
        <div class="w-1.5 h-3 bg-current rounded-full animate-scroll" />
      </div>
      
      <!-- Mobile: Swipe indicator with arrow -->
      <div class="sm:hidden flex flex-col items-center gap-2">
        <span class="text-xs">Swipe</span>
        <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
      
      <svg class="w-5 h-5 animate-bounce hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAchievements } from '../composables/useAchievements'

const { t, locale } = useI18n()
const { unlock } = useAchievements()
const isDark = ref(true)
const typedText = ref('')
const isAtTop = ref(true)
const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast']
let typeIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimeout: number

const IconGitHub = { render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })]) }
const IconLinkedIn = { render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' })]) }
const IconTwitter = { render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' })]) }

const socials = [
  { name: 'GitHub', icon: IconGitHub, url: 'https://github.com' },
  { name: 'LinkedIn', icon: IconLinkedIn, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: IconTwitter, url: 'https://twitter.com' }
]

const handleScroll = () => {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
  if (scrollPercent > 0.95) unlock('scroll_bottom')
  
  // Show swipe/scroll indicator only when at top
  isAtTop.value = window.scrollY < 100
}

const typeWriter = () => {
  const currentRole = roles[typeIndex]
  if (isDeleting) {
    typedText.value = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    typedText.value = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  let delay = isDeleting ? 50 : 100
  if (!isDeleting && charIndex === currentRole.length) {
    delay = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    typeIndex = (typeIndex + 1) % roles.length
    delay = 500
  }
  typeTimeout = window.setTimeout(typeWriter, delay)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  document.body.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  unlock('theme_toggle')
}

const toggleLocale = () => {
  locale.value = locale.value === 'de' ? 'en' : 'de'
  localStorage.setItem('locale', locale.value)
  unlock('language_switch')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme !== 'light'
  document.documentElement.classList.toggle('dark', isDark.value)
  document.body.classList.toggle('dark', isDark.value)
  typeWriter()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  clearTimeout(typeTimeout)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
@keyframes scroll {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(8px); opacity: 0; }
}
.animate-gradient { animation: gradient 3s ease infinite; }
.animate-blink { animation: blink 1s infinite; }
.animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
</style>
