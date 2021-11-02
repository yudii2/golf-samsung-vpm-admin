<template>
  <thead class="caddie_play_time__table_head__container">
    <tr>
      <th>홀번호</th>
      <th>TOTAL</th>
      <th
        v-for="(round, roundIndex) in firstRound"
        :key="`${round.courseCd}${round.holeCd}`"
      >
        <span>{{ courseName(round.courseCd, roundIndex) }}</span>
      </th>
      <th
        v-for="(round, roundIndex) in secondRound"
        :key="`${round.courseCd}${round.holeCd}`"
      >
        <span>{{ courseName(round.courseCd, roundIndex) }}</span>
      </th>
    </tr>
  </thead>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CaddiePlayTimeTableHead",
  props: {
    firstRound: {
      type: Array,
      require: true,
    },
    secondRound: {
      type: Array,
      require: true,
    },
  },
  computed: {
    courseName() {
      return (courseCode, roundIndex) => {
        const foundCourse = this.currentCompanyCourses.find(
          (c) => c.courseCd === courseCode
        );
        return `${foundCourse.courseNm}${roundIndex + 1}`;
      };
    },
    ...mapGetters("control/", {
      currentCompanyCourses: "getCompanyCourses",
    }),
  },
};
</script>

<style scoped>
.caddie_play_time__table_head__container tr {
  height: 50px;
  background-color: var(--primary);
}
</style>
