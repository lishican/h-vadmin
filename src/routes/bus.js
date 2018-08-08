export default {
  routes: [
    {
      path: "/bus",
      name: "bus",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "/bus/schedule",
          name: "busSchedules",
          component: () => import("../views/module/bus/schedule/index.vue")
        },
        {
          path: "/bus/orders",
          name: "busOrders",
          component: () => import("../views/module/bus/orders/index.vue")
        },
        {
          path: "/bus/user",
          name: "busUser",
          component: () => import("../views/module/bus/user/index.vue")
        }
      ]
    }
  ]
};
