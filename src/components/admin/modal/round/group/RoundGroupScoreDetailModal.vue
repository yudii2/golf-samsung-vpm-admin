<template>
  <div class="backdrop">
    <div
      id="round_group_score_detail_modal__container"
      class="modal__container"
    >
      <CloseButton @onClose="handleClickClose"/>
      <header>
        <div class="buttons">
          <button class="py-1/2 px" @click="handleClickPrint">인쇄하기</button>
          <button class="py-1/2 px" @click="toggleScoreViewType">
            {{ isSeeTotalScore ? "오버타수로 변경해서 보기" : "총 타수로 변경해서 보기" }}
          </button>
          <button class="py-1/2 px" @click="handleExcelDownload(selectedRound.groupNm)">엑셀 다운로드</button>
        </div>
        <div class="company_info px">{{ company.name }}</div>
        <div class="company_info px">{{ selectedRound.groupNm }}</div>
        <div class="company_info px">{{ parsedVisitDt(selectedRound.visitDt) }}</div>
        <div class="company_info px">
          <span>총 참가자</span>
          <span class="mx-1/2">{{ selectedRound.roundGroupPlayerList.length }}</span>
          <span>명</span>
        </div>
      </header>
      <article class="pt">
        <section>
          <div class="table_wrapper">
            <table id="excelTable">
              <colgroup>
                <col width="5%"/>
                <col width="5%"/>
                <col width="5%"/>
                <col width="9%"/>
                <col width="9%"/>

                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="5%"/>

                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>
                <col width="*"/>

                <col width="5%"/>
                <col width="5%"/>

              </colgroup>
              <thead>
              <tr>
                <th>전반</th>
                <th>후반</th>
                <th>시간</th>
                <th>이름</th>
                <th>항목</th>
                <th v-for="(hole, idx) in selectedRound.roundGroupPlayerList[0].roundTeamParList.slice(0,9)"
                    :key="`hole_first_${idx}`">
                  {{ hole.holeNm }}
                </th>
                <th>전반</th>
                <th
                  v-for="(hole, idx) in selectedRound.roundGroupPlayerList[0].roundTeamParList.slice(9,18)"
                  :key="`hole_second_${idx}`"
                >
                  {{ hole.holeNm }}
                </th>
                <th>후반</th>
                <th>합계</th>
              </tr>
              </thead>
              <tbody v-for="(player, i) in selectedRound.roundGroupPlayerList" :key="`player_${i}`">
              <tr style="text-align: center">
                <td rowspan="2">
                  {{ player.firstCourse }}
                </td>
                <td rowspan="2">
                  {{ player.secondCourse }}
                </td>
                <td rowspan="2">{{ parsedBookgTime(selectedRound.round.lastTeamTime) }}</td>
                <td rowspan="2">{{ maskedPlayerName(player.name, selectedRound.visitDt) }}</td>
                <td>스코어</td>
                <td
                  v-for="(score, idx) in player.roundPlayerScoreStrokeList.slice(0,9)"
                  :key="`score_first_${idx}`"
                >
                  {{ scoreByViewType(score.value, idx, player) }}
                  <!--                  {{score.value}}-->
                </td>
                <td>
                  {{ player.firstScoreSum }}
                </td>
                <td
                  v-for="(score, idx) in player.roundPlayerScoreStrokeList.slice(9,18)"
                  :key="`score_second_${idx}`"
                >
                  {{ scoreByViewType(score.value, idx + 9, player) }}
                  <!--                  {{score.value}}-->
                </td>
                <td>
                  <!--                    {{ accumulator(secondScoresByIndex(i)) }}-->
                  {{ player.secondScoreSum }}
                </td>
                <td>
                  {{ player.scoreTotal }}
                </td>
              </tr>
              <tr style="text-align: center">
                <td>퍼팅</td>
                <td
                  v-for="(putting, idx) in player.roundPlayerScorePutterList.slice(0,9)"
                  :key="`putting_first_${idx}`"
                >
                  <!--                    {{ putting === 0 ? "-" : putting }}-->
                  {{ putting.value }}
                </td>
                <td>
                  {{ player.firstPutterSum }}
                </td>
                <td
                  v-for="(putting, idx) in player.roundPlayerScorePutterList.slice(9,18)"
                  :key="`putting_second_${idx}`"
                >
                  <!--                    {{ putting === 0 ? "-" : putting }}-->
                  {{ putting.value }}
                </td>
                <td>
                  {{ player.secondPutterSum }}
                </td>
                <td>
                  {{ player.putterTotal }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </section>
      </article>
    </div>
    <RoundGroupScorePrint
      ref="roundGroupScorePrint"
      :roundInfo="selectedRound"
      :players="selectedRound.roundGroupPlayerList"
      :isSeeTotalScore="isSeeTotalScore"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import CloseButton from "@/components/shared/CloseButton.vue";
import RoundGroupScorePrint from "@/components/admin/round/roundGroup/prints/score/RoundGroupScorePrint.vue";
import {print} from "@/composables/usePrinter";
import TimeUtil from "@/utils/datetime/TimeUtil";
import {parsedVisitDtIncludesChar} from "@/utils/string";
import DateUtil from "@/utils/datetime/DateUtil";

export default {
  name: "RoundGroupScoreDetailModal",
  components: {CloseButton, RoundGroupScorePrint},
  data() {
    return {
      isSeeTotalScore: true,
    };
  },
  destroyed() {
    this.clearGroup();
  },
  computed: {
    scoreByViewType() {
      return (score, i, player) => {
        if (score === '-') return score;

        if (this.isSeeTotalScore) {
          return score;
        } else {
          return Number(score) - player?.roundTeamParList[i].par

        }
      };
    },
    accumulator() {
      return (list) => {
        return list.reduce((acc, cur) => acc + cur);
      };
    },
    ...mapGetters("admin/", {
      selectedRound: "getSelectedRoundGroup",
    }),
    ...mapGetters("control/", {
      company: "getCompany",
    }),
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },
    maskedPlayerName(){
      return (playerName, visitDt) => {
        const parsedVisitDt = parsedVisitDtIncludesChar(visitDt, '-');
        const elapsedDay = DateUtil.calculateElapsedDate(parsedVisitDt)
        if (elapsedDay > 3) {
          return null;
        } else {
          return playerName;
        }
      };
    }
  },
  methods: {
    handleClickClose() {
      this.close(false);
    },
    handleClickPrint() {
      const layout = this.$refs.roundGroupScorePrint.$el;
      print({
        targetElement: layout,
      });
    },
    toggleScoreViewType() {
      this.isSeeTotalScore = !this.isSeeTotalScore;
    },
    parsedVisitDt(visitDt) {
      return visitDt.replaceAll('-', '.');
    },
    /**
     * 엑셀 다운로드 메소드
     * @param title
     */
    handleExcelDownload(title) {
      let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
      tab_text += '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      tab_text += '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
      tab_text += '<x:Name>스코어링</x:Name>'
      tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>'
      tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>'
      tab_text += "<table>"
      const temp = document.getElementById('excelTable').innerHTML
      tab_text += temp
      tab_text += '</table></body></svgs>'
      const fileName = `${title}.xls`
      const a_tag = document.createElement('a')
      const blob = new Blob([tab_text], {type: 'application/vnd.ms-excel;charset=utf-8;'})
      a_tag.href = window.URL.createObjectURL(blob)
      a_tag.download = fileName
      a_tag.click()
    },
    ...mapActions("admin/", {
      clearGroup: "dispatchClearSelectedRoundGroup",
    }),
    ...mapActions({
      close: "dispatchIsShowingRoundGroupScoreDetailModal",
      toastPreparing: "toastPreparing",
    }),
  },
};
</script>

