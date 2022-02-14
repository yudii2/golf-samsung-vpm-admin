<template>
  <article
    id="dashboard__container"
    :class="isMobileMode ? 'dashboard-is-mobile' : 'dashboard-is-normal'"
  >
    <!-- courses -->
    <section class="course_info">
      <CourseTitles :courses="courses"/>
    </section>

    <!-- holes -->
    <section class="hole_info">
      <HoleTitles :courses="courses"/>
    </section>

    <!-- modal -->
    <CaddieSettingModal
      v-if="!isMobileMode"
      :isMiniMode="isMiniMode"
      ref="caddieSettingModalRef"
    />
  </article>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import useData from "@/api/v1/monitor/useData";
import CaddieSettingModal from "@/components/control/dashboard/modal/CaddieSettingModal.vue";
import CourseTitles from "@/components/control/dashboard/body/CourseTitles.vue";
import HoleTitles from "@/components/control/dashboard/body/HoleTitles.vue";

const {init, initForDashboard} = useData();

export default {
  name: "Dashboard",
  components: {
    CaddieSettingModal,
    CourseTitles,
    HoleTitles,
  },

  data() {
    return {
      refreshTimer: null,
    };
  },

  computed: {
    courses() {
      return this.alwaysHasCourses;
    },

    headerHoles() {
      let result = [];
      if (this.courses.length) {
        const firstCourse = this.courses[0];
        const hasHoles = Object.prototype.hasOwnProperty.call(
          firstCourse,
          "holes"
        );
        if (hasHoles) {
          result = firstCourse.holes.map((hole) => {
            return {
              code: hole.holeCd,
              name: hole.holeNm,
            };
          });
        }
      }
      return result;
    },

    /**
     * ### 현재 페이지에 대한 모바일 모드 여부.
     */
    isMobileMode() {
      const isMobile =
        this.$route.name === "DashboardMobileCommon" ||
        this.$route.name === "DashboardMobileOrderable";
      return isMobile ? true : false;
    },

    ...mapGetters({
      isDevMode: "getIsDevMode",
    }),
    ...mapGetters("control/", {
      company: "getCompany",
      alwaysHasCourses: "getAlwaysHasCourses",
      tempCourses: "currentTempCourses",
      caddies: "currentCaddies",
      currentSelectedCaddieByChip: "getSelectedCaddieByChip",
      currentSelectedCaddie: "getSelectedCaddie",
      isMiniMode: "getIsMiniMode",
      isAutoRefreshMode: "getAutoRefreshMode",
    }),
  },

  methods: {
    /**
     * ### 컴포넌트 초기화 메소드.
     */
    init() {
      if (!this.isAutoRefreshMode && !this.isDevMode) {
        this.toggleAutoRefreshMode();
      }

      if (this.isDevMode) {
        this.requests();
      }
    },

    autoRefreshModeStart() {
      this.refreshTimer = setInterval(() => {
        this.requests();
      }, Number(process.env.VUE_APP_REFRESH_TIME));
    },
    autoRefreshModeStop() {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
      this.clearAutoRefreshMode();
    },

    handleFlagIconClick() {
      if (this.isMobileMode) {
        this.$router.push({name: "Home"});
      }
    },

    async requests() {
      switch (this.isMobileMode) {
        // 모바일 모드 일 경우 messages 제외 후 요청
        case true:
          await initForDashboard();
          break;

        // PC 모드 일 경우 messages 포함 요청.
        case false:
          await init();
          break;
      }
    },
    ...mapActions("control/", {
      toggleAutoRefreshMode: "toggleAutoRefreshMode",
      clearSelectedCaddie: "clearSelectedCaddie",
      clearAutoRefreshMode: "clearAutoRefreshMode",
    }),
  },

  mounted() {
    this.init();
  },

  destroyed() {
    this.clearSelectedCaddie();
    this.autoRefreshModeStop();
  },

  watch: {
    /**
     * ### 자동 새로고침 모드 체킹.
     */
    isAutoRefreshMode(isRunning) {
      if (isRunning) {
        // 데이터 새로고침.
        this.requests();
        // 데이터 새로고침 루핑 시작.
        this.autoRefreshModeStart();
      } else {
        // 데이터 새로고침 루핑 클리어.
        this.autoRefreshModeStop();
      }
    },
  },
};
</script>

<style scoped>
#dashboard__container {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
}

/* grid position start */
#dashboard__container .course_info {
  grid-column: 1/2;
  /* border-right: 1px solid var(--primary); */
}

#dashboard__container .hole_info {
  padding-right: 37px;
  grid-column: 2/31;
}

/* grid position end */

/* section header start */
#dashboard__container > section > header {
  height: 50px;
  display: flex;
  border-bottom: 2px solid var(--dark);
  background-color: var(--deep-green);
}

#dashboard__container > section > header span {
  font-size: 1.1rem;
  font-weight: 600;
}

#dashboard__container > .course_info > header {
  justify-content: center;
  align-items: center;
}

#dashboard__container > .hole_info > header {
  justify-content: space-around;
  align-items: center;
}

/* section header end */

/* course start */
#dashboard__container .course_info {
  display: flex;
  flex-direction: column;
}

/* course end */

/* hole start */
#dashboard__container .hole_info {
  display: flex;
  flex-direction: column;
}

/* hole end */

.dev_box {
  position: absolute;
}

@media screen and (min-width: 1080px) {
  .window_size {
    background-color: gold;
  }

  #dashboard__container .course_info {
    grid-column: 1/2;
  }

  #dashboard__container .hole_info {
    grid-column: 2/31;
  }
}

@media screen and (min-width: 1920px) {
  .window_size {
    background-color: tomato;
  }

  #dashboard__container .course_info {
    grid-column: 1/2;
  }

  #dashboard__container .hole_info {
    grid-column: 2/31;
  }

  #dashboard__container .course span {
    font-size: 1.2rem;
  }
}

/* media end */
</style>
