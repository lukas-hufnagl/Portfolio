<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-netflix-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'">
    <nav class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="#" class="text-2xl font-bold text-netflix-red hover:scale-105 transition-transform">
          Portfolio
        </a>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center gap-8">
          <li><a href="#" class="text-white hover:text-netflix-red transition-colors font-medium">Home</a></li>
          <li><a href="#about" class="text-white hover:text-netflix-red transition-colors font-medium">About</a></li>
          <li><a href="#projects" class="text-white hover:text-netflix-red transition-colors font-medium">Projects</a></li>
          <li><a href="#contact" class="px-6 py-2 bg-netflix-red text-white rounded-md hover:bg-red-600 transition-colors font-semibold">Contact</a></li>
        </ul>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-white p-2 hover:text-netflix-red transition-colors"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 pb-4 space-y-4 animate-slide-up"
      >
        <a href="#" @click="mobileMenuOpen = false" class="block text-white hover:text-netflix-red transition-colors font-medium">Home</a>
        <a href="#about" @click="mobileMenuOpen = false" class="block text-white hover:text-netflix-red transition-colors font-medium">About</a>
        <a href="#projects" @click="mobileMenuOpen = false" class="block text-white hover:text-netflix-red transition-colors font-medium">Projects</a>
        <a href="#contact" @click="mobileMenuOpen = false" class="block text-center px-6 py-2 bg-netflix-red text-white rounded-md hover:bg-red-600 transition-colors font-semibold">Contact</a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      scrolled: false,
      mobileMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    }
  }
};
</script>

<style scoped>
/* Additional styles */
</style>
