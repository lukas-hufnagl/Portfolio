<template>
  <div id="app" class="relative">
    <InteractiveBackground />
    <AchievementNotification />
    <router-view />
    <Footer />
    <Customizer />
    <Terminal :isOpen="terminalOpen" @close="terminalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import InteractiveBackground from './components/InteractiveBackground.vue'
import AchievementNotification from './components/AchievementNotification.vue'
import Footer from './components/Footer.vue'
import Customizer from './components/Customizer.vue'
import Terminal from './components/Terminal.vue'

const terminalOpen = ref(false)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiIndex = 0

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === '`' || e.key === '~') {
    terminalOpen.value = !terminalOpen.value
  }
  
  // Konami Code Easter Egg (just for fun, no achievement)
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++
    if (konamiIndex === konamiCode.length) {
      document.body.style.animation = 'rainbow 2s linear infinite'
      setTimeout(() => document.body.style.animation = '', 5000)
      konamiIndex = 0
    }
  } else {
    konamiIndex = 0
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style>
@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
</style>
