export default [
  {
    name: "Login",
    path: "/auth/login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    name: "AuthenticationPage",
    path: "/auth",
    component: () => import("@/views/auth/AuthenticationPage.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    name: "Authentication",
    path: "/auth/me",
    component: () => import("@/views/auth/Authentication.vue"),
    meta: {
      authRequired: true,
    },
  },
];
