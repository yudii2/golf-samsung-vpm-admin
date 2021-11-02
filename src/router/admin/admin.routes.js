export default [
  {
    name: "AdminManagement",
    path: "/admin/management",
    component: () => import("@/views/admin/AdminManagement.vue"),
    meta: {
      authRequired: true,
    },
  },
];