<style>
/* content positions start */
#round_group_score_detail_modal__container header {
  grid-row: 1/2;
}

.modal__container {
  width: 90% !important;
}

#round_group_score_detail_modal__container article {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

#round_group_score_detail_modal__container article > section {
  height: 100%;
}

#round_group_score_detail_modal__container article section:first-child {
  grid-column: 1/4;
}

#round_group_score_detail_modal__container article section:last-child {
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*text-align: center;*/
}

#round_group_score_detail_modal__container article section:last-child > div {
  height: 100%;
  max-height: calc(100vh - 50px - 30px - 35px - 16px - 100px);
  overflow-y: scroll;
  margin-top: 15px;

}

#round_group_score_detail_modal__container article section:last-child footer {
  grid-row: 18/21;
  display: flex;
  justify-content: center;
}

/* content positions end */

/* header start */
#round_group_score_detail_modal__container .buttons {
  height: 100%;
  /*display: flex;*/
  align-items: center;
  display: inline-block;
}

#round_group_score_detail_modal__container .buttons button {
  border-radius: 5px;
  margin-right: 10px;
  font-size: 0.9rem;
  background-color: var(--dark);
  border: 1px solid var(--soft-green);
  color: var(--secondary);
  transition: all 0.3s ease;
}

#round_group_score_detail_modal__container .buttons button:hover {
  background-color: var(--primary);
}

#round_group_score_detail_modal__container .company_info {
  display: inline-block;
}

/* content left start */
#round_group_score_detail_modal__container .round_info__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#round_group_score_detail_modal__container .round_info__container * {
  letter-spacing: 1.5px;
}

#round_group_score_detail_modal__container .player_count__box {
  display: flex;
  align-items: center;
}

#round_group_score_detail_modal__container
.player_count__box
span:nth-child(2) {
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: default;
}

#round_group_score_detail_modal__container
.player_count__box
span:nth-child(2):hover {
  transform: translateY(-5px) scale(1.4);
  color: var(--primary);
}

/* content left end */

/* content right start */
#round_group_score_detail_modal__container table {
  width: 100%;
  border: 1px solid var(--primary);
}

#round_group_score_detail_modal__container table th,
#round_group_score_detail_modal__container table td {
  padding: 10px;
  border: 1px solid var(--primary);
}

/* content right end */
</style>
