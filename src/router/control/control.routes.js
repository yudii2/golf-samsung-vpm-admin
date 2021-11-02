export default [
  {
    name: "ControlDashBoard",
    path: "/admin/dashboard",
    component: () => import("@/views/control/ControlDashBoard.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    name: "DashboardMobileCommon",
    path: "/admin/dashboard/mobile",
    component: () =>
      import("@/components/control/dashboard/mobile/DashboardMobileCommon.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    name: "DashboardMobileOrderable",
    path: "/admin/dashboard/mobile/orderable",
    component: () =>
      import(
        "@/components/control/dashboard/mobile/DashboardMobileOrderable.vue"
      ),
    meta: {
      authRequired: true,
    },
  },
];
