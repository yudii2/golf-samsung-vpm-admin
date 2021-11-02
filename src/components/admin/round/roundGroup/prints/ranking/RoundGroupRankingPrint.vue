<template>
  <!--  class="print print_size_a4"-->
  <main id="round_group_ranking_photo__container" class="print_rank_setting">
    <!-- 시상 -->
    <section>
      <div>
        <h2 class="title_wrapper">
          {{ `${getGroupInfo('groupNm')} (${getGroupInfo('visitDt')})` }}
        </h2>
        <table id="first_table__wrapper">
          <colgroup>
            <col width="7%">
            <col width="9%">
            <col width="7%">
            <col width="7%">
            <col width="7%">
            <col width="5%">
            <col width="7%">
            <col width="7%">
            <col width="8%">
            <col width="7%">
            <col width="7%">
          </colgroup>
          <thead>
          <tr>
            <th>
              <span v-if="medalist">{{ medalist }}</span>
              <span v-else>{{ '메달리스트' }}</span>
            </th>
            <th v-if="isCheckedNewPerio">
              <span v-if="newPerioWinner">{{ newPerioWinner }}</span>
              <span v-else>{{ '신페리오 우승' }}</span>
            </th>
            <th v-if="isCheckedLongAndNear">
              <span v-if="longestWinner">{{ longestWinner }}</span>
              <span v-else>{{ '롱기스트' }}</span>
            </th>
            <th v-if="isCheckedLongAndNear">
              <span v-if="nearestWinner">{{ nearestWinner }}</span>
              <span v-else>{{ '니어리스트' }}</span>
            </th>
            <th v-if="isCheckedBuddy">
              <span v-if="buddyWinner">{{ buddyWinner }}</span>
              <span v-else>{{ '버디' }}</span>
            </th>
            <th v-if="isCheckedPar">
              <span v-if="parWinner">{{ parWinner }}</span>
              <span v-else>{{ '파' }}</span>
            </th>
            <th v-if="isCheckedOneOver">
              <span v-if="oneOverWinner">{{ oneOverWinner }}</span>
              <span v-else>{{ '보기' }}</span>
            </th>
            <th v-if="isCheckedTwoOver">
              <span v-if="twoOverWinner">{{ twoOverWinner }}</span>
              <span v-else>{{ '더블보기' }}</span>
            </th>
            <th v-if="isCheckedThreeOver">
              <span v-if="threeOverWinner">{{ threeOverWinner }}</span>
              <span v-else>{{ '트리플보기' }}</span>
            </th>
            <th v-if="isCheckedDoublePar">
              <span v-if="doubleParWinner">{{ doubleParWinner }}</span>
              <span v-else>{{ '더블파' }}</span>
            </th>
            <th v-if="isCheckedFirstSecondGap">
              <span v-if="firstSecondGapWinner">{{ firstSecondGapWinner }}</span>
              <span v-else>{{ '전후반' }}</span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td v-if="medalistPlayerNm">
              <span v-if="updatedTotRankPlayerNm">{{ updatedTotRankPlayerNm }}</span>
              <span v-else>{{ medalistPlayerNm }}</span>
            </td>
            <td v-if="isCheckedNewPerio">
              <span v-if="updatedScoreRankPlayerNm">{{ updatedScoreRankPlayerNm }}</span>
              <span v-else>{{ newPerioWinnerPlayerNm }}</span>
            </td>
            <td v-if="isCheckedLongAndNear">
              <span v-if="updatedLongestPlayerNm">{{ updatedLongestPlayerNm }}</span>
              <span v-else>{{ longestPlayerNm }}</span>
            </td>
            <td v-if="isCheckedLongAndNear">
              <span v-if="updatedNearestPlayerNm">{{ updatedNearestPlayerNm }}</span>
              <span v-else>{{ nearestPlayerNm }}</span>
            </td>
            <td v-if="isCheckedBuddy">
              <span v-if="updatedBuddyPlayerNm">{{ updatedBuddyPlayerNm }}</span>
              <span v-else>{{ buddyPlayerNm }}</span>
            </td>
            <td v-if="isCheckedPar">
              <span v-if="updatedParPlayerNm">{{ updatedParPlayerNm }}</span>
              <span v-else>{{ parPlayerNm }}</span>
            </td>
            <td v-if="isCheckedOneOver">
              <span v-if="updatedOneOverPlayerNm">{{ updatedOneOverPlayerNm }}</span>
              <span v-else>{{ oneOverPlayerNm }}</span>
            </td>
            <td v-if="isCheckedTwoOver">
              <span v-if="updatedTwoOverPlayerNm">{{ updatedTwoOverPlayerNm }}</span>
              <span v-else>{{ twoOverPlayerNm }}</span>
            </td>
            <td v-if="isCheckedThreeOver">
              <span v-if="updatedThreeOverPlayerNm">{{ updatedThreeOverPlayerNm }}</span>
              <span v-else>{{ threeOverPlayerNm }}</span>
            </td>
            <td v-if="isCheckedDoublePar">
              <span v-if="updatedDoubleParPlayerNm">{{ updatedDoubleParPlayerNm }}</span>
              <span v-else>{{ doubleParPlayerNm }}</span>
            </td>
            <td v-if="isCheckedFirstSecondGap">
              <span v-if="updatedFirstSecondGapPlayerNm">{{ updatedFirstSecondGapPlayerNm }}</span>
              <span v-else>{{ firstSecondGapPlayerNm }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
    <!-- //시상 -->

    <section>
      <div class="page_divide">
        <table id="second_table__wrapper">
          <colgroup>
            <template v-if="isCheckedNewPerio">
              <col width="4%">

              <col width="7%">
              <col width="4%">
              <col width="4%">
              <col width="4%">
              <col width="4%">
              <col width="4%">
            </template>
            <template v-else>
              <col width="4%">

              <col width="7%">
              <col width="4%">
              <col width="4%">
              <col width="4%">
            </template>

            <template v-if="isCheckedLongAndNear">
              <col width="7%">
              <col width="4%">
              <col width="7%">
              <col width="4%">
            </template>

            <template v-if="isCheckedBuddy">
              <col width="7%">
              <col width="3%">
            </template>

            <template v-if="isCheckedPar">
              <col width="7%">
              <col width="3%">
            </template>

            <template v-if="isCheckedOneOver">
              <col width="7%">
              <col width="3%">
            </template>

            <template v-if="isCheckedTwoOver">
              <col width="7%">
              <col width="3%">
            </template>

            <template v-if="isCheckedThreeOver">
              <col width="7%">
              <col width="3%">
            </template>

            <template v-if="isCheckedDoublePar">
              <col width="7%">
              <col width="3%">
            </template>

            <template v-if="isCheckedFirstSecondGap">
              <col width="7%">
              <col width="4%">
            </template>

            <template v-if="isCheckedLucky">
              <col width="7%">
              <col width="4%">
            </template>
          </colgroup>
          <thead>
          <tr>
            <th rowspan="2">순위</th>
            <template v-if="isCheckedNewPerio">
              <th colspan="6">Score</th>
            </template>
            <template v-else>
              <th colspan="4">Score</th>
            </template>
            <th colspan="4" v-if="isCheckedLongAndNear">롱/니어</th>
            <th colspan="2" v-if="isCheckedBuddy">버디</th>
            <th colspan="2" v-if="isCheckedPar">파</th>
            <th colspan="2" v-if="isCheckedOneOver">보기</th>
            <th colspan="2" v-if="isCheckedTwoOver">더블보기</th>
            <th colspan="2" v-if="isCheckedThreeOver">트리플보기</th>
            <th colspan="2" v-if="isCheckedDoublePar">더블파</th>
            <th colspan="2" v-if="isCheckedFirstSecondGap">전후반차</th>
            <th colspan="2" v-if="isCheckedLucky">행운상</th>
          </tr>
          <template v-if="isCheckedNewPerio">
            <th class="second_column">이름</th>
            <th class="second_column">전반</th>
            <th class="second_column">후반</th>
            <th class="second_column">Total</th>
            <th class="second_column">Hcp</th>
            <th class="second_column">Net</th>
          </template>
          <template v-else>
            <th class="second_column">이름</th>
            <th class="second_column">전반</th>
            <th class="second_column">후반</th>
            <th class="second_column">Total</th>
          </template>

          <template v-if="isCheckedLongAndNear">
            <th class="second_column">이름</th>
            <th class="second_column">롱기</th>
            <th class="second_column">이름</th>
            <th class="second_column">니어</th>
          </template>

          <template v-if="isCheckedBuddy">
            <th class="second_column">이름</th>
            <th class="second_column">개</th>
          </template>

          <template v-if="isCheckedPar">
            <th class="second_column">이름</th>
            <th class="second_column">개</th>
          </template>

          <template v-if="isCheckedOneOver">
            <th class="second_column">이름</th>
            <th class="second_column">개</th>
          </template>

          <template v-if="isCheckedTwoOver">
            <th class="second_column">이름</th>
            <th class="second_column">개</th>
          </template>

          <template v-if="isCheckedThreeOver">
            <th class="second_column">이름</th>
            <th class="second_column">개</th>
          </template>

          <template v-if="isCheckedDoublePar">
            <th class="second_column">이름</th>
            <th class="second_column">개</th>
          </template>

          <template v-if="isCheckedFirstSecondGap">
            <th class="second_column">이름</th>
            <th class="second_column">차이</th>
          </template>

          <template v-if="isCheckedLucky">
            <th class="second_column">이름</th>
            <th class="second_column">Lucky</th>
          </template>
          </thead>
          <tbody>
          <tr v-for="i in selectedRoundGroupRank.playerCount">
            <td>{{ i }}</td>
            <template v-if="isCheckedNewPerio">
              <td>{{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList, 'playerNm')
                }}
              </td>
              <td>
                {{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList, 'firstScore')
                }}
              </td>
              <td>
                {{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList, 'secondScore')
                }}
              </td>
              <td>{{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList, 'totScoreByNewPerio')
                }}
              </td>
              <td>{{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList, 'handyValue')
                }}
              </td>
              <td>
                {{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList, 'netScore')
                }}
              </td>

            </template>
            <template v-else>
              <td>{{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerScoreRankVOList, 'playerNm')
                }}
              </td>
              <td>
                {{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerScoreRankVOList, 'firstScore')
                }}
              </td>
              <td>
                {{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerScoreRankVOList, 'secondScore')
                }}
              </td>

              <td>{{
                  getScorePlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerScoreRankVOList, 'totalScore')
                }}
              </td>
            </template>


            <template v-if="isCheckedLongAndNear">
              <td>
                {{
                  getLongOrNearPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerLongRankVOList, 'playerLongNm')
                }}
              </td>
              <td>
                {{
                  getLongOrNearPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerLongRankVOList, 'longValue')
                }}
              </td>
              <td>
                {{
                  getLongOrNearPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNearRankVOList, 'playerNearNm')
                }}
              </td>
              <td>
                {{
                  getLongOrNearPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerNearRankVOList, 'nearValue')
                }}
              </td>
            </template>

            <template v-if="isCheckedBuddy">
              <td>
                {{ getBuddyPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerBuddyRankVOList, 'playerNm') }}
              </td>
              <td>
                {{ getBuddyPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerBuddyRankVOList, 'buddyValue') }}
              </td>
            </template>

            <template v-if="isCheckedPar">
              <td>{{ getParPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerParRankVOList, 'playerNm') }}</td>
              <td>{{ getParPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerParRankVOList, 'parValue') }}</td>
            </template>

            <template v-if="isCheckedOneOver">
              <td>
                {{
                  getOneOverPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerOneOverRankVOList, 'playerNm')
                }}
              </td>
              <td>
                {{
                  getOneOverPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerOneOverRankVOList, 'oneOverValue')
                }}
              </td>
            </template>

            <template v-if="isCheckedTwoOver">
              <td>
                {{
                  getTwoOverPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerTwoOverRankVOList, 'playerNm')
                }}
              </td>
              <td>
                {{
                  getTwoOverPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerTwoOverRankVOList, 'twoOverValue')
                }}
              </td>
            </template>

            <template v-if="isCheckedThreeOver">
              <td>
                {{
                  getThreeOverPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerThreeOverRankVOList, 'playerNm')
                }}
              </td>
              <td>
                {{
                  getThreeOverPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerThreeOverRankVOList, 'threeOverValue')
                }}
              </td>
            </template>

            <template v-if="isCheckedDoublePar">
              <td>
                {{
                  getDoubleParPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerDoubleParRankVOList, 'playerNm')
                }}
              </td>
              <td>
                {{
                  getDoubleParPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerDoubleParRankVOList, 'doubleParValue')
                }}
              </td>
            </template>

            <template v-if="isCheckedFirstSecondGap">
              <td>
                {{
                  getFirstSecondGapPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerFirstSecondGapRankVOList, 'playerNm')
                }}
              </td>
              <td>
                {{
                  getFirstSecondGapPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerFirstSecondGapRankVOList, 'gapValue')
                }}
              </td>
            </template>

            <template v-if="isCheckedLucky">
              <td>
                {{ getLuckyPlayerInfo(i - 1, selectedRoundGroupRank.roundGroupPlayerLuckyYnRankVOList, 'playerNm') }}
              </td>
              <td>
                <div>
                  <i class="lucky_check"
                     v-if="getLuckyPlayerInfo(i-1, selectedRoundGroupRank.roundGroupPlayerLuckyYnRankVOList, 'luckyValue') === 'N'"></i>
                  <i class="fas fa-check lucky_check checker"
                     v-if="getLuckyPlayerInfo(i-1, selectedRoundGroupRank.roundGroupPlayerLuckyYnRankVOList, 'luckyValue') === 'Y'"
                  ></i>
                </div>
              </td>
            </template>
          </tr>

          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import TimeUtil from "@/utils/datetime/TimeUtil";
