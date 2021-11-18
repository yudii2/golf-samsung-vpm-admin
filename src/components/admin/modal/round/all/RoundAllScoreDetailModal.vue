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
          <button class="py-1/2 px" @click="handleClickUpdateAndSave">{{ isUpdatable ? '저장' : '수정하기' }}</button>
        </div>
        <div class="company_info p-1/2">{{ currentCompany.name }}</div>
        <div class="company_info p-1/2" v-if="selectedRound.round.courseInOut">
          <span>
            {{ selectedRound.round.courseInOut }}
          </span>
        </div>
        <div class="company_info p-1/2">
          <span>{{ parsedVisitDt(selectedRound.visitDt) }} </span>
          <span>{{ parsedBookgTime(selectedRound.round.bookgTime) }}</span>
        </div>
        <div class="company_info p-1/2">
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
            <tr
              v-for="(player, idx) in selectedRound.roundTeamPlayerList"
              :key="idx"
            >
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
                v-for="(hole, idx) in selectedRound.roundTeamParList.slice(
                    0,
                    9
                  )"
                :key="`par_index_first_${idx}`"
              >
                {{ hole.holeNm }}
              </th>
              <th></th>
              <th
                v-for="(hole, jdx) in selectedRound.roundTeamParList.slice(
                    9,
                    18
                  )"
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
                v-for="(par, idx) in selectedRound.roundTeamParList.slice(
                    0,
                    9
                  )"
                :key="`first_${idx}`"
              >
                {{ par.par }}
              </th>
              <th>
                {{ accumulatorForPar(selectedRound, 0, 9) }}
              </th>
              <th
                v-for="(par, idx) in selectedRound.roundTeamParList.slice(
                    9,
                    18
                  )"
                :key="`second_${idx}`"
              >
                {{ par.par }}
              </th>
              <th>
                {{ accumulatorForPar(selectedRound, 9, 18) }}
              </th>
              <th>
                {{
                  accumulatorForPar(selectedRound, 0, 9) +
                  accumulatorForPar(selectedRound, 9, 18)
                }}
              </th>
            </tr>
            </thead>
            <tbody>
            <template
              v-for="(player, i, j) in selectedRound.roundTeamPlayerList"
            >
              <tr :key="`${selectedRound.roundId}${i}`">
                <td rowspan="2">{{ maskedPlayerName(player.name) }}</td>
                <td>스코어</td>
                <template v-if="player.roundPlayerScoreStrokeList !== null">
                  <td
                    v-for="(
                        score, idx
                      ) in player.roundPlayerScoreStrokeList.slice(0, 9)"
                    :key="`${player.name}_first_score_${idx}`"
                  >
                    <template v-if="isUpdatable">
                      <input
                        class="update_input"
                        type="number"
                        :value="scoreByViewType(score.value, 'first', idx)"
                        @change="updateScoreValue($event, score, player)"
                      />
                    </template>
                    <template v-else>
                      {{ scoreByViewType(score.value, "first", idx) }}
                    </template>
                  </td>
                  <td>
                    {{ player.firstScoreSum }}
                  </td>
                  <td
                    v-for="(
                        score, idx
                      ) in player.roundPlayerScoreStrokeList.slice(9, 18)"
                    :key="`${player.name}_second_score_${idx}`"
                  >
                    <template v-if="isUpdatable">
                      <input
                        class="update_input"
                        type="number"
                        :value="scoreByViewType(score.value, 'second', idx)"
                        @change="updateScoreValue($event, score, player)"

                      />
                    </template>
                    <template v-else>
                      {{ scoreByViewType(score.value, "second", idx + 9) }}
                    </template>
                  </td>
                </template>
                <td>
                  {{ player.secondScoreSum }}
                </td>
                <td>
                  {{ player.scoreTotal }}
                </td>
                <td rowspan="2">
                  <button
                    class="button-dark"
                    @click="handleClickSMS(player, selectedRound)"
                  >
                    SMS전송
                  </button>
                </td>
              </tr>
              <tr :key="`${selectedRound.roundId}${i}${j}`">
                <td>퍼팅수</td>
                <template v-if="player.roundPlayerScorePutterList !== null">
                  <td
                    v-for="(
                        score, idx
                      ) in player.roundPlayerScorePutterList.slice(0, 9)"
                    :key="`${player.name}_first_score_putter_${idx}`"
                  >
                    <template v-if="isUpdatable">
                      <input
                        class="update_input"
                        type="number"
                        :value="score.value === 0 ? '-' : score.value"
                        @change="updatePutterValue($event, score, player)"
                      />
                    </template>
                    <template v-else>
                      {{ score.value === 0 ? "-" : score.value }}
                    </template>
                  </td>
                  <td>
                    {{ player.firstPutterSum }}
                  </td>
                  <td
                    v-for="(
                        score, idx
                      ) in player.roundPlayerScorePutterList.slice(9, 18)"
                    :key="`${player.name}_second_score_putter_${idx}`"
                  >
                    <template v-if="isUpdatable">
                      <input
                        class="update_input"
                        type="number"
                        :value="score.value === 0 ? '-' : score.value"
                        @change="updatePutterValue($event, score, player)"
                      />
                    </template>
                    <template v-else>
                      {{ score.value === 0 ? "-" : score.value }}
                    </template>
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
import TimeUtil from "@/utils/datetime/TimeUtil";
import CloseButton from "@/components/shared/CloseButton.vue";
import RoundAllScorePrint from "@/components/admin/round/roundAll/RoundAllScorePrint.vue";
import {print} from "@/composables/usePrinter";
import {nameToMasking} from "@/utils/string";
import useRound from "@/api/v1/admin/round/useRound";
import {NO_REQUIRED_DATA} from "@/utils/constants";

