<template>
  <!--  class="print print_size_a4"-->
  <main id="round-group-ranking-print__container">
    <!-- 시상 -->
    <section class="first-table__wrapper">
      <h2 class="print-title">
        {{ `${getGroupInfo("groupNm")} (${getGroupInfo("visitDt")})` }}
      </h2>

      <table id="first-table">
        <colgroup>
          <col width="7%"/>
          <col width="9%"/>
          <col width="7%"/>
          <col width="7%"/>
          <col width="7%"/>
          <col width="5%"/>
          <col width="7%"/>
          <col width="7%"/>
          <col width="8%"/>
          <col width="7%"/>
          <col width="7%"/>
        </colgroup>
        <thead>
        <tr>
          <template v-for="awardNames in competitionSettingList">
            <th
              class="medal__table__th"
              :key="awardNames.gubun"
              v-if="awardNames.gubun !== '23' && awardNames.gubun !== '24' && awardNames.gubun !== '21'">
              {{ awardNames.displayName }}
            </th>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="awardNames in competitionSettingList">
          <td :key="awardNames.gubun"
              v-if="awardNames.gubun !== '23' && awardNames.gubun !== '24' && awardNames.gubun !== '21'">
            {{ getFirstAwardee(awardNames.gubun) }}
          </td>
        </template>
        </tbody>
      </table>
    </section>

    <!-- 스코어 -->
    <section class="mt">
      <table id="second_table__wrapper">
        <colgroup>
          <template v-if="(isCheckedNewPerio || isCheckedStrokeHandy) && isCheckedFirstSecond">
            <col width="4%"/>

            <col width="5%"/>
            <col width="4%"/>
            <col width="4%"/>
            <col width="4%"/>
            <col width="4%"/>
            <col width="4%"/>
          </template>
          <template v-else-if="!isCheckedNewPerio && isCheckedFirstSecond">
            <col width="4%"/>

            <col width="5%"/>
            <col width="4%"/>
            <col width="4%"/>
            <col width="4%"/>
          </template>
          <template v-else-if="isCheckedNewPerio && !isCheckedFirstSecond">
            <col width="4%"/>

            <col width="5%"/>
            <col width="4%"/>
            <col width="4%"/>
            <col width="4%"/>
          </template>
          <template v-else>
            <col width="4%"/>

            <col width="5%"/>
            <col width="4%"/>
          </template>

          <template v-if="isCheckedLong">
            <col width="5%"/>
            <col width="4%"/>
          </template>

          <template v-if="isCheckedNear">
            <col width="5%"/>
            <col width="4%"/>
          </template>

          <template v-if="isCheckedBuddy">
            <col width="5%"/>
            <col width="3%"/>
          </template>

          <template v-if="isCheckedPar">
            <col width="5%"/>
            <col width="3%"/>
          </template>

          <template v-if="isCheckedOneOver">
            <col width="5%"/>
            <col width="3%"/>
          </template>

          <template v-if="isCheckedTwoOver">
            <col width="5%"/>
            <col width="3%"/>
          </template>

          <template v-if="isCheckedThreeOver">
            <col width="5%"/>
            <col width="3%"/>
          </template>

          <template v-if="isCheckedDoublePar">
            <col width="5%"/>
            <col width="3%"/>
          </template>

          <template v-if="isCheckedFirstSecondGap">
            <col width="5%"/>
            <col width="4%"/>
          </template>

          <template v-if="isCheckedLucky">
            <col width="5%"/>
            <col width="4%"/>
          </template>
        </colgroup>
        <thead>
        <tr>
          <th rowspan="2">순위</th>
          <template v-if="(isCheckedNewPerio || isCheckedStrokeHandy) && isCheckedFirstSecond">
            <th colspan="6">Score</th>
          </template>
          <template v-else-if="!isCheckedNewPerio && isCheckedFirstSecond">
            <th colspan="4">Score</th>
          </template>
          <template v-else-if="isCheckedNewPerio && !isCheckedFirstSecond">
            <th colspan="4">Score</th>
          </template>
          <template v-else>
            <th colspan="2">Score</th>
          </template>

          <th colspan="4" v-if="isCheckedLong && isCheckedNear">롱/니어</th>
          <th colspan="2" v-if="!isCheckedLong && isCheckedNear">롱/니어</th>
          <th colspan="2" v-if="isCheckedLong && !isCheckedNear">롱/니어</th>

          <th colspan="2" v-if="isCheckedBuddy">버디</th>
          <th colspan="2" v-if="isCheckedPar">파</th>
          <th colspan="2" v-if="isCheckedOneOver">보기</th>
          <th colspan="2" v-if="isCheckedTwoOver">더블보기</th>
          <th colspan="2" v-if="isCheckedThreeOver">트리플보기</th>
          <th colspan="2" v-if="isCheckedDoublePar">더블파</th>
          <th colspan="2" v-if="isCheckedFirstSecondGap">전후반차</th>
          <th colspan="2" v-if="isCheckedLucky">행운상</th>
        </tr>
        <template v-if="(isCheckedNewPerio || isCheckedStrokeHandy) && isCheckedFirstSecond">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">전반</th>
          <th class="second-head-column">후반</th>
          <th class="second-head-column">Total</th>
          <th class="second-head-column">Hcp</th>
          <th class="second-head-column">Net</th>
        </template>
        <template v-else-if="!isCheckedNewPerio && isCheckedFirstSecond">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">전반</th>
          <th class="second-head-column">후반</th>
          <th class="second-head-column">Total</th>
        </template>
        <template v-else-if="isCheckedNewPerio && !isCheckedFirstSecond">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">Total</th>
          <th class="second-head-column">Hcp</th>
          <th class="second-head-column">Net</th>
        </template>
        <template v-else>
          <th class="second-head-column">이름</th>
          <th class="second-head-column">Total</th>
        </template>

        <template v-if="isCheckedLong">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">롱기</th>
        </template>

        <template v-if="isCheckedNear">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">니어</th>
        </template>

        <template v-if="isCheckedBuddy">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">개</th>
        </template>

        <template v-if="isCheckedPar">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">개</th>
        </template>

        <template v-if="isCheckedOneOver">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">개</th>
        </template>

        <template v-if="isCheckedTwoOver">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">개</th>
        </template>

        <template v-if="isCheckedThreeOver">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">개</th>
        </template>

        <template v-if="isCheckedDoublePar">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">개</th>
        </template>

        <template v-if="isCheckedFirstSecondGap">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">차이</th>
        </template>

        <template v-if="isCheckedLucky">
          <th class="second-head-column">이름</th>
          <th class="second-head-column">Lucky</th>
        </template>
        </thead>
        <tbody>
        <tr v-for="i in selectedRoundGroupRank.playerCount" :key="i">
          <td>{{ i }}</td>
          <template v-if="(isCheckedNewPerio || isCheckedStrokeHandy) && isCheckedFirstSecond">
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "firstScore"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "secondScore"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "totScoreByNewPerio"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "handyValue"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "netScore"
                )
              }}
            </td>
          </template>
          <template v-else-if="!isCheckedNewPerio && isCheckedFirstSecond">
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
                  "firstScore"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
                  "secondScore"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
                  "totalScore"
                )
              }}
            </td>
          </template>
          <template v-else-if="isCheckedNewPerio && !isCheckedFirstSecond">
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "totScoreByNewPerio"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "handyValue"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                  "netScore"
                )
              }}
            </td>
          </template>
          <template v-else>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getScorePlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
                  "totalScore"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedLong">
            <td>
              {{
                getLongOrNearPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerLongRankVOList,
                  "playerLongNm"
                )
              }}
            </td>
            <td>
              {{
                getLongOrNearPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerLongRankVOList,
                  "longValue"
                )
              }}
            </td>
          </template>
          <template v-if="isCheckedNear">
            <td>
              {{
                getLongOrNearPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNearRankVOList,
                  "playerNearNm"
                )
              }}
            </td>
            <td>
              {{
                getLongOrNearPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerNearRankVOList,
                  "nearValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedBuddy">
            <td>
              {{
                getBuddyPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerBuddyRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getBuddyPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerBuddyRankVOList,
                  "buddyValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedPar">
            <td>
              {{
                getParPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerParRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getParPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerParRankVOList,
                  "parValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedOneOver">
            <td>
              {{
                getOneOverPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerOneOverRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getOneOverPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerOneOverRankVOList,
                  "oneOverValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedTwoOver">
            <td>
              {{
                getTwoOverPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerTwoOverRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getTwoOverPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerTwoOverRankVOList,
                  "twoOverValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedThreeOver">
            <td>
              {{
                getThreeOverPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerThreeOverRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getThreeOverPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerThreeOverRankVOList,
                  "threeOverValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedDoublePar">
            <td>
              {{
                getDoubleParPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerDoubleParRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getDoubleParPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerDoubleParRankVOList,
                  "doubleParValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedFirstSecondGap">
            <td>
              {{
                getFirstSecondGapPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerFirstSecondGapRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              {{
                getFirstSecondGapPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerFirstSecondGapRankVOList,
                  "gapValue"
                )
              }}
            </td>
          </template>

          <template v-if="isCheckedLucky">
            <td>
              {{
                getLuckyPlayerInfo(
                  i - 1,
                  selectedRoundGroupRank.roundGroupPlayerLuckyYnRankVOList,
                  "playerNm"
                )
              }}
            </td>
            <td>
              <div>
                <i
                  class="lucky_check"
                  v-if="
                      getLuckyPlayerInfo(
                        i - 1,
                        selectedRoundGroupRank.roundGroupPlayerLuckyYnRankVOList,
                        'luckyValue'
                      ) === 'N'
                    "
                ></i>
                <i
                  class="fas fa-check lucky_check checker"
                  v-if="
                      getLuckyPlayerInfo(
                        i - 1,
                        selectedRoundGroupRank.roundGroupPlayerLuckyYnRankVOList,
                        'luckyValue'
                      ) === 'Y'
                    "
                ></i>
              </div>
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import TimeUtil from "@/utils/datetime/TimeUtil";
import DateUtil from "@/utils/datetime/DateUtil";
import {mapGetters} from "vuex";

export default {
  name: "RoundGroupRankingPrint",
  props: {
    selectedRoundGroupRank: {type: Object, require: true},
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
    competitionSettingList() {
      return this.selectedRoundGroupCompetitionSettingList.competitionSettingList.filter((award) => award.checkYn === 'Y')
    },

    ...mapGetters("admin/", {
      selectedRoundGroup: "getSelectedRoundGroup",
      selectedRoundGroupCompetitionSettingList: 'getSelectedRoundGroupCompetitionSettingList',
      isCheckedLong: 'getIsCheckedLong',
      isCheckedNear: 'getIsCheckedNear',
      isCheckedBuddy: 'getIsCheckedBuddy',
      isCheckedPar: 'getIsCheckedPar',
      isCheckedOneOver: 'getIsCheckedOneOver',
      isCheckedTwoOver: 'getIsCheckedTwoOver',
      isCheckedThreeOver: 'getIsCheckedThreeOver',
      isCheckedDoublePar: 'getIsCheckedDoublePar',
      isCheckedFirstSecondGap: 'getIsCheckedFirstSecondGap',
      isCheckedLucky: 'getIsCheckedLucky',
      isCheckedNewPerio: 'getIsCheckedNewPerio',
      isCheckedFirstSecond: 'getIsCheckedFirstSecond',
      isCheckedStrokeHandy: 'getIsCheckedStrokeHandy',
      isCheckedHonest: 'getIsCheckedHonest',
    })
  },
  methods: {
    /**
     * 그룹이름, 티업날짜를 리턴해주는 메소드.
     * */
    getGroupInfo(type) {
      switch (type) {
        case "groupNm":
          return this.selectedRoundGroupRank?.round?.groupNm;
        case "visitDt":
          return this.parsedVisitDt(
            this.selectedRoundGroupRank?.round?.visitDt
          );
      }
    },

    /**
     * visitDt 포맷팅.
     * input : 20210914
     * output : 2021.09.14
     * */
    parsedVisitDt(visitDt) {
      const date = DateUtil.eightToDate(visitDt);
      const {year, month, day} = DateUtil.dateDivider(date);
      return `${year}.${month}.${day}`;
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
        case "playerNm":
          return score[i]?.playerNm;
        case "totalScore":
          return score[i]?.totScore;
        case "handyValue":
          return score[i]?.handyValue;
        case "netScore":
          return score[i]?.netScore;
        case "totScoreByNewPerio":
          return score[i].totScore;
        case "firstScore":
          return score[i]?.firstScore;
        case "secondScore":
          return score[i]?.secondScore;
        default:
          return score[i];
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
        case "playerLongNm":
          return longOrNear[i]?.playerNm;
        case "longValue":
          return longOrNear[i]?.value;
        case "playerNearNm":
          return longOrNear[i]?.playerNm;
        case "nearValue":
          return longOrNear[i].value;
        default:
          return longOrNear[i];
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
        case "playerNm":
          return buddy[i]?.playerNm;
        case "buddyValue":
          return buddy[i]?.value;
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
        case "playerNm":
          return par[i]?.playerNm;
        case "parValue":
          return par[i]?.value;
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
        case "playerNm":
          return doublePar[i].playerNm;
        case "doubleParValue":
          return doublePar[i].value;
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
        case "playerNm":
          return oneOver[i]?.playerNm;
        case "oneOverValue":
          return oneOver[i]?.value;
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
        case "playerNm":
          return twoOver[i]?.playerNm;
        case "twoOverValue":
          return twoOver[i]?.value;
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
        case "playerNm":
          return threeOver[i]?.playerNm;
        case "threeOverValue":
          return threeOver[i]?.value;
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
        case "playerNm":
          return gap[i].playerNm;
        case "gapValue":
          return gap[i].value;
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
        case "playerNm":
          return luckyYn[i].playerNm;
        case "luckyValue":
          return luckyYn[i].value;
      }
    },
    getFirstAwardee(gubun) {
      switch (gubun) {
        case '10':
          return this.updatedTotRankPlayerNm ? this.updatedTotRankPlayerNm : this.selectedRoundGroup.roundGroupPlayerScoreRankVOList[0].playerNm;
        case '11': //신페리오
          return this.updatedScoreRankPlayerNm ? this.updatedScoreRankPlayerNm : this.selectedRoundGroup.roundGroupPlayerNewPerioRankVOList[0].playerNm;
        case '12': //롱
          return this.updatedLongestPlayerNm ? this.updatedLongestPlayerNm : this.selectedRoundGroup.roundGroupPlayerLongRankVOList[0].playerNm;
        case '13': //니어
          return this.updatedNearestPlayerNm ? this.updatedNearestPlayerNm : this.selectedRoundGroup.roundGroupPlayerNearRankVOList[0].playerNm;
        case '14': //버디
          return this.updatedBuddyPlayerNm ? this.updatedBuddyPlayerNm : this.selectedRoundGroup.roundGroupPlayerBuddyRankVOList[0].playerNm;
        case '15': //파
          return this.updatedParPlayerNm ? this.updatedParPlayerNm : this.selectedRoundGroup.roundGroupPlayerParRankVOList[0].playerNm;
        case '16': //보기
          return this.updatedOneOverPlayerNm ? this.updatedOneOverPlayerNm : this.selectedRoundGroup.roundGroupPlayerOneOverRankVOList[0].playerNm;
        case '17': //더블보기
          return this.updatedTwoOverPlayerNm ? this.updatedTwoOverPlayerNm : this.selectedRoundGroup.roundGroupPlayerTwoOverRankVOList[0].playerNm;
        case '18' :  //트리플보기
          return this.updatedThreeOverPlayerNm ? this.updatedThreeOverPlayerNm : this.selectedRoundGroup.roundGroupPlayerThreeOverRankVOList[0].playerNm;
        case '19': // 더블파
          return this.updatedDoubleParPlayerNm ? this.updatedDoubleParPlayerNm : this.selectedRoundGroup.roundGroupPlayerDoubleParRankVOList[0].playerNm;
        case '20' : //  전,후반차
          return this.updatedFirstSecondGapPlayerNm ? this.updatedFirstSecondGapPlayerNm : this.selectedRoundGroup.roundGroupPlayerFirstSecondGapRankVOList[0].playerNm;
        case '22' : //스트로크 핸디
          return '스트로크핸디'
      }
    }
  },
};
</script>

<style scoped>
#round-group-ranking-print__container {
  position: relative;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  grid-template-columns: repeat(10, 1fr);
  width: 95%;
  margin: 8mm auto;
  opacity: 1;
  visibility: visible;
  display: none;
}

#excel__medal__table {
  width: 100%;
}

/* common start */
table {
  width: 100%;
  text-align: center;
}

th,
td {
  padding: 0.25rem;
  border: 1px solid gray;
}

th {
  background-color: var(--khaki);
  color: var(--amber);
}

/* common end */

#second_table__wrapper .second-head-column {
  background-color: var(--amber);
  height: 30px;
  color: var(--khaki);
}

#second_table__wrapper tr:nth-child(even) > td {
  background-color: var(--table-gray);
}

/* @page {
  size: A4 landscape;
} */

@media print {
  .page_divide {
    page-break-after: always;
  }
}
</style>
