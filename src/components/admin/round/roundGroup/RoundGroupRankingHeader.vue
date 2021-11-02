<template>
  <header>
    <div class="buttons">
<!--      <button class="py-1/2 px" @click="$emit('handleClickPrint')">-->
<!--        인쇄하기-->
<!--      </button>-->
      <button class="py-1/2 px" @click="$emit('handleClickReset')">
        초기화
      </button>
      <button class="py-1/2 px" @click="$emit('handleClickUpdateAndSave')">
        {{ isUpdatable ? '저장' : '수정하기' }}
      </button>
      <button class="py-1/2 px" @click="$emit('handleExcelDownload', selectedRoundGroup.round.groupNm)">
        엑셀다운로드
      </button>
    </div>
    <div class="company_info px" v-if="company">{{ company.name }}</div>
    <span class="px">{{ parsedVisitDt(selectedRoundGroup.round.visitDt) }} </span>
    <span class="px">{{ selectedRoundGroup.round.groupNm }}</span>
    <div class="company_info px">
      <span>총 참가자 : </span>
      <span>{{ selectedRoundGroup.roundGroupPlayerBuddyRankVOList.length }} 명</span>
    </div>
  </header>
</template>

<script>
import DateUtil from "@/utils/datetime/DateUtil";
import {mapGetters} from "vuex";

export default {
  name: "RoundGroupRankingHeader",

  props: {
    isUpdatable: {
      type: Boolean,
      required: true
    },
    selectedRoundGroup: {
      type: Object,
      required: true
    }
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
      const date = DateUtil.eightToDate(visitDt)
      const {year, month, day} = DateUtil.dateDivider(date)
      return `${year}.${month}.${day}`
    },
  },
}
</script>

<style scoped>
header {
  grid-row: 1/2;
}

.buttons {
  height: 100%;
  /*display: flex;*/
  align-items: center;
  display: inline-block;
}

.buttons button {
  border-radius: 5px;
  margin-right: 10px;
  font-size: 0.9rem;
  background-color: var(--dark);
  border: 1px solid var(--soft-green);
  color: var(--secondary);
  transition: all 0.3s ease;
}

.buttons button:hover {
  background-color: var(--primary);
}

.company_info {
  display: inline-block;
}

</style>
