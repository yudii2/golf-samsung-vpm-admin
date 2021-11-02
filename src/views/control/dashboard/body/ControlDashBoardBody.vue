<template>
  <!-- 코스 정보가 존재하는 경우 보여지는 화면 -->
  <div id="control_dashboard_body__container" v-if="hasCourses">
    <transition name="fade" mode="out-in">
      <!-- 코스로 보기 -->
      <ControlDashboardBodyContentsCourse v-if="viewType === COURSE" />

      <!-- 지도로 보기 -->
      <ControlDashBoardBodyContentsMap v-else />
    </transition>
  </div>

  <!-- 코스 정보가 없는 경우 보여지는 화면 -->
  <div class="empty__container" v-else>
    <h2>courses info does not exist</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { COURSE, MAP } from "@/utils/constants";
import ControlDashboardBodyContentsCourse from "./contents/ControlDashboardBodyContentsCourse.vue";
import ControlDashBoardBodyContentsMap from "@/views/control/dashboard/body/contents/ControlDashBoardBodyContentsMap.vue";

export default {
  name: "ControlDashBoardBody",
  components: {
    ControlDashboardBodyContentsCourse,
    ControlDashBoardBodyContentsMap,
  },
  data() {
    return {
      holeCount: 9,
      MAP,
      COURSE,
    };
  },
  computed: {
    /**
     * ### 현재 사업장의 코스가 존재하는지 여부 확인.
     */
    hasCourses() {
      return this.currentCompanyCourses.length;
    },

    ...mapGetters("control/", {
      currentCompanyCourses: "getCompanyCourses",
      viewType: "getViewType",
    }),
  },
};
</script>

<style scoped>
#control_dashboard_body__container {
  grid-row: 2/11;
  position: relative;
  background-color: #002f31;
  width: 100%;
  height: 100%;
}

/* empty container start */
.empty__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* empty container end */
</style>