const {updateRoundScore, getRoundDetail} = useRound()
export default {
  name: "ScoreDetail",

  components: {CloseButton, RoundAllScorePrint},

  data() {
    return {
      viewTypeIsAll: true,
      isUpdatable: false,

      roundPlayerScoreStrokeList: [],
      roundPlayerScorePutterList: []
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
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },

    /**
     * 내장객 이름 마스킹 처리
     * @returns {function(*=): string}
     */
    maskedPlayerName() {
      return (playerName) => {
        return nameToMasking(playerName);
      };
    },

    viewTypeText() {
      return this.viewTypeIsAll
        ? "오버타수로 변경해서 보기"
        : "총 타수로 변경해서 보기";
    },

    /**
     * player 별로 전/후반 스코어 반환 메소드.
     * */
    scoreByViewType() {
      return (originScore, half, index) => {
        if (originScore === "-") return originScore;

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
    /**
     * 스코어, 퍼팅수 수정 메소드 request 객체
     */
    playerScoreReqInit() {
      this.roundPlayerScorePutterList = [];
      this.roundPlayerScoreStrokeList = [];
    },
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
        useGrid: true,
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
      selectedRound?.roundTeamParList
        ?.slice(firstNum, secondNum)
        .forEach((par) => {
          parList.push(par.par);
        });
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
        roundId: selectedRound.roundId,
      };
      this.dispatchUpdateSelectedPlayer(playerInfo);
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
      return visitDt.replaceAll("-", ".");
    },
    /**
     * 스코어, 퍼팅수 수정 API 호출 후 , 스코어카드 재조회.
     * @returns {Promise<void>}
     */
    async handleClickUpdateAndSave() {
      this.isUpdatable = !this.isUpdatable;
      if (!this.isUpdatable) {
        if (this.roundPlayerScoreStrokeList.length === 0 && this.roundPlayerScorePutterList.length === 0) {
          return this.dataInvalidMessage(NO_REQUIRED_DATA)
        }
        const roundId = this.selectedRound.roundId
        const res = await updateRoundScore({roundId}, {
          "roundPlayerScorePutterList": this.roundPlayerScorePutterList,
          "roundPlayerScoreStrokeList": this.roundPlayerScoreStrokeList
        });

        this.playerScoreReqInit();

        const {status} = res;
        if (status !== "OK") return;

        await this.refreshRoundDetail(roundId)
      }
    },
    /**
     *  전체 라운드 스코어 조회  API 호출.
     *  스코어 수정 후 화면 갱신 필요.
     * @param paramRoundId
     * @returns {Promise<void>}
     */
    async refreshRoundDetail(paramRoundId) {
      const round = this.selectedRound.round
      const res = await getRoundDetail({paramRoundId})

      const {status} = res;
      if (status !== "OK") return;

      const {data} = res;

      const selectedRound = {
        ...data,
        round
      }
      this.updateSelectedRound(selectedRound)
    },
    /**
     * 스코어 수정 메소드(기존에 등록된 스코어가 있을 때.)
     * @param e
     * @param score
     */
    updateScoreValue(e, score, player) {
      const copiedScore = {...score}

      const {playerId} = score

      if (e.target.value !== "" && playerId === null) {
        const copiedScore = this.insertScoreValue(e, score, player)
        return this.createRoundPlayerScoreStrokeListReq(copiedScore)
      }

      if (e.target.value !== "") {
        copiedScore.value = e.target.value
        this.createRoundPlayerScoreStrokeListReq(copiedScore)
      } else {
        this.dataInvalidMessage(NO_REQUIRED_DATA)
      }
    },
    /**
     * 스코어 수정 메소드.(기존에 스코어가 등록되지 않았을 때.)
     * @param e
     * @param score
     * @param player
     * @returns {*}
     */
    insertScoreValue(e, score, player) {
      const copiedScore = {...score}

      const {playerId} = player
      const holeCd = this.getHoleCdByHoleIndex(copiedScore.holeIndex)
      const courseCd = this.getCourseNameByHoleIndex(copiedScore.holeIndex)
      const gubun = '1'
      const {code} = this.currentCompany

      copiedScore.companyCd = code
      copiedScore.courseCd = courseCd
      copiedScore.gubun = gubun
      copiedScore.holeCd = holeCd
      copiedScore.playerId = playerId
      copiedScore.value = e.target.value

      return copiedScore
    },
    /**
     * 퍼팅수 수정 메소드.
     * @param e
     * @param putting
     */
    updatePutterValue(e, putting, player) {
      const {playerId} = putting

      if (e.target.value !== "" && playerId === null) {
        const copiedPutting = this.insertPuttingValue(e, putting, player)
        return this.createRoundPlayerScorePutterListReq(copiedPutting)
      }
      const copiedPutting = {...putting}
      if (e.target.value !== "") {
        copiedPutting.value = e.target.value
        this.createRoundPlayerScorePutterListReq(copiedPutting);
      } else {
        this.dataInvalidMessage(NO_REQUIRED_DATA)
      }
    },
    /**
     * 퍼팅수 수정 메소드.(기존에 등록된 퍼팅수가 없을 때.)
     * @param e
     * @param putting
     * @param player
     * @returns {*}
     */
    insertPuttingValue(e, putting, player) {
      const copiedPutting = {...putting}

      const {playerId} = player
      const holeCd = this.getHoleCdByHoleIndex(copiedPutting.holeIndex)
      const courseCd = this.getCourseNameByHoleIndex(copiedPutting.holeIndex)
      const gubun = '2'
      const {code} = this.currentCompany

      copiedPutting.companyCd = code
      copiedPutting.courseCd = courseCd
      copiedPutting.gubun = gubun
      copiedPutting.holeCd = holeCd
      copiedPutting.playerId = playerId
      copiedPutting.value = e.target.value

      return copiedPutting
    },
    /**
     * 스코어 수정 메소드 request 객체(스코어 스트로크 리스트) 만드는 메소드.
     * @param copiedScore
     */
    createRoundPlayerScoreStrokeListReq(copiedScore) {
      if (this.roundPlayerScoreStrokeList.length === 0) {
        this.roundPlayerScoreStrokeList.push(copiedScore)
      } else {
        const isSamePlayerScoreByHoleCd = this.roundPlayerScoreStrokeList.find((score) => score.playerId === copiedScore.playerId && score.holeCd === copiedScore.holeCd);
        if (isSamePlayerScoreByHoleCd) {
          isSamePlayerScoreByHoleCd.value = copiedScore.value
        } else {
          this.roundPlayerScoreStrokeList.push(copiedScore)
        }
      }
    },
    /**
     * 퍼팅수 수정 메소드 request 객체(스코어 퍼팅수 리스트) 만드는 메소드.
     * @param copiedPutting
     */
    createRoundPlayerScorePutterListReq(copiedPutting) {
      if (this.roundPlayerScorePutterList.length === 0) {
        this.roundPlayerScorePutterList.push(copiedPutting)
      } else {
        const isSamePlayerPuttingByHoleCd = this.roundPlayerScorePutterList.find((score) => score.playerId === copiedPutting.playerId && score.holeCd === copiedPutting.holeCd);
        if (isSamePlayerPuttingByHoleCd) {
          isSamePlayerPuttingByHoleCd.value = copiedPutting.value
        } else {
          this.roundPlayerScorePutterList.push(copiedPutting)
        }
      }
    },
    /**
     * holeIndex로 courseName 가져오는 메소드.
     * @param holeIndex
     * @returns {*}
     */
    getCourseNameByHoleIndex(holeIndex) {
      if (holeIndex <= 9) {
        const firstCourseName = this.selectedRound.round.firstCourse
        return this.getCourseCdByCourseName(firstCourseName)
      } else {
        const secondCourseName = this.selectedRound.round.secondCourse
        return this.getCourseCdByCourseName(secondCourseName)
      }
    },
    /**
     * courseName 으로 courseCd 가져오는 메소드.
     * @param courseName
     * @returns {*}
     */
    getCourseCdByCourseName(courseName) {
      const findCourse = this.currentCompany.courses.find((course) => course.courseNm === courseName)
      return findCourse.courseCd
    },
    /**
     * holeIndex로 holeCd 가져오는 메소드.
     * @param holeIndex
     * @returns {string}
     */
    getHoleCdByHoleIndex(holeIndex) {
      switch (holeIndex) {
        case '1' :
        case '10' :
          return '5'
        case '2' :
        case '11':
          return '6'
        case '3':
        case '12':
          return '7'
        case '4':
        case '13':
          return '8'
        case '5':
        case '14':
          return '9'
        case '6':
        case '15':
          return 'a'
        case '7':
        case '16':
          return 'b'
        case '8':
        case '17':
          return 'c'
        case '9':
        case  '18':
          return '1'
      }
    },
    dataInvalidMessage(title, message) {
      this.toast({title, message})
    },
    ...mapActions({
      updateIsShowingRoundAllScoreDetailModal:
        "dispatchIsShowingRoundAllScoreDetailModal",
      updateIsShowingSMSModal: "dispatchIsShowingSMSModal",
      toast: "toast",
    }),
    ...mapActions("admin/", {
      dispatchClearSelectedRound: "dispatchClearSelectedRound",
      dispatchUpdateSelectedPlayer: "dispatchUpdateSelectedPlayer",
      updateSelectedRound: "dispatchSelectedRound"
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
  word-break: keep-all;
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

.update_input {
  width: 20px;
  height: 25px;
  line-height: 25px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}

</style>
