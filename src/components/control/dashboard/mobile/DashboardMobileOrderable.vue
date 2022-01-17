<template>
  <main id="dashboard_mobile__container" @click="handleContainerClick">
    <header class="header">
      <!-- 10T 대기 캐디 명단 -->
      <SecondHalfWaitHorizontal/>
    </header>

    <!-- dashboard -->
    <Dashboard class="_dashboard__container"/>

    <!-- side navigation layout -->
    <DashboardMobileSideNavigation
      :storeGroups="storeGroups"
      :selectedStoreType="selectedStoreType"
      @onStoreGroupClick="setSelectedStoreType"
      ref="sideNavigationContainer"
    />

    <!-- 뒤로가기 -->
    <CircleFav
      class="fav-button-third"
      icon="back"
      @onClick="handleBackClick"
    />

    <!-- 네비게이션 -->
    <CircleFav
      class="fav-button-second"
      ref="fabContainer"
      @onClick="handleFabClick"
    />

    <!-- 주문 목록 -->
    <CircleFav
      class="fab-button-orders"
      @onClick="handleOpenOrderClick"
      icon="orders"
    />

    <CaddieViewTypeButton class="caddie-view-type-button"/>
  </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CircleFav from "@/components/shared/CircleFav.vue";
import Dashboard from "@/components/control/dashboard/body/Dashboard.vue";
import DashboardMobileSideNavigation from "@/components/control/dashboard/mobile/DashboardMobileSideNavigation.vue";
import useRestaurant from "@/api/v1/monitor/useRestaurant.js";
import useCaddie from "@/api/v1/monitor/useCaddie";
import {DEVELOPMENT} from "@/utils/constants";
import useAuth from "@/api/v1/auth/useAuth";
import TimeUtil from "@/utils/datetime/TimeUtil";
import SecondHalfWaitHorizontal from "./SecondHalfWaitHorizontal.vue";
import CaddieViewTypeButton from "../modal/CaddieViewTypeButton.vue";

