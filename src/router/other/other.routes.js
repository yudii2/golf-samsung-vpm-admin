import Home from "@/views/Home.vue";
import NewHome from "@/views/NewHome.vue";

export default [
  {
    name: "Home",
    path: "",
    component: NewHome,
    meta: {
      authRequired: false,
    },
  },
];
