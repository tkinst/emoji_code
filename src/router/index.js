import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Display from '../views/Display.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'EmojiCode',
      metaTags: [
        {
          name: 'description',
          content: 'EmojiCode Translator'
        },
        {
          property: 'og:description',
          content: 'EmojiCode Translator'
        }
      ]
    }
  },
  {
    path: '/view/',
    name: 'Viewer',
    component: Display
  }
]

const router = new VueRouter({
  routes
})

export default router
