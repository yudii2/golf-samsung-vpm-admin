<template>
  <div id="home__container">
    <div id="services__container">
      <label>서비스</label>
      <ul class="services">
        <!-- 대시보드 모바일 (데스크탑) -->
        <li
          class="item mt-2 list__item"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_DESKTOP)"
        >
          <router-link :to="{ name: 'ControlDashBoard' }"
            >대시보드 - 데스크탑</router-link
          >
        </li>

        <!-- 대시보드 모바일 (공용) -->
        <li
          class="item mt-2 list__item"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_MOBILE)"
        >
          <router-link :to="{ name: 'DashboardMobileCommon' }"
            >대시보드 - 모바일 (공용)</router-link
          >
        </li>

        <!-- 대시보드 모바일 (식음 관리자) -->
        <li
          class="item mt-2 list__item"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE)"
        >
          <router-link :to="{ name: 'DashboardMobileOrderable' }"
            >대시보드 - 모바일 (식음관리자 전용)</router-link
          >
        </li>

        <!-- 관리자 페이지 -->
        <li
          class="item mt-2 list__item"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_ADMIN_PAGE)"
        >
          <router-link :to="{ name: 'AdminManagement' }"
            >관리자 페이지</router-link
          >
        </li>

        <!-- 사용자 설정 페이지 -->
        <li
          class="item mt-2 list__item"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_SETTING_PAGE)"
        >
          <router-link :to="{ name: 'AppSettingPage' }"
            >앱 설정 페이지</router-link
          >
        </li>

        <!-- 사용자 인증 페이지 -->
        <li class="item mt-2 list__item" v-if="accessToken && isDevMode">
          <router-link :to="{ name: 'AuthenticationPage' }"
            >[테스트] 사용자 인증 페이지</router-link
          >
        </li>

        <!-- 캐디 테스트 -->
        <li class="item mt-2 list__item" v-if="accessToken && isDevMode">
          <router-link :to="{ name: 'CaddieTest' }">[테스트] 캐디</router-link>
        </li>

        <!-- 로그인 -->
        <li class="item mt-2 list__item" v-if="!accessToken">
          <router-link :to="{ name: 'Login' }">로그인</router-link>
        </li>

        <!-- 로그아웃 -->
        <li class="item mt-2 list__item" v-if="accessToken">
          <span class="logout-button" @click="handleLogoutClick">로그아웃</span>
        </li>
      </ul>
    </div>

    <span class="app-version">{{ appVersion }}v</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import useAuth from "@/api/v1/auth/useAuth.js";
import {
  DEVELOPMENT,
  PERMISSION_KEY_DASHBOARD_ADMIN_PAGE,
  PERMISSION_KEY_DASHBOARD_DESKTOP,
  PERMISSION_KEY_DASHBOARD_MOBILE,
  PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE,
  PERMISSION_KEY_DASHBOARD_SETTING_PAGE,
} from "@/utils/constants";
import usePermission from "@/composables/usePermission";

const { clearAccessToken } = useAuth();
const { getGrantedPermission } = usePermission();

export default {
  name: "Home",

  data() {
    return {
      accessToken: null,
      isDevMode: process.env.NODE_ENV == DEVELOPMENT,
      PERMISSION_KEY_DASHBOARD_ADMIN_PAGE,
      PERMISSION_KEY_DASHBOARD_DESKTOP,
      PERMISSION_KEY_DASHBOARD_MOBILE,
      PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE,
      PERMISSION_KEY_DASHBOARD_SETTING_PAGE,
    };
  },

  computed: {
    /**
     * ### 앱 버전 텍스트.
     */
    appVersion() {
      return process.env.VUE_APP_VERSION;
    },

    /**
     * ### 권한 허용 여부 확인.
     * #### 조건
     * - 권한이 허용되어 있어야 함.
     * - 사용자 액세스 토큰을 가지고 있어야함.
     */
    hasPermission() {
      return (permissionKey) => {
        return getGrantedPermission().some((permissionObject) => {
          const [key] = Object.keys(permissionObject.permission);
          return key === permissionKey && this.accessToken;
        });
      };
    },

    ...mapGetters({
      hasOrderable: "getHasDashboardMobileOrderable",
    }),
  },

  methods: {
    init() {
      const { getAccessToken } = useAuth();
      this.accessToken = getAccessToken();
    },

    /**
     * ### 로그아웃 메소드.
     */
    handleLogoutClick() {
      clearAccessToken();
      this.$router.push({ name: "Login" });
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
#home__container {
  height: 100vh;
  padding: 100px 0;
  letter-spacing: 2px;
  overflow-y: scroll;
}
#services__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#services__container > label {
  text-transform: uppercase;
  font-size: 40px;
  margin-bottom: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item button {
  letter-spacing: 2px;
  font-weight: 100;
  background-color: rgba(0, 0, 0, 0);
}
.token_short {
  font-size: 12px;
  cursor: default;
}

/* logout start */
.logout-button {
  cursor: pointer;
}
/* logout end */

/* app version start */
.app-version {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  font-weight: 600;
}
/* app version end */
</style>
