export default {
  items: [
    {
      name: "home",
      path: "/home",
      icon: "123",
      title: "首页",
      wrapper: {
        element: "",
        attributes: {}
      }
    },
    {
      name: "bus",
      path: "/bus",
      icon: "123",
      title: "购票模块",
      children: [
        {
          name: "schedules",
          path: "/bus/schedule",
          icon: "123",
          title: "班次管理"
        },
        {
          name: "orders",
          path: "/bus/orders",
          icon: "123",
          title: "订单管理"
        },
        {
          name: "user",
          path: "/bus/user",
          icon: "123",
          title: "用户管理"
        }
      ]
    },
    {
      name: "admin",
      path: "/admin",
      icon: "123",
      title: "系统模块",
      children: [
        {
          name: "user",
          path: "/admin/user",
          icon: "123",
          title: "角色管理"
        },
        {
          name: "info",
          path: "/admin/info",
          icon: "123",
          title: "系统信息"
        },
        {
          name: "auth",
          path: "/admin/auth",
          icon: "123",
          title: "权限管理"
        }
      ]
    }
  ]
};
