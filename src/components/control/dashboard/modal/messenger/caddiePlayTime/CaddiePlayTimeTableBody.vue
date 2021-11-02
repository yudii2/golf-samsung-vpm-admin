<template>
  <tbody class="caddie_play_time__table_body__container">
    <tr>
      <td>표준시간</td>
      <td>{{ parsedNormalTotalTime }}</td>
      <td v-for="round in firstRound" :key="`${round.courseCd}${round.holeCd}`">
        {{ parsedTime(round.normalTime) }}
      </td>

      <td
        v-for="round in secondRound"
        :key="`${round.courseCd}${round.holeCd}`"
      >
        {{ parsedTime(round.normalTime) }}
      </td>
    </tr>
    <tr>
      <td>소요시간</td>
      <td>{{ parsedRoundTotalTime }}</td>
      <td v-for="round in firstRound" :key="`${round.courseCd}${round.holeCd}`">
        {{ parsedTime(round.roundTime) }}
      </td>

      <td
        v-for="round in secondRound"
        :key="`${round.courseCd}${round.holeCd}`"
      >
        {{ parsedTime(round.roundTime) }}
      </td>
    </tr>
    <tr>
      <td>차이</td>
      <td>{{ parsedDiffTotalTime }}</td>

      <td v-for="round in firstRound" :key="`${round.courseCd}${round.holeCd}`">
        {{ parsedDiffTime(round.normalTime, round.roundTime) }}
      </td>

      <td
        v-for="round in secondRound"
        :key="`${round.courseCd}${round.holeCd}`"
      >
        {{ parsedDiffTime(round.normalTime, round.roundTime) }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "CaddiePlayTimeTableBody",
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
  computed: {
    parsedNormalTotalTime() {
      return this.normalTotalTime ? this.normalTotalTime.substring(0, 5) : null;
    },
    parsedTime() {
      return (normalTime) => {
        if (!normalTime) return null;
        return normalTime.substring(3, 5);
      };
    },
    parsedRoundTotalTime() {
      return this.roundTotalTime ? this.roundTotalTime.substring(0, 5) : null;
    },
    parsedDiffTotalTime() {
      return this.diffTotalTime ? this.diffTotalTime.substring(1, 6) : null;
    },
    parsedDiffTime() {
      return (normalTime, roundTime) => {
        if (!roundTime) return null;
        const normal = Number(normalTime.substring(3, 5));
        const round = Number(roundTime.substring(3, 5));
        return round - normal;
      };
    },
  },
};
</script>

<style>
.caddie_play_time__table_body__container tr {
  height: 50px;
}

.caddie_play_time__table_body__container tr th:first-child {
  width: 10%;
}
.caddie_play_time__table_body__container tr th:nth-child(2) {
  width: 8%;
}

.caddie_play_time__table_body__container th {
  width: 10px;
}
.caddie_play_time__table_body__container td {
  text-align: center;
}
</style>
