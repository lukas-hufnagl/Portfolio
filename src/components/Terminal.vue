<template>
  <div 
    class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-green-500"
    :class="{ 'pointer-events-none opacity-0': !isOpen, 'opacity-100': isOpen }"
    style="transition: opacity 0.3s"
  >
    <div class="w-full max-w-2xl p-6">
      <div class="mb-4 text-sm opacity-70">
        <p>Lukas Hufnagl Terminal v1.0.0</p>
        <p>Type 'help' for available commands</p>
      </div>

      <div ref="outputRef" class="h-64 overflow-y-auto mb-4 text-sm">
        <div v-for="(line, i) in output" :key="i" v-html="line" />
      </div>

      <div class="flex items-center gap-2">
        <span class="text-primary">→</span>
        <input
          ref="inputRef"
          v-model="input"
          @keydown.enter="executeCommand"
          class="flex-1 bg-transparent outline-none text-green-400"
          placeholder="Enter command..."
          autofocus
        />
      </div>
    </div>

    <p class="absolute bottom-4 text-xs opacity-50">Press ESC to exit</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])

const input = ref('')
const output = ref<string[]>([])
const inputRef = ref<HTMLInputElement>()
const outputRef = ref<HTMLDivElement>()

const commands: Record<string, () => string> = {
  help: () => `
<span class="text-yellow-400">Available commands:</span>
  <span class="text-primary">about</span>     - About me
  <span class="text-primary">skills</span>    - My tech stack
  <span class="text-primary">contact</span>   - Get in touch
  <span class="text-primary">secret</span>    - ???
  <span class="text-primary">matrix</span>    - Enter the matrix
  <span class="text-primary">clear</span>     - Clear terminal
  <span class="text-primary">exit</span>      - Close terminal
`,
  about: () => `
<span class="text-yellow-400">Lukas Hufnagl</span>
Full-Stack Developer from Austria 🇦🇹
Passionate about clean code & great UX.
`,
  skills: () => `
<span class="text-yellow-400">Tech Stack:</span>
Frontend: <span class="text-primary">Vue.js, React, TypeScript</span>
Backend:  <span class="text-primary">Node.js, Python, Go</span>
Database: <span class="text-primary">PostgreSQL, MongoDB, Redis</span>
DevOps:   <span class="text-primary">Docker, AWS, Vercel</span>
`,
  contact: () => `
<span class="text-yellow-400">Let's connect!</span>
Email:    <span class="text-primary">hello@lukashufnagl.dev</span>
GitHub:   <span class="text-primary">github.com/lukashufnagl</span>
LinkedIn: <span class="text-primary">linkedin.com/in/lukashufnagl</span>
`,
  secret: () => `
<span class="text-pink-500">🎉 You found the secret!</span>
<span class="text-yellow-400">Konami Code: ↑↑↓↓←→←→BA</span>
Try it on the main page for a surprise...
`,
  matrix: () => {
    document.body.classList.add('matrix-mode')
    setTimeout(() => document.body.classList.remove('matrix-mode'), 5000)
    return '<span class="text-green-400">Wake up, Neo...</span>'
  },
  clear: () => {
    output.value = []
    return ''
  },
  exit: () => {
    emit('close')
    return 'Goodbye! 👋'
  }
}

const executeCommand = () => {
  const cmd = input.value.trim().toLowerCase()
  output.value.push(`<span class="text-primary">→</span> ${input.value}`)
  
  if (cmd in commands) {
    const result = commands[cmd]()
    if (result) output.value.push(result)
  } else if (cmd) {
    output.value.push(`<span class="text-red-400">Command not found: ${cmd}</span>`)
  }
  
  input.value = ''
  nextTick(() => {
    if (outputRef.value) outputRef.value.scrollTop = outputRef.value.scrollHeight
  })
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

watch(() => props.isOpen, (open) => {
  if (open) nextTick(() => inputRef.value?.focus())
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style>
.matrix-mode {
  animation: matrix 0.1s infinite;
}
@keyframes matrix {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
</style>
