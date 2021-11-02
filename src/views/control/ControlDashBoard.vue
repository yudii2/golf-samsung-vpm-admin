<template>
  <div id="control__container" @click="handleLayoutClick">
    <!-- 대시보드 화면 헤더 -->
    <ControlDashBoardHeader />

    <!-- 대시보드 화면 바디 컨텐츠 -->
    <ControlDashBoardBody />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import useData from "@/api/v1/monitor/useData.js";
import ControlDashBoardHeader from "@/views/control/dashboard/header/ControlDashBoardHeader.vue";
import ControlDashBoardBody from "@/views/control/dashboard/body/ControlDashBoardBody.vue";
import useSession from "@/composables/useSession.js";
import { MESSAGE_CHECKED_TIME_KEY } from "@/utils/constants";

const { init: initData } = useData();
const { writeItemByKeyValue } = useSession();

export default {
  name: "ControlDashBoard",

  components: {
    ControlDashBoardHeader,
    ControlDashBoardBody,
  },

  computed: {
    hasCourses() {
      return !this.companyCourses.length;
    },

    ...mapGetters("control/", {
      companyCourses: "getCompanyCourses",
      currentSelectedCaddie: "getSelectedCaddie",
    }),
  },

  methods: {
    /**
     * ### 컴포넌트 초기화.
     */
    async init() {
      if (this.hasCourses) {
        this.requests();
      }
    },

    /**
     * ### 컴포넌트들에 보여질 데이터 초기화.
     */
    async requests() {
      await initData();
    },

    /**
     * ### 대시보드 컨트롤 화면 접속 시 메시지 체크 시간 설정.
     */
    recordMessageCheckTime() {
      writeItemByKeyValue(MESSAGE_CHECKED_TIME_KEY, Date.now(), false);
    },

    /**
     * ### 현재 선택된 캐디가 있으면, 데이터 클리어 하는 역할.
     * 대시보드 화면 클릭 이벤트.
     */
    handleLayoutClick() {
      if (this.currentSelectedCaddie) {
        this.clearSelectedCaddie();
      }
    },
    ...mapActions("control/", {
      clearAutoRefreshMode: "clearAutoRefreshMode",
      clearSelectedCaddie: "clearSelectedCaddie",
    }),
  },

  mounted() {
    this.init();
    this.recordMessageCheckTime();
  },
};
</script>

<style>
#control__container {
  height: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
}
</style>
