// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxt/content",
    '@nuxtjs/tailwindcss',
    'radix-vue/nuxt',
    '@element-plus/nuxt',
    '@vueuse/nuxt'],
  css: ['@/assets/styles/index.less', "github-markdown-css/github-markdown.css"],
  content: {
    highlight: {
      theme: 'github-light'
    }
  }
})