const {getStoreGroup} = useRestaurant();
const {getCaddies} = useCaddie();
const {authenticationIsValid} = useAuth();
const {getOrderInfo} = useRestaurant();
export default {
  name: "DashboardMobileOrderable",
  components: {
    SecondHalfWaitHorizontal,
    Dashboard,
    DashboardMobileSideNavigation,
    CaddieViewTypeButton,
    CircleFav,
  },
  data() {
    return {
      storeGroups: [],
      newOrderCount: -1,
      refreshTimer: null,
      sideNavIsOpened: false,
      isDevMode: process.env.NODE_ENV === DEVELOPMENT,
      hasProblem: false,
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.autoRefreshModeStop();

    // 주문 목록 모달 끔.
    this.setIsShowingOrderMessageModal(false);

    // 캐디 찾기 모달 끔.
    this.setIsShowingCaddieSearchModal(false);
  },
  computed: {
    ...mapGetters({
      isShowingDashboardStoreModal: "getIsShowingDashboardStoreModal",
    }),
    ...mapGetters("control/", {
      isRefresh: "getIsRefreshing",
      isAutoRefreshMode: "getAutoRefreshMode",
      selectedStoreType: "getSelectedStoreType",
    }),
  },
  methods: {
    /**
     * ### 캐디 검색 모달 띄우기
     */
    handleSearchClick() {
      this.setIsShowingCaddieSearchModal(true);
    },
    handleBackClick() {
      this.$router.go(-1);
    },
    handleCaddieNameMouseOver(e) {
      const elem = e.target.nextElementSibling;
      elem.classList.add("shown");
    },
    handleCaddieNameMouseLeave(e) {
      const elem = e.target.nextElementSibling;
      elem.classList.remove("shown");
    },

    /**
     * ### 주문 현황 모달창 보이기.
     */
    handleOpenOrderClick() {
      this.setDashboardStoreModal(true);
    },

    /**
     * ### 컴포넌트 초기화 메소드.
     */
    init() {
      this.initAutoRefreshMode();
    },

    /**
     * ### 데이터 자동 새로고침 모드(Mode) 초기화 메소드.
     */
    initAutoRefreshMode() {
      // if (this.isDevMode) {
      //   this.requests();
      //   return;
      // }

      if (!this.isAutoRefreshMode) {
        this.toggleAutoRefreshMode();
      } else {
        this.requests();
        this.autoRefreshModeStart();
      }
    },

    /**
     * ### 화면 데이터 새로고침.
     */
    async requests() {
      // 유효하지 않으면 다음 메소드 실행.
      const beforeMove = () => {
        if (this.navIsOpened()) {
          this.toggleSideNavigationLayout();
        }
        this.hasProblem = true;
      };

      // 사용자 인증 정보가 유효하면 진행.
      const isValid = await authenticationIsValid(beforeMove);
      if (isValid) {
        // 매장 그룹군 목록 조회.
        const {storeList} = await getStoreGroup();
        this.storeGroups = storeList;

        // 새로운 주문 갯수 조회.
        const {
          data: {newOrderCnt},
        } = await getCaddies(this.selectedStoreType);

        const data = await getOrderInfo(this.selectedStoreType)
        this.newOrderCount = newOrderCnt;
        this.setOrderList(data);
      }
    },

    /**
     * ### 좌측 네비게이션 레이아웃을 On/Off 토글링하는 메소드.
     */
    toggleSideNavigationLayout() {
      try {
        const sideNavigationContainer = this.getNavContainerElement();
        const fabContainer = this.getFabContainerElement();
        switch (this.navIsOpened()) {
          // 네비게이션 레이아웃이 보여져 있는 경우, 닫는다.
          case true:
            sideNavigationContainer.classList.remove("is-opened");
            fabContainer.classList.remove("is-opened");
            break;
          // 네비게이션 레이아웃이 숨겨져 있는 경우, 연다.
          case false:
            sideNavigationContainer.classList.add("is-opened");
            fabContainer.classList.add("is-opened");
            break;
        }
      } catch (e) {
        console.error(e.message);
      }
    },

    /**
     * ### 사이드 네비게이션의 HTML 엘리먼트를 가져옴.
     */
    getNavContainerElement() {
      return this.$refs.sideNavigationContainer?.$el;
    },

    /**
     * ### 플로팅 액션 버튼의 HTML 엘리먼트를 가져옴.
     */
    getFabContainerElement() {
      return this.$refs.fabContainer?.$el;
    },

    /**
     * ### 현재 사이드 네비게이션 레이아웃의 On/Off 상태 여부를 확인.
     */
    navIsOpened() {
      const navContainer = this.getNavContainerElement();
      if (navContainer) {
        return navContainer.classList.contains("is-opened");
      }
      return null;
    },

    /**
     * ### 레이아웃 클릭 이벤트 메소드.
     */
    handleContainerClick() {
      this.closeSideNavigationLayout();
    },

    /**
     * ### 좌측 네비게이션 레이아웃 닫는다.
     */
    closeSideNavigationLayout() {
      if (this.navIsOpened()) {
        this.toggleSideNavigationLayout();
      }
    },

    /**
     * ### 플로팅 작업 버튼 클릭 발생 이벤트 메소드.
     */
    handleFabClick() {
      this.toggleSideNavigationLayout();
    },

    /**
     * ### 데이터 자동 새로고침 모드 킴.
     */
    autoRefreshModeStart() {
      if (!this.refreshTimer) {
        this.refreshTimer = setInterval(() => {
          this.requests();

          // 주몬 목록 모달이 켜져 있지 않는 경우, 아무것도 하지 못하게 주문 목록 메시지 계속 띄워서 괴롭힐거임.
          if (!this.isShowingDashboardStoreModal && this.newOrderCount > 0) {
            this.setIsShowingOrderMessageModal(true);
          }
        }, Number(process.env.VUE_APP_REFRESH_TIME));
      }
    },

    /**
     * ### 데이터 자동 새로고침 모드 끔.
     */
    autoRefreshModeStop() {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    },

    ...mapActions({
      setDashboardStoreModal: "updateDashboardStoreModal",
      setIsShowingCaddieSearchModal: "updateIsShowingCaddieSearchModal",
      setIsShowingOrderMessageModal: "updateIsShowingOrderMessageModal",
    }),
    ...mapActions("control/", {
      toggleAutoRefreshMode: "toggleAutoRefreshMode",
      setSelectedStoreType: "updateSelectedStoreType",
      updateIsRefreshing: "updateIsRefreshing",
      setOrderList: "setOrderList",
    }),
  },
  watch: {
    /**
     * ### 데이터 자동 새로고침 모드 감지.
     * @param {boolean} status > true 자동 새로고침 모드 킴, false : 자동 새로고침 모드 끔.
     */
    isAutoRefreshMode(status) {
      if (status) {
        this.requests();
        this.autoRefreshModeStart();
      } else {
        this.autoRefreshModeStop();
      }
    },

    /**
     * ### 새로운 주문이 있는 경우.
     * @param {(number|string)} currentCount > 새로운 주문이 있는 경우 토스트 메시지.
     */
    newOrderCount(currentCount) {
      if (currentCount > 0) {
        // 주몬 목록 모달이 켜져 있지 않는 경우, 아무것도 하지 못하게 주문 목록 메시지 띄움.
        if (!this.isShowingDashboardStoreModal) {
          this.setIsShowingOrderMessageModal(true);
        }
      } else {
        this.setIsShowingOrderMessageModal(false);
      }
    },
  },

  filters: {
    /**
     * ### 파싱된 예약시간.
     * @param {string} value > 'hh:mm:ss' 형식의 데이터.
     * @returns {string} 'hh:mm' 형식의 데이터.
     */
    filteredBookgTime(value) {
      const removeColon = value.replaceAll(":", "");
      const parsedTime = TimeUtil.parse(removeColon);
      const hours = String(parsedTime.getHours()).padStart(2, "0");
      const minutes = String(parsedTime.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
#dashboard_mobile__container {
  position: relative;
  height: 100vh;
  overflow: scroll;
}

/* header start */
.header {
  margin: 10px;
  height: 100px;
  display: flex;
  align-items: center;
}

/* header start */

._dashboard__container {
  height: calc(100vh - 140px) !important;
}

.fab-button-orders {
  left: 20px;
  bottom: 20px;
}

.fav-button-second {
  right: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
}

.fav-button-third {
  right: 20px;
  top: 90px;
  width: 50px;
  height: 50px;
}

/* second half wait start */
.second-half-wait-horizontal__container {
  background-color: tomato;
}

/* second half wait end */

/* caddie view type button start */
.caddie-view-type-button {
  bottom: 120px;
  left: 20px;
}

/* caddie view type button end */
</style>
