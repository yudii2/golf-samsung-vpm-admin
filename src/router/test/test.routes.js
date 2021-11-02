export default [
  {
    name: "CaddieTest",
    path: "/test/caddie",
    component: () => import("@/views/test/caddie/CaddieTest.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    name: "RoundPhoto",
    path: "/test/roundAll-photo",
    component: () =>
      import("@/components/admin/round/roundAll/RoundAllScorePrint.vue"),
    meta: {
      authRequired: true,
    },
  },
];
