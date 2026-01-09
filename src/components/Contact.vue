<template>
  <section id="contact" class="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0A0A0F]">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-10 sm:mb-12 lg:mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white" v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0 }">
          {{ t('contact.title') }}
        </h2>
        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto" v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 } }">
          {{ t('contact.description') }}
        </p>
      </div>

      <form ref="contactForm" @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6" v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 } }">
        <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label for="name" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{{ t('contact.name') }}</label>
            <input 
              id="name"
              v-model="form.name"
              name="name"
              type="text" 
              required
              :placeholder="t('contact.name_placeholder')"
              class="w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-black dark:text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{{ t('contact.email') }}</label>
            <input 
              id="email"
              v-model="form.email"
              name="email"
              type="email" 
              required
              :placeholder="t('contact.email_placeholder')"
              class="w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-black dark:text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <label for="message" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{{ t('contact.message') }}</label>
          <textarea 
            id="message"
            v-model="form.message"
            name="message"
            rows="5" 
            required
            :placeholder="t('contact.message_placeholder')"
            class="w-full px-4 py-3 sm:py-3.5 rounded-xl border bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-black dark:text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm sm:text-base"
          />
        </div>

        <button 
          type="submit"
          :disabled="submitted"
          class="group relative w-full py-3.5 sm:py-4 rounded-xl font-medium overflow-hidden transition-all duration-300 text-sm sm:text-base"
          :class="submitted ? 'bg-emerald text-white' : 'bg-black dark:bg-white text-white dark:text-black hover:shadow-xl hover:shadow-primary/20'"
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            <svg v-if="submitted" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            {{ submitted ? t('contact.success') : t('contact.send') }}
          </span>
          <div v-if="!submitted" class="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </form>

      <div class="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-gray-200 dark:border-zinc-800">
        <p class="text-center text-sm text-gray-500 mb-4">{{ t('contact.or_reach_out') }}</p>
        <div class="flex justify-center gap-3 sm:gap-4">
          <a href="mailto:hello@lukashufnagl.com" class="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all text-xs sm:text-sm font-medium">
            <span>📧</span><span>Email</span>
          </a>
          <a href="https://linkedin.com" target="_blank" class="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all text-xs sm:text-sm font-medium">
            <span>💼</span><span>LinkedIn</span>
          </a>
          <a href="https://github.com" target="_blank" class="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all text-xs sm:text-sm font-medium">
            <span>🐙</span><span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import emailjs from 'emailjs-com'
import confetti from 'canvas-confetti'
import { useAchievements } from '../composables/useAchievements'

const { t } = useI18n()
const { unlock } = useAchievements()
const submitted = ref(false)

const form = reactive({ name: '', email: '', message: '' })
const contactForm = ref<HTMLFormElement | null>(null)

const SERVICE_ID = 'service_j44kf5i'
const TEMPLATE_ID = 'template_3vrepia'
const PUBLIC_KEY = 'h5zRuoreelkZ23fS_'

const handleSubmit = () => {
  submitted.value = true
  if (!contactForm.value) return
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm.value, PUBLIC_KEY)
    .then(() => {
      unlock('contact_submit')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0070F3', '#7928CA', '#10B981']
      })
      setTimeout(() => {
        submitted.value = false
        form.name = ''
        form.email = ''
        form.message = ''
      }, 3000)
    })
    .catch(() => {
      submitted.value = false
      // Optional: show error message
    })
}
</script>
