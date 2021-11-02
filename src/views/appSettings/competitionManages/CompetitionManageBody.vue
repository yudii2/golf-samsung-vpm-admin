<template>
  <section class="competitions__wrapper mt">
    <table class="table-dark">
      <colgroup>
        <col width="6%" />
        <col width="22%" />
        <col width="8%" />
        <col width="16%" />
        <col width="12%" />
        <col width="8%" />
        <col width="16%" />
        <col width="8%" />
      </colgroup>

      <thead>
        <tr>
          <th>순번</th>
          <th>대회명</th>
          <th>사업장</th>
          <th>시작일</th>
          <th>종료일</th>
          <th>참가자</th>
          <th>비고</th>
          <th>구분</th>
        </tr>
      </thead>

      <tbody v-if="hasCompetitions">
        <tr
          v-for="(competition, competitionIndex) in competitions"
          :key="competition.competitionId"
        >
          <td>{{ competitionIndex + 1 }}</td>
          <td>
            {{ competition.competitionNm }}
          </td>
          <td>{{ competition.companyCd }}</td>
          <td>{{ competition.startDt }}</td>
          <td>{{ competition.endDt }}</td>
          <td>
            <button
              class="button-dark"
              @click="handleSeeParticipantsClick(competition)"
            >
              조회
            </button>
          </td>
          <td>{{ competition.remarks }}</td>
          <td>{{ competition.gubun | isPrivate }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7">대회가 존재하지 않습니다.</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import useCompetition from "@/api/v1/appSettings/useCompetition";

const { getParticipantsByCompetitionId } = useCompetition();

export default {
  name: "CompetitionManageBody",

  props: {
    competitions: {
      type: Array,
      default: [],
    },
  },

  computed: {
    hasCompetitions() {
      return this.competitions.length;
    },
  },

  methods: {
    async handleSeeParticipantsClick({ competitionId, competitionNm }) {
      const {
        status,
        data: participants,
      } = await getParticipantsByCompetitionId(competitionId);

      if (status && status === "OK") {
        this.$emit("onSeeParticipantsClick", {
          participants,
          competitionNm,
        });
      }
    },
  },

  filters: {
    /**
     * ### 값이 없는 경우 비공개 처리,
     * - 1: 공개.
     * - 2: 비공개.
     */
    isPrivate(value) {
      if (!value) return "비공개";
      return value == 1 ? "공개" : "비공개";
    },
  },
};
</script>

<style scoped>
/* table start *
/* max-height : Logo header(50px) - current tab header(30px) - current tab padding(35px) - table margin top(16px)/ */
.competitions__wrapper {
  height: 100%;
  max-height: calc(100vh - 50px - 30px - 35px - 16px);
  overflow-y: scroll;
}
/* table end */
</style>
