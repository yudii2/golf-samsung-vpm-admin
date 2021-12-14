import Vue from "vue";
import VueMeta from "vue-meta";
import router from "./router";
import App from "./App";
import store from "./store";
import i18n from "./i18n";

import { DEVELOPMENT } from "@/utils/constants.js";

import CustomError from "@/error/CustomError";
import APIError from "@/error/APIError";
import NetworkError from "@/error/NetworkError";
import RouterError from "@/error/RouterError";

import BadRequestError from "@/error/BadRequestError";
import UnauthorizedError from "@/error/UnauthorizedError";
import ForbiddenError from "@/error/ForbiddenError";
import NotFoundError from "@/error/NotFoundError";
import InternalServerError from "@/error/InternalServerError";

// Css
import "@/assets/css/styles.css";
import "@/assets/css/print.css";
import "@/assets/css/common.css";
import "@/assets/css/component.css";
import "@/assets/css/module.css";
import "@/assets/css/normalize.css";
import "@/assets/css/template.css";
import "@/assets/css/courseMap.css";
import "@/assets/css/fontawesome.css"

// JS
import "@/assets/js/common.js";

// Fonts
import "@/assets/fonts/NanumSquare-Bold.css";

// configs
Vue.config.devtools = process.env.NODE_ENV === DEVELOPMENT ? true : false;
Vue.config.productionTip = false;

Vue.use(VueMeta);
// Global Vue Instance Event Bus
Vue.prototype.$EventBus = new Vue();
// Vue.mixin({});

// Error handling
Vue.config.errorHandler = (err, vm) => {
  if (
    err instanceof CustomError ||
    err instanceof NetworkError ||
    err instanceof RouterError
  ) {
    vm.$EventBus.$emit("errorMessage", err.message);
  } else if (err instanceof APIError) {
    // info message 또는 error message
    if (err.isInfoLog()) {
      vm.$EventBus.$emit("infoMessage", err.message);
    } else {
      vm.$EventBus.$emit("errorMessage", err.message);
    }

    // login페이지로 돌릴것인가?
    if (err.statusCode() === "SESSION_EXPIRED") {
      vm.$router.push("/login");
    }
  } else if (err instanceof BadRequestError) {
    vm.$EventBus.$emit("errorMessage", "잘못된 요청입니다");
  } else if (err instanceof UnauthorizedError) {
    vm.$EventBus.$emit("errorMessage", "권한이 없습니다");
  } else if (err instanceof ForbiddenError) {
    vm.$EventBus.$emit("errorMessage", "금지된 요청입니다");
  } else if (err instanceof NotFoundError) {
    vm.$EventBus.$emit(
      "errorMessage",
      "데이터가 없거나, 잘못된 URL로 호출하셨습니다"
    );
  } else if (err instanceof InternalServerError) {
    vm.$EventBus.$emit(
      "errorMessage",
      "에러가 발생하였습니다(Internal Server Error)"
    );
  } else {
    console.error(err);
    vm.$EventBus.$emit("errorMessage", "에러가 발생하였습니다");
  }
};

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
