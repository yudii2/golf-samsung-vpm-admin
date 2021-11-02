<template>
  <main id="control-dashboard-body-contents-course__container">
    <div class="information__container px-1/2">
      <!-- 스타트 대기 -->
      <FirstHalfWait class="mx-1/2" />

      <!-- 10T 대기 -->
      <SecondHalfWait class="mx-1/2" />

      <!-- 플레이 종료 -->
      <PlayDone class="mx-1/2" />

      <!-- 메신져 박스 -->
      <div class="messenger__container">
        <MessengerBox />
      </div>
    </div>

    <!-- 대시 보드 -->
    <Dashboard />

    <!-- 마크 정보 -->
    <MarkInfo />
  </main>
</template>

<script>
import FirstHalfWait from "@/components/control/dashboard/header/FirstHalfWait.vue";
import SecondHalfWait from "@/components/control/dashboard/header/secondHalfWait/SecondHalfWait.vue";
import PlayDone from "@/components/control/dashboard/header/PlayDone.vue";
import MessengerBox from "@/components/control/dashboard/header/MessengerBox.vue";
import MarkInfo from "@/components/control/dashboard/body/MarkInfo.vue";
import Dashboard from "@/components/control/dashboard/body/Dashboard.vue";

export default {
  name: "ControlDashboardBodyContentsCourse",

  components: {
    FirstHalfWait,
    SecondHalfWait,
    PlayDone,
    MessengerBox,
    MarkInfo,
    Dashboard,
  },
};
</script>

<style scoped>
#control-dashboard-body-contents-course__container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* content start */
.information__container {
  width: 77.4%;
  min-height: 220px;
  grid-area: content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  align-self: flex-start;
}

.messenger__container {
  display: block;
  width: 21%;
  height: 200px;
  position: absolute;
  right: 18px;
  top: 10px;
  z-index: 2;
}

/* media start */
@media screen and (min-width: 1620px) {
  /* content start */
  .information__container {
    min-height: 280px;
    width: 78.3%;
  }
  /* content end */
  .messenger__container {
    top: -80px;
    right: 12px;
    height: 345px;
  }
}
/* media end */
</style>
