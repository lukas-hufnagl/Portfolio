<template>
  <section id="projects" class="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white" v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0 }">
          {{ t('projects.title') }}
        </h2>
        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }">
          {{ t('projects.subtitle') }}
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <a 
          v-for="(project, index) in projects" 
          :key="project.key"
          :href="project.link"
          target="_blank"
          class="group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { delay: index * 80 } }"
        >
          <div class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div class="relative z-10">
            <div class="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <component :is="project.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span v-for="tag in project.tags" :key="tag" class="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {{ tag }}
              </span>
            </div>

            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-black dark:text-white group-hover:text-primary transition-colors">
              {{ t(`projects.items.${project.key}.title`) }}
            </h3>

            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed line-clamp-2">
              {{ t(`projects.items.${project.key}.description`) }}
            </p>

            <span class="inline-flex items-center gap-2 text-sm sm:text-base text-primary font-medium group-hover:gap-3 sm:group-hover:gap-4 transition-all">
              {{ t('projects.viewProject') }}
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const IconStore = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })]) }
const IconChart = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })]) }
const IconPhone = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' })]) }
const IconBrain = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' })]) }
const IconCMS = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' })]) }
const IconAPI = { render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })]) }

const projects = [
  { key: 'ecommerce', icon: IconStore, tags: ['Vue.js', 'Node.js', 'Stripe'], link: '#' },
  { key: 'dashboard', icon: IconChart, tags: ['React', 'D3.js', 'WebSocket'], link: '#' },
  { key: 'app', icon: IconPhone, tags: ['React Native', 'Firebase'], link: '#' },
  { key: 'ai', icon: IconBrain, tags: ['Python', 'TensorFlow', 'FastAPI'], link: '#' },
  { key: 'cms', icon: IconCMS, tags: ['Next.js', 'Prisma', 'PostgreSQL'], link: '#' },
  { key: 'api', icon: IconAPI, tags: ['Go', 'GraphQL', 'Redis'], link: '#' }
]
</script>
