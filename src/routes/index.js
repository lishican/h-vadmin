import Vue from "vue";
import Router from "vue-router";

import busRouter from "./bus";
import adminRouter from "./admin";
Vue.use(Router);
const DefaultContainer = () => import("../views/container/container");
export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/home",
      name: "Home",
      component: DefaultContainer,
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("../views/module/index")
        },
        ...busRouter.routes,
        ...adminRouter.routes
      ]
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: () => import("../views/pages/404page.vue")
        },
        {
          path: "login",
          name: "Login",
          component: () => import("../views/pages/login.vue")
        }
      ]
    }
  ]
});
