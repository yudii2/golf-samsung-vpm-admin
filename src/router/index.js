import Vue from "vue";
import Router from "vue-router";
/**
 * utils
 */
import publicPage from "./modules/publicPage";
import ProjectService from "@/service/ProjectService";
/**
 * routes
 */
import adminRoutes from "@/router/admin/admin.routes.js";
import controlRoutes from "@/router/control/control.routes.js";
import authRoutes from "@/router/auth/auth.routes.js";
import testRoutes from "@/router/test/test.routes.js";
import otherRoutes from "@/router/other/other.routes.js";
import appSettingRoutes from "@/router/appSettings/appSettings.routes";
/**
 * hooks
 */
import useAuth from "@/api/v1/auth/useAuth";
import useWeather from "@/api/v1/monitor/useWeather";

const { getAccessToken, authorizationIsValid } = useAuth();
const { getWeather } = useWeather();
Vue.use(Router);

const router = new Router({
  base: "/",
  mode: "history",
  routes: [
    ...controlRoutes,
    ...adminRoutes,
    ...otherRoutes,
    ...testRoutes,
    ...authRoutes,
    ...appSettingRoutes,
  ],
});

router.beforeEach(async (to, from, next) => {
  to.matched.some(async (routeInfo) => {
    if (routeInfo.meta.authRequired) {
      const token = getAccessToken();
      if (!token) {
        alert("Login please..");
        next({ name: "Login" });
        return;
      }

      /**
       * 401 Unauthorized 체크를 위한 로직.
       * 날씨를 구하려고 하는게 아니라 단순히 토큰 값이 유효한지 확인하기 위함임.
       * 현재 서버에서는 토큰값의 유효성에 대한 체크 API가 없어서 일단은 이거 쓴거임.
       * 추후 그럴 확률을 적지만 토큰값의 유효성 겁사 API가 추가되면 적용하시면 됨.
       */
      const res = await getWeather();
      if (res?.status === "FAIL") {
        alert("Login please..");
        next({ name: "Login" });
        return;
      }
    }
  });

  if (!publicPage.includes(to.name)) {
    if (!ProjectService.hasSession()) {
      next({ name: "Home" });
      return;
    }
  }

  if (to.name === "Login") {
    const isValid = await authorizationIsValid();
    if (isValid) {
      next({ name: "Home" });
      return;
    }
  }

  next();
});

// Vue.config.errorHandler가 동작하지 않아서 alert 처리함
router.onError(async (error) => {
  console.error(error);
  if (error.name === "ChunkLoadError") {
    alert("새로운 프로그램이 반영되었습니다. 새로 고침하시면 정상 작동합니다");
    // throw new RouterError("새로운 프로그램이 반영되었습니다. 새로 고침하시면 정상 작동합니다");
  } else {
    alert(
      "새 페이지를 로딩하던 중에 오류가 발생하였습니다. 새로 고침해 주세요"
    );
    // throw new RouterError("새 페이지를 로딩하던 중에 오류가 발생하였습니다. 새로 고침해 주세요");
  }
});

export default router;
