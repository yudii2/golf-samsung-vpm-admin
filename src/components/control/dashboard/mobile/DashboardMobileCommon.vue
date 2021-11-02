<template>
  <main id="dashboard-mobile-common__container">
    <header class="header">
      <!-- 10T 대기 캐디 명단 -->
      <SecondHalfWaitHorizontal />
    </header>

    <!-- 대시보드 -->
    <Dashboard class="_dashboard__container" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Dashboard from "../body/Dashboard.vue";
import CircleFav from "@/components/shared/CircleFav.vue";
import TimeUtil from "@/utils/datetime/TimeUtil";
import SecondHalfWaitHorizontal from "./SecondHalfWaitHorizontal.vue";

export default {
  name: "DashboardMobileCommon",
  components: {
    Dashboard,
    CircleFav,
    SecondHalfWaitHorizontal,
  },
  methods: {
    /**
     * ### 데이터 요청.
     */
    requests() {},

    handleFabClick() {
      this.$router.back();
    },

    ...mapActions("control/", {
      toggleAutoRefreshMode: "toggleAutoRefreshMode",
    }),
  },
  computed: {
    courses() {
      const hasCourses = Object.prototype.hasOwnProperty.call(
        this.company,
        "courses"
      );
      return hasCourses
        ? this.isRefresh
          ? this.tempCourses
          : this.company.courses
        : [];
    },
    getCaddiesByCourseCode() {
      return (courseCode) => {
        const caddies = this.currentCaddies?.filter(
          (caddie) =>
            caddie.playStep == 2 && courseCode === caddie.secondCourseCd
        );
        return caddies;
      };
    },
    /**
     * ### 10T 대기 중인 캐디 목록.
     */
    secondHalfWaitCaddies() {
      return (
        this.currentCaddies?.filter((caddie) => caddie.playStep == 2) || []
      );
    },

    ...mapGetters("control/", {
      isAutoRefreshMode: "getAutoRefreshMode",
    }),
    ...mapGetters("control/", {
      company: "getCompany",
      isRefresh: "getIsRefreshing",
      currentCaddies: "currentCaddies",
      companyCourses: "getCompanyCourses",
      tempCourses: "currentTempCourses",
      isAutoRefreshMode: "getAutoRefreshMode",
      selectedStoreType: "getSelectedStoreType",
    }),
  },
};
</script>

<style scoped>
#dashboard-mobile-common__container {
  position: relative;
  height: 100vh;
  overflow: scroll;
}

/* header start */
.header {
  display: none;
}

/* second half wait list title start */
.header .header-title {
  width: 125px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary);
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
}
.header-title h2 {
  font-size: 1.3rem;
}
/* second half wait list title end */

/* second half wait list start */
.header .courses__wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
  border: 1px solid var(--primary);
  border-radius: 10px;
}
.courses__wrapper .course {
  display: flex;
  align-items: center;
  margin: 5px;
  white-space: nowrap;
  /* overflow: hidden; */
  text-overflow: ellipsis;
}
.course .course-name {
  font-size: 1.2rem;
  font-weight: 600;
}

.courses__wrapper .course .course-caddies {
  position: relative;
  margin-left: 10px;
}
.course-caddies .caddie-info {
  position: absolute;
  top: -10px;
  left: 70px;
  z-index: 3;
  opacity: 0;
  visibility: hidden;
  width: 300px;
  background-color: var(--soft-green);
  transition: all 0.2s ease;
  border-radius: 10px;
  padding: 5px;

  display: flex;
  flex-direction: column;
}
.caddie-info .caddie-info-row {
  margin: 5px;
  display: flex;
  align-items: center;
}
.caddie-info .caddie-info-row > span:last-child {
  margin-left: 5px;
}
.caddie-info-row .caddie-players {
  margin-left: 5px;
}

.course-caddies .caddie-name {
  font-size: 1rem;
  margin-right: 5px;
}
/* second half wait list start */
/* header start */

._dashboard__container {
  /* height: calc(100vh - 140px) !important; */
  height: 100%;
}

.orders-fav-button {
  z-index: 1;
  bottom: 80px;
}

/* media start */
@media screen and (min-width: 500px) {
  .header {
    margin: 5px;
    height: 50px;
    display: flex;
    align-items: center;
  }

  ._dashboard__container {
    height: calc(100vh - 80px) !important;
  }
}

@media screen and (min-width: 1080px) {
  .header {
    margin: 10px;
    height: 70px;
  }

  ._dashboard__container {
    height: calc(100vh - 110px) !important;
  }
}

@media screen and (min-width: 1920px) {
  .header {
    height: 100px;
  }

  ._dashboard__container {
    height: calc(100vh - 140px) !important;
  }
}
/* media end */
</style>
