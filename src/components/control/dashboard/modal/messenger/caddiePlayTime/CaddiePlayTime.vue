<template>
  <div class="backdrop" @click.self="handleCloseClick">
    <main id="caddie_play_time">
      <!-- close button -->
      <CloseButton @onClose="handleCloseClick" />

      <!-- content -->
      <section class="content">
        <!-- header -->
        <CaddiePlayTimeHeader
          :caddieName="caddieName"
          :bookgTime="bookgTime"
          :startTime="startTime"
        />

        <!-- body -->
        <CaddiePlayTimeBody
          :firstRound="firstRound"
          :secondRound="secondRound"
          :normalTotalTime="normalTotalTime"
          :roundTotalTime="roundTotalTime"
          :diffTotalTime="diffTotalTime"
        />
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import useCaddie from "@/api/v1/monitor/useCaddie.js";
import CaddiePlayTimeHeader from "./CaddiePlayTimeHeader.vue";
import CaddiePlayTimeBody from "./CaddiePlayTimeBody.vue";
import CloseButton from "@/components/shared/CloseButton.vue";

export default {
  name: "CaddiePlayTime",
  components: {
    CloseButton,
    CaddiePlayTimeHeader,
    CaddiePlayTimeBody,
  },
  data() {
    return {
      caddieName: null,
      startTime: null,
      bookgTime: null,
      normalTotalTime: null,
      roundTotalTime: null,
      diffTotalTime: null,
      firstRound: [],
      secondRound: [],
    };
  },
  mounted() {
    this.getCaddieRoundTimeInfo(this.getSelectedCaddie.data);
  },
  methods: {
    async getCaddieRoundTimeInfo(caddie) {
      const { getCaddieRoundTime } = useCaddie();
      const res = await getCaddieRoundTime(caddie.roundId);

      this.caddieName = caddie.caddieName;
      this.startTime = caddie.startTime;
      this.bookgTime = caddie.bookgTime;

      this.normalTotalTime = res.normalTotalTime;
      this.roundTotalTime = res.roundTotalTime;
      this.diffTotalTime = res.diffTotalTime;

      this.divideRoundsByHalf(res.roundTimeVOList);
    },
    /**
     * 라운드를 전/후 반으로 나누는 함수.
     * - firstRound : 전반 라운드 목록.
     * - secondRound : 후반 라운드 목록.
     */
    divideRoundsByHalf(rounds) {
      const half = Math.ceil(rounds.length / 2);
      this.firstRound = rounds.slice(0, half);
      this.secondRound = rounds.slice(-half);
    },
    /**
     * 캐디 경기 시간 모달 창 종료.
     */
    handleCloseClick() {
      this.updateShowPlayTimeModal(false);
    },
    ...mapActions({
      updateShowPlayTimeModal: "updateIsShowingPlayTimeModal",
    }),
  },
  computed: {
    ...mapGetters("control/", {
      getSelectedCaddie: "getSelectedCaddie",
    }),
  },
};
</script>

<style>
#caddie_play_time {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 85%;
  height: 40%;
  background-color: var(--dark);
  border-radius: 25px;
}
</style>
