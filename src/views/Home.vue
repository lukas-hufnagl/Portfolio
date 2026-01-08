<template>
  <div class="relative z-10">
    <Hero />
    <Suspense>
      <About />
      <template #fallback>
        <div class="min-h-screen flex items-center justify-center">
          <div class="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </template>
    </Suspense>
    <Suspense>
      <Timeline />
    </Suspense>
    <Suspense>
      <Achievements />
    </Suspense>
    <Suspense>
      <Contact />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Hero from '../components/Hero.vue'

// Lazy load components that are below the fold
const About = defineAsyncComponent(() => import('../components/About.vue'))
const Timeline = defineAsyncComponent(() => import('../components/Timeline.vue'))
const Achievements = defineAsyncComponent(() => import('../components/Achievements.vue'))
const Contact = defineAsyncComponent(() => import('../components/Contact.vue'))
</script>
