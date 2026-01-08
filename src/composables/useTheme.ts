import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAchievements } from './useAchievements'

const isDark = ref(true)
const primaryColor = ref('#0070F3')
let isInitialized = false

export function useTheme() {
  const { locale } = useI18n()
  const { unlock } = useAchievements()

  const initTheme = () => {
    if (isInitialized) return
    
    const savedTheme = localStorage.getItem('theme')
    isDark.value = savedTheme !== 'light'
    applyTheme()
    
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale) {
      locale.value = savedLocale
    }
    
    const savedColor = localStorage.getItem('primaryColor')
    if (savedColor) {
      primaryColor.value = savedColor
      applyPrimaryColor(savedColor)
    }
    
    isInitialized = true
  }

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
    document.body.classList.toggle('dark', isDark.value)
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    unlock('theme_toggle')
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'de' ? 'en' : 'de'
    localStorage.setItem('locale', locale.value)
    unlock('language_switch')
  }

  const applyPrimaryColor = (color: string) => {
    document.documentElement.style.setProperty('--color-primary', color)
  }

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
    applyPrimaryColor(color)
    localStorage.setItem('primaryColor', color)
    unlock('color_change')
  }

  // Watch for theme changes
  watch(isDark, applyTheme)

  return {
    isDark,
    primaryColor,
    locale,
    initTheme,
    toggleTheme,
    toggleLocale,
    setPrimaryColor
  }
}
