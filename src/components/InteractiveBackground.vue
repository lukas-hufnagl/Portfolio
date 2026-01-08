<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div 
      v-for="(particle, i) in particles" 
      :key="i"
      class="absolute rounded-full bg-primary/20 dark:bg-primary/10 blur-xl transition-all duration-1000 ease-out"
      :style="{
        width: particle.size + 'px',
        height: particle.size + 'px',
        left: particle.x + 'px',
        top: particle.y + 'px',
        transform: `translate(-50%, -50%) scale(${particle.scale})`,
        opacity: particle.opacity
      }"
    />
    <div 
      class="absolute w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-700 ease-out"
      :class="isDark ? 'bg-primary/15' : 'bg-primary/10'"
      :style="{ left: mouseX - 300 + 'px', top: mouseY - 300 + 'px' }"
    />
    <div 
      class="absolute w-[400px] h-[400px] rounded-full blur-[120px] transition-all duration-500 ease-out"
      :class="isDark ? 'bg-accent/15' : 'bg-accent/10'"
      :style="{ left: mouseX - 200 + 'px', top: mouseY - 200 + 'px' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mouseX = ref(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
const mouseY = ref(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
const isDark = ref(true)

interface Particle {
  x: number
  y: number
  size: number
  scale: number
  opacity: number
  vx: number
  vy: number
}

const particles = ref<Particle[]>([])

const initParticles = () => {
  particles.value = Array.from({ length: 6 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 300 + 100,
    scale: 1,
    opacity: Math.random() * 0.3 + 0.1,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  }))
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

let animationFrame: number

const animate = () => {
  particles.value.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < -100 || p.x > window.innerWidth + 100) p.vx *= -1
    if (p.y < -100 || p.y > window.innerHeight + 100) p.vy *= -1
  })
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  initParticles()
  window.addEventListener('mousemove', handleMouseMove)
  animate()
  isDark.value = document.documentElement.classList.contains('dark')
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrame)
})
</script>
