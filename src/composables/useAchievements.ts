import { ref } from 'vue'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

const achievements = ref<Achievement[]>([
  { id: 'theme_toggle', title: 'Chamäleon', description: 'Theme gewechselt', icon: '🌓', unlocked: false },
  { id: 'language_switch', title: 'Polyglot', description: 'Sprache gewechselt', icon: '🌍', unlocked: false },
  { id: 'color_change', title: 'Designer', description: 'Farbe angepasst', icon: '🎨', unlocked: false },
  { id: 'scroll_bottom', title: 'Explorer', description: 'Ganz nach unten gescrollt', icon: '🧭', unlocked: false },
  { id: 'contact_submit', title: 'Networker', description: 'Nachricht gesendet', icon: '📬', unlocked: false },
  { id: 'completionist', title: 'Completionist', description: 'Alle Achievements freigeschaltet', icon: '🏆', unlocked: false },
])

const notification = ref<Achievement | null>(null)
const showNotification = ref(false)

const loadAchievements = () => {
  const saved = localStorage.getItem('achievements')
  if (saved) {
    const parsed = JSON.parse(saved) as string[]
    achievements.value.forEach(a => {
      if (parsed.includes(a.id)) a.unlocked = true
    })
  }
}

const saveAchievements = () => {
  const unlocked = achievements.value.filter(a => a.unlocked).map(a => a.id)
  localStorage.setItem('achievements', JSON.stringify(unlocked))
}

const unlock = (id: string) => {
  const achievement = achievements.value.find(a => a.id === id)
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true
    notification.value = achievement
    showNotification.value = true
    saveAchievements()
    setTimeout(() => { showNotification.value = false }, 3000)
    
    // Check for completionist (all other achievements)
    const others = achievements.value.filter(a => a.id !== 'completionist')
    if (others.every(a => a.unlocked)) {
      const completionist = achievements.value.find(a => a.id === 'completionist')
      if (completionist && !completionist.unlocked) {
        setTimeout(() => {
          completionist.unlocked = true
          notification.value = completionist
          showNotification.value = true
          saveAchievements()
          setTimeout(() => { showNotification.value = false }, 3000)
        }, 1500)
      }
    }
  }
}

loadAchievements()

export const useAchievements = () => ({
  achievements,
  notification,
  showNotification,
  unlock,
  unlockedCount: () => achievements.value.filter(a => a.unlocked).length,
  totalCount: () => achievements.value.length
})
