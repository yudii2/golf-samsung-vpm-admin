<template>
  <div class="backdrop">
    <div id="score_detail__container" ref="scoreDetailContainer">
      <CloseButton @onClose="handleClickClose"/>
      <header class="header">
        <div class="buttons">
          <button class="py-1/2 px" @click="handleClickPrint">인쇄하기</button>
          <button class="py-1/2 px" @click="toggleViewType">
            {{ viewTypeText }}
          </button>
        </div>
        <div class="company_info px">{{ currentCompany.name }}</div>
        <div class="company_info px" v-if="selectedRound.round.courseInOut">
                      <span>
                        {{ selectedRound.round.courseInOut }}
                      </span>
        </div>
        <div class="company_info px">
          <span>{{ parsedVisitDt(selectedRound.visitDt) }} </span>
          <span>{{ parsedBookgTime(selectedRound.round.bookgTime) }}</span>
        </div>
        <div class="company_info px">
          <span>총 참가자 : </span>
          <span>{{ selectedRound.roundTeamPlayerList.length }} 명</span>
        </div>
      </header>
      <article class="body">
        <section class="score_detail_tables">
          <table class="table_total">
            <colgroup>
              <col width="20%"/>
              <col width="20%"/>
              <col width="20%"/>
              <col width="20%"/>
              <col width="20%"/>
            </colgroup>
            <thead>
            <tr>
              <th>Player</th>
              <th>스코어</th>
              <th>퍼팅수</th>
              <th>페어웨이 안착률</th>
              <th>그린 적중률</th>
            </tr>
            </thead>
            <tbody v-if="selectedRound.roundTeamPlayerList.length">
            <tr v-for="(player, idx) in selectedRound.roundTeamPlayerList" :key="idx">
              <td>{{ maskedPlayerName(player.name) }}</td>
              <td>{{ player.scoreTotal }}</td>
              <td>{{ player.putterTotal }}</td>
              <td>{{ player.fairWaySafe }}</td>
              <td>{{ player.greenHit }}</td>
            </tr>
            </tbody>
          </table>

          <table class="table_each_hole">
            <colgroup>
              <col width="7%"/>
              <col width="7%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="4%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="3.38%"/>
              <col width="4%"/>
              <col width="4%"/>
            </colgroup>
            <thead>
            <tr>
              <th rowspan="2">Player</th>
              <th>Hole</th>
              <th
                v-for="(hole, idx) in selectedRound.roundTeamParList.slice(0,9)"
                :key="`par_index_first_${idx}`"
              >
                {{ hole.holeNm }}
              </th>
              <th></th>
              <th
                v-for="(hole, jdx) in selectedRound.roundTeamParList.slice(9,18)"
                :key="`par_index_second_${jdx}`"
              >
                {{ hole.holeNm }}
              </th>
              <th></th>
              <th></th>
              <th rowspan="2">SMS</th>
            </tr>
            <tr>
              <th>Par</th>
              <th
                v-for="(par, idx) in selectedRound.roundTeamParList.slice(0,9)"
                :key="`first_${idx}`"
              >
                {{ par.par }}
              </th>
              <th>
                {{ accumulatorForPar(selectedRound, 0, 9) }}
              </th>
              <th
                v-for="(par, idx) in selectedRound.roundTeamParList.slice(9,18)"
                :key="`second_${idx}`"
              >
                {{ par.par }}
              </th>
              <th>
                {{ accumulatorForPar(selectedRound, 9, 18) }}
              </th>
              <th>
                {{ accumulatorForPar(selectedRound, 0, 9) + accumulatorForPar(selectedRound, 9, 18) }}
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-for="player in selectedRound.roundTeamPlayerList">
              <tr>
                <td rowspan="2">{{ maskedPlayerName(player.name) }}</td>
                <td>스코어</td>
                <template v-if="player.roundPlayerScoreStrokeList !== null">
                  <td v-for="(score,idx) in player.roundPlayerScoreStrokeList.slice(0,9)"
                      :key="`${player.name}_first_score_${idx}`">
                    {{ scoreByViewType(score.value, "first", idx) }}
                  </td>
                  <td>
                    {{ player.firstScoreSum }}
                  </td>
                  <td v-for="(score,idx) in player.roundPlayerScoreStrokeList.slice(9,18)"
                      :key="`${player.name}_second_score_${idx}`">
                    {{ scoreByViewType(score.value, "second", idx + 9) }}
                  </td>
                </template>
                <td>
                  {{ player.secondScoreSum }}
                </td>
                <td>
                  {{ player.scoreTotal }}
                </td>
                <td rowspan="2">
                  <button class="button-dark" @click="handleClickSMS(player,selectedRound)">SMS전송</button>
                </td>
              </tr>
              <tr>
                <td>퍼팅수</td>
                <template v-if="player.roundPlayerScorePutterList !== null">
                  <td
                    v-for="(score,idx) in player.roundPlayerScorePutterList.slice(0,9)"
                    :key="`${player.name}_first_score_putter_${idx}`"
                  >
                    {{ score.value === 0 ? '-' : score.value }}
                  </td>
                  <td>
                    {{ player.firstPutterSum }}
                  </td>
                  <td
                    v-for="(score,idx) in player.roundPlayerScorePutterList.slice(9,18)"
                    :key="`${player.name}_second_score_putter_${idx}`"
                  >
                    {{ score.value === 0 ? '-' : score.value }}
                  </td>
                </template>
                <td>
                  {{ player.secondPutterSum }}
                </td>
                <td>
                  {{ player.putterTotal }}
                </td>

              </tr>
            </template>
            </tbody>
          </table>
        </section>
      </article>
    </div>
    <RoundAllScorePrint
      ref="roundPhoto"
      :players="selectedRound.roundTeamPlayerList"
      :parInfo="selectedRound.roundTeamParList"
      :roundInfo="selectedRound"
      :viewType="viewTypeIsAll"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DateUtil from "@/utils/datetime/DateUtil";
