<template>
  <header class="caddie_play_time__header__container">
    <!-- 현재 캐디 이름 -->
    <div>
      <h3>{{ caddieName }}</h3>
    </div>

    <!-- 출발 시간 정보 -->
    <div class="ml">
      <img :src="gameTimeIcon" alt="clock" />
      <span class="ml mr-1/2">출발시간</span>
      <span v-if="startTime">{{ parseTime(startTime) }}</span>
    </div>

    <!-- 예약 시간 정보 -->
    <div class="ml">
      <img :src="gameTimeIcon" alt="clock" />
      <span class="ml mr-1/2">예약시간</span>
      <span v-if="bookgTime">{{ parseTime(bookgTime) }}</span>
    </div>
  </header>
</template>

<script>
import gameTimeIcon from "@/assets/images/control/dashboard/ico_gametime2.png";

export default {
  name: "CaddiePlayTimeHeader",
  props: {
    caddieName: {
      type: String,
      require: true,
    },
    startTime: {
      type: String,
      require: true,
    },
    bookgTime: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      gameTimeIcon,
    };
  },
  computed: {
    /**
     * 시간 데이터 포맷 변환.
     */
    parseTime() {
      return (time) => {
        return time?.substring(0, 5);
      };
    },
  },
};
</script>

<style scoped>
.caddie_play_time__header__container {
  display: flex;
  align-items: center;
  min-height: 80px;
  background-color: var(--soft-green);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px 20px;
}

.caddie_play_time__header__container div {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 50px;
  font-weight: 700;
}

.caddie_play_time__header__container div:nth-child(1) {
  font-size: 1.3rem;
  color: white;
}

.caddie_play_time__header__container div:nth-child(2) {
  font-size: 1.2rem;
}

.caddie_play_time__header__container div:nth-child(3) {
  font-size: 1.2rem;
}
</style>
