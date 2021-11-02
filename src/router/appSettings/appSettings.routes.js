export default [
  {
    name: "AppSettingPage",
    path: "/app/settings",
    component: () => import("@/views/appSettings/AppSettingPage.vue"),
    meta: {
      authRequired: true,
    },
  },
];