import TimeUtil from "@/utils/datetime/TimeUtil";
import CloseButton from "@/components/shared/CloseButton.vue";
import RoundAllScorePrint from "@/components/admin/round/roundAll/RoundAllScorePrint.vue";
import {print} from "@/composables/usePrinter";
import {getListByPage} from "@/utils/usePage";
import {nameToMasking} from "@/utils/string";


export default {
  name: "ScoreDetail",

  components: {CloseButton, RoundAllScorePrint},

  data() {
    return {
      viewTypeIsAll: true,
    };
  },

  computed: {
    /**
     * ### 시간 데이터를 파싱.
     * @param {string} bookgDate > hhmm 포맷의 날짜 데이터.
     * @returns {string} hh:mm 포맷의 날짜 데이터.
     */
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime)
      }
    },

    /**
     * 내장객 이름 마스킹 처리
     * @returns {function(*=): string}
     */
    maskedPlayerName() {
      return (playerName) => {
        return nameToMasking(playerName)
      }
    },

    viewTypeText() {
      return this.viewTypeIsAll ? "오버타수로 변경해서 보기" : "총 타수로 변경해서 보기";
    },

    /**
     * player 별로 전/후반 스코어 반환 메소드.
     * */
    scoreByViewType() {
      return (originScore, half, index) => {
        if (originScore === '-') return originScore;

        if (this.viewTypeIsAll) {
          return originScore;
        }

        const isFirstHalf = half === "first";
        if (isFirstHalf) {
          return originScore - this.selectedRound.roundTeamParList[index].par;
        } else {
          return originScore - this.selectedRound.roundTeamParList[index].par;
        }
      };
    },
    ...mapGetters("admin/", {
      selectedRound: "getSelectedRoundAll",
    }),
    ...mapGetters("control/", {
      currentCompany: "getCompany",
    }),
  },
  methods: {
    toggleViewType() {
      this.viewTypeIsAll = !this.viewTypeIsAll;
    },

    /**
     * 인쇄하기 버튼 메소드.
     * */
    async handleClickPrint() {
      const roundPhoto = this.$refs.roundPhoto.$el;

      print({
        targetElement: roundPhoto,
        before: this.beforePrint,
        after: this.afterPrint,
      });
    },

    /**
     * 닫기버튼 메소드.
     * */
    handleClickClose(isClose) {
      if (isClose) {
        this.dispatchClearSelectedRound();
        this.updateIsShowingRoundAllScoreDetailModal(false);
      }
    },

    /**
     * par 총합을 계산해주는 메소드.
     * @param selectedRound
     * @param firstNum
     * @param secondNum
     * @returns {*}
     */
    accumulatorForPar(selectedRound, firstNum, secondNum) {
      let parList = [];
      selectedRound?.roundTeamParList?.slice(firstNum, secondNum).forEach((par) => {
        parList.push(par.par)
      })
      const parTotalValue = parList.reduce((acc, curr) => acc + curr);
      return parTotalValue;
    },

    /**
     * SMS 모달창 띄우는 메소드.
     * @param player
     * @param selectedRound
     */
    handleClickSMS(player, selectedRound) {
      const playerInfo = {
        ...player,
        "roundId": selectedRound.roundId
      }
      this.dispatchUpdateSelectedPlayer(playerInfo)
      this.updateIsShowingSMSModal(true);
    },

    /**
     * visitDt 포맷팅 메소드.
     * input : 2021-09-14
     * output : 2021.09.14
     * @param visitDt
     * @returns {*|string}
     */
    parsedVisitDt(visitDt) {
      return visitDt.replaceAll('-', '.');
    },
    ...mapActions({
      updateIsShowingRoundAllScoreDetailModal:
        "dispatchIsShowingRoundAllScoreDetailModal",
      updateIsShowingSMSModal: "dispatchIsShowingSMSModal"
    }),
    ...mapActions("admin/", {
      dispatchClearSelectedRound: "dispatchClearSelectedRound",
      dispatchUpdateSelectedPlayer: 'dispatchUpdateSelectedPlayer'
    }),
  },

};
</script>

