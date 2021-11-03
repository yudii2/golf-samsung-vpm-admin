<template>
  <header>
    <div class="buttons">
      <button class="button-dark mr" @click="$emit('handleClickPrint')">
        인쇄하기
      </button>
      <button class="button-dark mr" @click="$emit('handleClickReset')">
        초기화
      </button>
      <button class="button-dark mr" @click="$emit('handleClickUpdateAndSave')">
        {{ isUpdatable ? "저장" : "수정하기" }}
      </button>
      <button
        class="button-dark mr"
        @click="$emit('handleExcelDownload', selectedRoundGroup.round.groupNm)"
      >
        엑셀다운로드
      </button>
    </div>
    <div class="company_info px" v-if="company">{{ company.name }}</div>
    <span class="px"
    >{{ parsedVisitDt(selectedRoundGroup.round.visitDt) }}
    </span>
    <span class="px">{{ selectedRoundGroup.round.groupNm }}</span>
    <div class="company_info px">
      <span>총 참가자 : </span>
      <span
      >{{
          selectedRoundGroup.roundGroupPlayerBuddyRankVOList.length
        }}
        명</span
      >
    </div>
  </header>
</template>

<script>
import DateUtil from "@/utils/datetime/DateUtil";
import { mapGetters } from "vuex";

export default {
  name: "RoundGroupRankingHeader",

  props: {
    isUpdatable: {
      type: Boolean,
      required: true,
    },
    selectedRoundGroup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("control/", {
      company: "getCompany",
    }),
  },

  methods: {
    /**
     * visitDt YYYYMMDD -> YYYY.MM.DD 로 변경해주는 메소드.
     * */
    parsedVisitDt(visitDt) {
      const date = DateUtil.eightToDate(visitDt);
      const { year, month, day } = DateUtil.dateDivider(date);
      return `${year}.${month}.${day}`;
    },
  },
};
</script>

<style scoped>
header {
  grid-row: 1/2;
  display: flex;
  align-items: center;
}

.company_info {
  display: inline-block;
}
</style>