import DateUtil from "@/utils/datetime/DateUtil";

export default {
  name: "RoundGroupRankingPrint",
  props: {
    selectedRoundGroupRank: {type: Object, require: true},
    isCheckedLongAndNear: {type: Boolean, require: true},
    isCheckedBuddy: {type: Boolean, require: true},
    isCheckedPar: {type: Boolean, require: true},
    isCheckedOneOver: {type: Boolean, require: true},
    isCheckedTwoOver: {type: Boolean, require: true},
    isCheckedThreeOver: {type: Boolean, require: true},
    isCheckedDoublePar: {type: Boolean, require: true},
    isCheckedFirstSecondGap: {type: Boolean, require: true},
    isCheckedLucky: {type: Boolean, require: true},
    isCheckedNewPerio: {type: Boolean, require: true},
    medalist: {type: String, required: false},
    newPerioWinner: {type: String, required: false},
    longestWinner: {type: String, required: false},
    nearestWinner: {type: String, required: false},
    buddyWinner: {type: String, required: false},
    parWinner: {type: String, required: false},
    oneOverWinner: {type: String, required: false},
    twoOverWinner: {type: String, required: false},
    threeOverWinner: {type: String, required: false},
    doubleParWinner: {type: String, required: false},
    firstSecondGapWinner: {type: String, required: false},
    medalistPlayerNm: {type: String, required: false},
    newPerioWinnerPlayerNm: {type: String, required: false},
    longestPlayerNm: {type: String, required: true},
    nearestPlayerNm: {type: String, required: true},
    buddyPlayerNm: {type: String, required: true},
    parPlayerNm: {type: String, required: true},
    oneOverPlayerNm: {type: String, required: true},
    twoOverPlayerNm: {type: String, required: true},
    threeOverPlayerNm: {type: String, required: true},
    doubleParPlayerNm: {type: String, required: true},
    firstSecondGapPlayerNm: {type: String, required: true},
    updatedTotRankPlayerNm: {type: String, required: false},
    updatedScoreRankPlayerNm: {type: String, required: false},
    updatedLongestPlayerNm: {type: String, required: false},
    updatedNearestPlayerNm: {type: String, required: false},
    updatedBuddyPlayerNm: {type: String, required: false},
    updatedParPlayerNm: {type: String, required: false},
    updatedOneOverPlayerNm: {type: String, required: false},
    updatedTwoOverPlayerNm: {type: String, required: false},
    updatedThreeOverPlayerNm: {type: String, required: false},
    updatedDoubleParPlayerNm: {type: String, required: false},
    updatedFirstSecondGapPlayerNm: {type: String, required: false},
  },
  computed: {
    /**
     * bookgTime 포맷팅.
     * input : 0600
     * output : 06:00
     * */
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },

  },
  methods: {
    /**
     * 그룹이름, 티업날짜를 리턴해주는 메소드.
     * */
    getGroupInfo(type) {
      switch (type) {
        case 'groupNm':
          return this.selectedRoundGroupRank?.round?.groupNm
        case 'visitDt':
          return this.parsedVisitDt(this.selectedRoundGroupRank?.round?.visitDt)
      }
    },

    /**
     * visitDt 포맷팅.
     * input : 20210914
     * output : 2021.09.14
     * */
    parsedVisitDt(visitDt) {
      const date = DateUtil.eightToDate(visitDt)
      const {year, month, day} = DateUtil.dateDivider(date)
      return `${year}.${month}.${day}`
    },

    /**
     * score 값 화면에 표시.
     * @param i
     * @param score
     * @param type
     * @returns {*}
     */
    getScorePlayerInfo(i, score, type) {
      switch (type) {
        case 'playerNm':
          return score[i]?.playerNm
        case 'totalScore' :
          return score[i]?.totScore
        case 'handyValue':
          return score[i]?.handyValue
        case 'netScore':
          return score[i]?.netScore
        case 'totScoreByNewPerio':
          return score[i].totScore
        case 'firstScore' :
          return score[i]?.firstScore
        case 'secondScore':
          return score[i]?.secondScore
        default:
          return score[i]
      }
    },

    /**
     * 롱/니어 값 화면에 표시.
     * @param i
     * @param longOrNear
     * @param type
     * @returns {*}
     */
    getLongOrNearPlayerInfo(i, longOrNear, type) {
      switch (type) {
        case 'playerLongNm':
          return longOrNear[i]?.playerNm
        case 'longValue':
          return longOrNear[i]?.value
        case 'playerNearNm':
          return longOrNear[i]?.playerNm
        case 'nearValue':
          return longOrNear[i].value
        default :
          return longOrNear[i]
      }
    },

    /**
     * 버디 값 화면에 표시.
     * @param i
     * @param buddy
     * @param type
     * @returns {*}
     */
    getBuddyPlayerInfo(i, buddy, type) {
      switch (type) {
        case 'playerNm':
          return buddy[i]?.playerNm
        case 'buddyValue':
          return buddy[i]?.value
      }
    },

    /**
     * 파 값 화면에 표시.
     * @param i
     * @param par
     * @param type
     * @returns {*}
     */
    getParPlayerInfo(i, par, type) {
      switch (type) {
        case 'playerNm':
          return par[i]?.playerNm
        case 'parValue':
          return par[i]?.value
      }
    },

    /**
     * 더블파 값 화면에 표시.
     * @param i
     * @param doublePar
     * @param type
     * @returns {*}
     */
    getDoubleParPlayerInfo(i, doublePar, type) {
      switch (type) {
        case 'playerNm':
          return doublePar[i].playerNm
        case 'doubleParValue':
          return doublePar[i].value
      }
    },

    /**
     * 보기 값 화면에 표시.
     * @param i
     * @param oneOver
     * @param type
     * @returns {*}
     */
    getOneOverPlayerInfo(i, oneOver, type) {
      switch (type) {
        case 'playerNm':
          return oneOver[i]?.playerNm
        case 'oneOverValue':
          return oneOver[i]?.value
      }
    },

    /**
     * 더블보기 값 화면에 표시.
     * @param i
     * @param twoOver
     * @param type
     * @returns {*}
     */
    getTwoOverPlayerInfo(i, twoOver, type) {
      switch (type) {
        case 'playerNm':
          return twoOver[i]?.playerNm
        case 'twoOverValue':
          return twoOver[i]?.value
      }
    },

    /**
     * 트리플보기 값 화면에 표시.
     * @param i
     * @param threeOver
     * @param type
     * @returns {*}
     */
    getThreeOverPlayerInfo(i, threeOver, type) {
      switch (type) {
        case 'playerNm':
          return threeOver[i]?.playerNm
        case 'threeOverValue':
          return threeOver[i]?.value
      }
    },

    /**
     * 전후반차 값 화면에 표시.
     * @param i
     * @param gap
     * @param type
     * @returns {*}
     */
    getFirstSecondGapPlayerInfo(i, gap, type) {
      switch (type) {
        case 'playerNm':
          return gap[i].playerNm
        case 'gapValue':
          return gap[i].value
      }
    },

    /**
     * 행운상 값 화면에 표시.
     * @param i
     * @param luckyYn
     * @param type
     * @returns {*}
     */
    getLuckyPlayerInfo(i, luckyYn, type) {
      switch (type) {
        case 'playerNm':
          return luckyYn[i].playerNm
        case 'luckyValue' :
          return luckyYn[i].value
      }
    },
  }
};
</script>

