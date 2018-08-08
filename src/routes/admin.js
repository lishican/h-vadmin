export default {
  routes: [
    {
      path: "/admin",
      name: "admin",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "/admin/user",
          name: "user",
          component: () => import("../views/module/admin/user/index.vue")
        },
        {
          path: "/admin/info",
          name: "info",
          component: () => import("../views/module/admin/info/index.vue")
        },
        {
          path: "/admin/auth",
          name: "auth",
          component: () => import("../views/module/admin/auth/index.vue")
        }
      ]
    }
  ]
};
