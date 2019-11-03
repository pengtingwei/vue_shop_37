import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [{ path: '/', redirect: '/login' }, { path: '/login', component: Login }, { path: '/home', component: Home }]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果用户是访问的login这个页面 就让它访问 如果它访问不是的login  我们需要判断它是否登录 看看 token有没有 如果没有 说明它没有登录
  if (to.path === '/login') {
    next()
  } else {
    // 表示它想要访问网站后台  判断有没有token
    const tokenStr = window.sessionStorage.getItem('token')
    // 没有登录
    if (!tokenStr) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
