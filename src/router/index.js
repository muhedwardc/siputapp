import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from '@/store'
import Cookie from 'js-cookie'

import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

router.beforeEach((to, from, next) => {
  const user = Cookie.getJSON('_usr')

  const authRequired = to.matched.some(record => record.meta.requiresAuth)
  const dosenRoute = to.matched.some(record => record.meta.dosenRoute)
  const akademikRoute = to.matched.some(record => record.meta.akademikRoute)
  const publicRoute = to.matched.some(record => record.meta.publicRoute)
  const isLoggedIn = store.getters.isLoggedIn
  const isDosen = isLoggedIn && !!user && user.role == 2
  const isAkademik = isLoggedIn && !!user && user.role == 1

  if (authRequired && !isLoggedIn) {
    return next('/login')
  } else if (publicRoute && isLoggedIn) {
    return next(from.fullPath)
  } else if (to.fullPath === '/') {
    if (isDosen) return next('/dosen')
    else if (isAkademik) return next('/akademik')
    else return next('/login')
  } else {
    if (dosenRoute && !akademikRoute && isLoggedIn && !isDosen) {
      return next(from.fullPath)
    } else if (akademikRoute && !dosenRoute && isLoggedIn && !isAkademik) {
      return next(from.fullPath)
    }
  }
  next()
})

export default router