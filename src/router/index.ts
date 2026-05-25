import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import * as auth from '@/services/auth.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // https://router.vuejs.org/file-based-routing/
})

router.beforeEach(to => {
  const isLoggedIn = auth.isLoggedIn();
  if (to.meta.requiresAuth && !isLoggedIn) {
    return "/login";
  } else if (to.path === "/login" && isLoggedIn) {
    return "/mypage";
  } else {
    return true;
  }
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router
