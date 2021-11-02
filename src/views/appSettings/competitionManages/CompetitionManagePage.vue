<template>
  <article class="competition-manage-page__container">
    <!-- Header -->
    <CompetitionManageHeader @onSubmit="handleSearchSubmit" />

    <!-- Body -->
    <CompetitionManageBody
      :competitions="competitions"
      @onSeeParticipantsClick="handleSeeParticipantsClick"
    />
  </article>
</template>

<script>
import CompetitionManageHeader from "./CompetitionManageHeader.vue";
import useCompetition from "@/api/v1/appSettings/useCompetition";
import { mapActions, mapGetters } from "vuex";
import CompetitionManageBody from "./CompetitionManageBody.vue";
import { COMPANY_CODE_DEFAULT_VALUE } from "@/utils/constants";
import useCompany from "@/api/v1/monitor/useCompany";

const { getCompany } = useCompany();
const { getCompetitions } = useCompetition();

export default {
  name: "CompetitionManagePage",

  components: {
    CompetitionManageHeader,
    CompetitionManageBody,
  },

  computed: {
    ...mapGetters("appSettings", {
      competitions: "getCompetitions",
    }),
    ...mapGetters("control", {
      companyCode: "getCompanyCode",
    }),
  },

  methods: {
    init() {
      this.requests();
    },

    requests() {
      this.requestCompany();
    },

    async requestCompany() {
      if (this.companyCode === COMPANY_CODE_DEFAULT_VALUE) {
        const { status, data } = await getCompany();
        if (status && status === "OK") {
          const { companyCd, companyName } = data;
          this.setCompanyCode(companyCd);
          this.setCompanyName(companyName);
        }
      }
    },
    /**
     * ### 대회 목록 가져오는 넘.
     * @param {String} fromDate > 조회 시작일.
     * @param {String} toDate > 조회 종료일.
     */
    async handleSearchSubmit({ fromDate, toDate }) {
      const { status, data } = await getCompetitions(fromDate, toDate);
      if (status && status === "OK") {
        this.setCompetitions(data);
      }
    },

    /**
     * ### 참가자 목록 가져와서 모달창 띄우는 넘.
     * @param {Array} participants > 참가자 목록.
     * @param {String} competitionNm > 대회 이름.
     */
    handleSeeParticipantsClick({ participants, competitionNm }) {
      // 모달 띄우기.
      this.setIsShowingCompetitionParticipantsModal(true);
      // 모달 타이틀 설정.
      this.setCompetitionTitle(competitionNm);
      // 모달 참가자 설정.
      this.setParticipants(participants);
    },

    ...mapActions({
      setIsShowingCompetitionParticipantsModal:
        "updateIsShowingCompetitionParticipantsModal",
    }),
    ...mapActions("appSettings", {
      setCompetitions: "updateCompetitions",
      setParticipants: "updateParticipants",
      setCompetitionTitle: "updateCompetitionTitle",
    }),
    ...mapActions("control", {
      setCompanyCode: "updateCompanyCode",
      setCompanyName: "updateCompanyName",
    }),
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.competition-manage-page__container {
  height: 100%;
}
</style>
