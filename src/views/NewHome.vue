<template>
  <main id="new-home__container" ref="homeContainer">
    <div class="background-image"></div>

    <header>
      <h1>골프 삼성 관제 시스템</h1>
    </header>

    <!-- 컨덴츠 -->
    <section class="services__container">
      <ul class="services__wrapper">
        <!-- 대시보드 모바일 (데스크탑) -->
        <li
          class="service__box"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_DESKTOP)"
          @click="$router.push({ name: 'ControlDashBoard' })"
        >
          <i class="fas fa-desktop fa-3x"></i>
          <div class="service-title__wrapper">
            <span>대시보드</span>
            <span>데스크탑</span>
          </div>
        </li>

        <!-- 대시보드 모바일 (공용) -->
        <li
          class="service__box"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_MOBILE)"
          @click="$router.push({ name: 'DashboardMobileCommon' })"
        >
          <i class="fas fa-tablet-alt fa-3x"></i>

          <div class="service-title__wrapper">
            <span>대시보드</span>
            <span>모바일 (공용)</span>
          </div>
        </li>

        <!-- 대시보드 모바일 (식음 관리자) -->
        <li
          class="service__box"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE)"
          @click="$router.push({ name: 'DashboardMobileOrderable' })"
        >
          <i class="fas fa-tablet-alt fa-3x"></i>

          <div class="service-title__wrapper">
            <span>대시보드</span>
            <span>모바일 (식음관리자 전용)</span>
          </div>
        </li>

        <!-- 관리자 페이지 -->
        <li
          class="service__box"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_ADMIN_PAGE)"
          @click="$router.push({ name: 'AdminManagement' })"
        >
          <i class="fas fa-user-lock fa-3x"></i>
          <div class="service-title__wrapper">
            <span>관리자 페이지</span>
          </div>
        </li>

        <!-- 사용자 설정 페이지 -->
        <li
          class="service__box"
          v-if="hasPermission(PERMISSION_KEY_DASHBOARD_SETTING_PAGE)"
          @click="$router.push({ name: 'AppSettingPage' })"
        >
          <i class="fas fa-users-cog fa-3x"></i>
          <div class="service-title__wrapper">
            <span>앱 설정 페이지</span>
          </div>
        </li>

        <!-- 사용자 인증 페이지 -->
        <li
          class="service__box"
          v-if="accessToken && isDevMode"
          @click="$router.push({ name: 'AuthenticationPage' })"
        >
          <i class="fas fa-user-secret fa-3x"></i>
          <div class="service-title__wrapper">
            <span>사용자 인증 페이지</span>
          </div>
        </li>

        <!-- 캐디 테스트 -->
        <li
          class="service__box"
          v-if="accessToken && isDevMode"
          @click="$router.push({ name: 'CaddieTest' })"
        >
          <i class="fas fa-user-secret fa-3x"></i>
          <div class="service-title__wrapper">
            <span>캐디 조작</span>
          </div>
        </li>

        <!-- 로그인 -->
        <li
          class="service__box"
          v-if="!accessToken"
          @click="$router.push({ name: 'Login' })"
        >
          <i class="fas fa-sign-in-alt fa-3x"></i>
          <div class="service-title__wrapper">
            <span>로그인</span>
          </div>
        </li>

        <!-- 로그아웃 -->
        <li class="service__box" v-if="accessToken" @click="handleLogoutClick">
          <i class="fas fa-sign-out-alt fa-3x"></i>
          <div class="service-title__wrapper">
            <span class="logout-button">로그아웃</span>
          </div>
        </li>
      </ul>
    </section>

    <!-- 푸터 -->
    <footer>{{ appVersion }} v</footer>
  </main>
</template>

<script>
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

const { getAccessToken, clearAccessToken } = useAuth();
const { getGrantedPermission } = usePermission();

export default {
  name: "newHome",

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
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      this.accessToken = getAccessToken();
    },

    handleLoginClick() {
      this.$router.push({ name: "Login" });
    },

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
* {
  box-sizing: border-box;
}

#new-home__container {
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  padding: 50px 0;
  letter-spacing: 1.5px;
  display: grid;
  grid-template-rows: repeat(30, 1fr);
}

.background-image {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/images/others/home-bg.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
}

header {
  position: relative;
  grid-row: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1 {
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: default;
}

header h1:hover {
  transform: scale(1.1);
}

.services__container {
  position: relative;
  grid-row: 2/30;
  overflow-y: auto;
  padding: 16px;
}
.services__wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 16px;
}
.service__box {
  padding: 20px;
  border: 1px solid var(--primary);
  border-radius: 6px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.service__box:hover {
  transform: scale(1.05);
  border: 1px solid var(--secondary);
  background-color: var(--deep-green);
}
.service-title__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.service__box i {
  color: var(--secondary);
}

.service-title__wrapper span:first-child {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--secondary);
}
.service-title__wrapper span {
  margin-top: 8px;
  color: var(--placeholder);
}

footer {
  grid-row: 30/31;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

/* media start */
@media screen and (min-width: 800px) {
  .services__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1300px) {
  .services__wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1800px) {
  .services__wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}
/* media end */
</style>