<style>
#score_detail__container {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  padding: 20px;
  border: 1px solid var(--primary);
  border-radius: 20px;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
}

#score_detail__container * {
  color: var(--secondary);
}

/* header start */
#score_detail__container .header {
  grid-row: 1/2;
  align-self: center;
}

#score_detail__container .header .buttons {
  display: inline-block;
}

#score_detail__container .header .company_info {
  display: inline-block;
}


#score_detail__container .header .buttons button {
  border-radius: 5px;
  margin-right: 10px;
  font-size: 0.9rem;
  background-color: var(--dark);
  border: 1px solid var(--soft-green);
  color: var(--secondary);
  transition: all 0.3s ease;
}

#score_detail__container .header .buttons button:hover {
  background-color: var(--primary);
}

/* header end */

/* body start */
#score_detail__container > .body {
  grid-row: 2/13;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

#score_detail__container .score_detail_tables {
  grid-column: 1/13;
  overflow-y: scroll;
  text-align: center;
}

/* table total start */
#score_detail__container .score_detail_tables .table_total {
  width: 100%;
  /*height: 33%;*/
  border: 1px solid var(--primary);
}

#score_detail__container .score_detail_tables .table_total th,
#score_detail__container .score_detail_tables .table_total td {
  padding: 10px;
  border: 1px solid var(--primary);
}

/* table total end */

/* table each hole start */

#score_detail__container .score_detail_tables .table_each_hole {
  width: 100%;
  height: 66%;
  border: 1px solid var(--primary);
  margin-top: 20px;
}

#score_detail__container .score_detail_tables .table_each_hole th,
#score_detail__container .score_detail_tables .table_each_hole td {
  padding: 10px;
  border: 1px solid var(--primary);
}

/* table each hole end */
/* body end */

#score_detail__container .behind {
  position: relative;
}
</style>
