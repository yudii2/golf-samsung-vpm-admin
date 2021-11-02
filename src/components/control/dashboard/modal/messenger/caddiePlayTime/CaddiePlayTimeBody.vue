<template>
  <table class="caddie_play_time__body__container">
    <!-- thead -->
    <CaddiePlayTimeTableHead
      :firstRound="firstRound"
      :secondRound="secondRound"
    />

    <!-- tbody -->
    <CaddiePlayTimeTableBody
      :firstRound="firstRound"
      :secondRound="secondRound"
      :normalTotalTime="normalTotalTime"
      :roundTotalTime="roundTotalTime"
      :diffTotalTime="diffTotalTime"
    />
  </table>
</template>

<script>
import CaddiePlayTimeTableHead from "./CaddiePlayTimeTableHead.vue";
import CaddiePlayTimeTableBody from "./CaddiePlayTimeTableBody.vue";

export default {
  name: "CaddiePlayTimeBody",
  components: {
    CaddiePlayTimeTableHead,
    CaddiePlayTimeTableBody,
  },
  props: {
    firstRound: {
      type: Array,
      require: true,
    },
    secondRound: {
      type: Array,
      require: true,
    },
    normalTotalTime: {
      type: String,
      require: true,
    },
    roundTotalTime: {
      type: String,
      require: true,
    },
    diffTotalTime: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped>
.caddie_play_time__body__container {
  width: 100%;
  background-color: var(--dark);
}
</style>