<style scoped>
#round_group_ranking_photo__container {
  grid-template-columns: repeat(10, 1fr);
  width: 90%;
  margin: 10mm auto;
  /*right: -20%;*/
  /*opacity: 1;*/
  /*visibility: visible;*/

}

#round_group_ranking_photo__container .title_wrapper {
  margin-bottom: 20px;
}

#first_table__wrapper {
  margin-bottom: 20px;
  width: 100%;
}

/* common start */
#round_group_ranking_photo__container table {
  width: 100%;
  text-align: center;
}

#round_group_ranking_photo__container th,
#round_group_ranking_photo__container td {
  padding: 0.25rem;
  border: 1px solid gray;
}

#round_group_ranking_photo__container th {
  background-color: #31462c;
  color: #ebb87c;
}

/* common end */

/* grid position start */
#round_group_ranking_photo__container section:nth-child(1) {
  grid-column: 1/4;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#round_group_ranking_photo__container section:nth-child(2) {
  grid-column: 4/11;
}

.print_rank_setting {
  position: relative;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
}

/*.print_size_a4_setting {*/
/*  max-width: 29.7cm;*/
/*  max-height: 21cm;*/
/*}*/

#second_table__wrapper .second_column {
  background-color: #ebb87c;
  height: 30px;
  color: #31462c
}

#second_table__wrapper tr:nth-child(even) > td {
  background-color: #EAEAEA
}

@page {
  size: A4 landscape;
}

@media print {
  .page_divide {
    page-break-after: always;
  }
}
</style>
