<template>
  <div class="backdrop">
    <main id="round_group_ranking_modal__container" class="modal__container">
      <CloseButton @onClose="handleClickClose" />

      <RoundGroupRankingHeader
        :isUpdatable="isUpdatable"
        :selectedRoundGroup="selectedRoundGroup"
        @handleClickPrint="handleClickPrint"
        @handleClickReset="handleClickReset"
        @handleClickUpdateAndSave="handleClickUpdateAndSave"
        @handleExcelDownload="handleExcelDownload"
      />

      <!-- 체크박스 -->
      <RoundGroupRankingCheckBoxes
        :isCheckedLongAndNear="isCheckedLongAndNear"
        :isCheckedBuddy="isCheckedBuddy"
        :isCheckedPar="isCheckedPar"
        :isCheckedOneOver="isCheckedOneOver"
        :isCheckedTwoOver="isCheckedTwoOver"
        :isCheckedThreeOver="isCheckedThreeOver"
        :isCheckedDoublePar="isCheckedDoublePar"
        :isCheckedFirstSecondGap="isCheckedFirstSecondGap"
        :isCheckedLucky="isCheckedLucky"
        :isCheckedNewPerio="isCheckedNewPerio"
        @handleCheckBoxClick="handleCheckBoxClick"
      />
      <!-- //체크박스 -->

      <!-- 시상 -->
      <section>
        <RoundGroupRankingAwardTable
          :isUpdatable="isUpdatable"
          :isCheckedLongAndNear="isCheckedLongAndNear"
          :isCheckedBuddy="isCheckedBuddy"
          :isCheckedPar="isCheckedPar"
          :isCheckedOneOver="isCheckedOneOver"
          :isCheckedTwoOver="isCheckedTwoOver"
          :isCheckedThreeOver="isCheckedThreeOver"
          :isCheckedDoublePar="isCheckedDoublePar"
          :isCheckedFirstSecondGap="isCheckedFirstSecondGap"
          :isCheckedLucky="isCheckedLucky"
          :isCheckedNewPerio="isCheckedNewPerio"
          :medalist="medalist"
          :newPerioWinner="newPerioWinner"
          :longestWinner="longestWinner"
          :nearestWinner="nearestWinner"
          :buddyWinner="buddyWinner"
          :parWinner="parWinner"
          :oneOverWinner="oneOverWinner"
          :twoOverWinner="twoOverWinner"
          :threeOverWinner="threeOverWinner"
          :doubleParWinner="doubleParWinner"
          :firstSecondGapWinner="firstSecondGapWinner"
          :updatedTotRankPlayerNm="updatedTotRankPlayerNm"
          :updatedScoreRankPlayerNm="updatedScoreRankPlayerNm"
          :updatedLongestPlayerNm="updatedLongestPlayerNm"
          :updatedNearestPlayerNm="updatedNearestPlayerNm"
          :updatedBuddyPlayerNm="updatedBuddyPlayerNm"
          :updatedParPlayerNm="updatedParPlayerNm"
          :updatedOneOverPlayerNm="updatedOneOverPlayerNm"
          :updatedTwoOverPlayerNm="updatedTwoOverPlayerNm"
          :updatedThreeOverPlayerNm="updatedThreeOverPlayerNm"
          :updatedDoubleParPlayerNm="updatedDoubleParPlayerNm"
          :updatedFirstSecondGapPlayerNm="updatedFirstSecondGapPlayerNm"
          @updateMedallistNm="updateMedallistNm"
          @updateNewPerioWinner="updateNewPerioWinner"
          @updateLongestWinner="updateLongestWinner"
          @updateNearestWinner="updateNearestWinner"
          @updateBuddyWinner="updateBuddyWinner"
          @updateParWinner="updateParWinner"
          @updateOneOverWinner="updateOneOverWinner"
          @updateTwoOverWinner="updateTwoOverWinner"
          @updateThreeOverWinner="updateThreeOverWinner"
          @updateFirstSecondGapWinner="updateFirstSecondGapWinner"
          :medalistPlayerNm="
            getScorePlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
              'playerNm'
            )
          "
          :newPerioWinnerPlayerNm="
            getScorePlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
              'playerNm'
            )
          "
          :longestPlayerNm="
            getLongOrNearPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerLongRankVOList,
              'playerLongNm'
            )
          "
          :nearestPlayerNm="
            getLongOrNearPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerNearRankVOList,
              'playerNearNm'
            )
          "
          :buddyPlayerNm="
            getBuddyPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerBuddyRankVOList,
              'playerNm'
            )
          "
          :parPlayerNm="
            getParPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerParRankVOList,
              'playerNm'
            )
          "
          :oneOverPlayerNm="
            getOneOverPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerOneOverRankVOList,
              'playerNm'
            )
          "
          :twoOverPlayerNm="
            getTwoOverPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerTwoOverRankVOList,
              'playerNm'
            )
          "
          :threeOverPlayerNm="
            getThreeOverPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerThreeOverRankVOList,
              'playerNm'
            )
          "
          :doubleParPlayerNm="
            getDoubleParPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerDoubleParRankVOList,
              'playerNm'
            )
          "
          :firstSecondGapPlayerNm="
            getFirstSecondGapPlayerInfo(
              0,
              selectedRoundGroupRank.roundGroupPlayerFirstSecondGapRankVOList,
              'playerNm'
            )
          "
          @updateTotRankPlayerNm="updateTotRankPlayerNm"
          @updateScoreRankPlayerNm="updateScoreRankPlayerNm"
          @updateLongestPlayerNm="updateLongestPlayerNm"
          @updateNearestPlayerNm="updateNearestPlayerNm"
          @updateBuddyPlayerNm="updateBuddyPlayerNm"
          @updateParPlayerNm="updateParPlayerNm"
          @updateOneOverPlayerNm="updateOneOverPlayerNm"
          @updateTwoOverPlayerNm="updateTwoOverPlayerNm"
          @updateThreeOverPlayerNm="updateThreeOverPlayerNm"
          @updateDoubleParPlayerNm="updateDoubleParPlayerNm"
          @updateFirstSecondGapPlayerNm="updateFirstSecondGapPlayerNm"
        />
      </section>

      <!-- //시상 -->
      <!-- 표 -->
      <section id="ranks__score__container">
        <table id="excel__rank__table">
          <thead>
          <tr>
            <th rowspan="2" style="width: 70px">순위</th>
            <template v-if="isCheckedNewPerio">
              <th colspan="6" style="width: 450px">Score</th>
            </template>
            <template v-else>
              <th colspan="4" style="width: 280px">Score</th>
            </template>
            <th colspan="4" style="width: 280px" v-if="isCheckedLongAndNear">
              롱/니어
            </th>
            <th colspan="2" style="width: 150px" v-if="isCheckedBuddy">
              버디
            </th>
            <th colspan="2" style="width: 150px" v-if="isCheckedPar">파</th>
            <th colspan="2" style="width: 150px" v-if="isCheckedOneOver">
              보기
            </th>
            <th colspan="2" style="width: 150px" v-if="isCheckedTwoOver">
              더블보기
            </th>
            <th colspan="2" style="width: 150px" v-if="isCheckedThreeOver">
              트리플보기
            </th>
            <th colspan="2" style="width: 150px" v-if="isCheckedDoublePar">
              더블파
            </th>
            <th
              colspan="2"
              style="width: 150px"
              v-if="isCheckedFirstSecondGap"
            >
              전후반차
            </th>
            <th colspan="2" style="width: 150px" v-if="isCheckedLucky">
              행운상
            </th>
          </tr>
          <tr>
            <template v-if="isCheckedNewPerio">
              <th>이름</th>
              <th>전반</th>
              <th>후반</th>
              <th>Total</th>
              <th>Hcp</th>
              <th>Net</th>
            </template>
            <template v-else>
              <th>이름</th>
              <th>전반</th>
              <th>후반</th>
              <th>Total</th>
            </template>

            <template v-if="isCheckedLongAndNear">
              <th>이름</th>
              <th>롱기</th>
              <th>이름</th>
              <th>니어</th>
            </template>

            <template v-if="isCheckedBuddy">
              <th>이름</th>
              <th>갯수</th>
            </template>

            <template v-if="isCheckedPar">
              <th>이름</th>
              <th>갯수</th>
            </template>

            <template v-if="isCheckedOneOver">
              <th>이름</th>
              <th>갯수</th>
            </template>

            <template v-if="isCheckedTwoOver">
              <th>이름</th>
              <th>갯수</th>
            </template>

            <template v-if="isCheckedThreeOver">
              <th>이름</th>
              <th>갯수</th>
            </template>

            <template v-if="isCheckedDoublePar">
              <th>이름</th>
              <th>갯수</th>
            </template>

            <template v-if="isCheckedFirstSecondGap">
              <th>이름</th>
              <th>차이</th>
            </template>

            <template v-if="isCheckedLucky">
              <th>이름</th>
              <th>Lucky</th>
            </template>
          </tr>
          </thead>
          <tbody>
          <tr v-for="i in selectedRoundGroupRank.playerCount" :key="i">
            <td>{{ i }}</td>
            <template v-if="isCheckedNewPerio">
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
                <input
                  v-if="isUpdatable"
                  type="number"
                  :value="
                      getScorePlayerInfo(
                        i - 1,
                        selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                        'netScore'
                      )
                    "
                  class="update_input"
                  @change="
                      getOriginalNetValue(
                        getScorePlayerInfo(
                          i - 1,
                          selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList
                        )
                      )
                    "
                  @input="updateNetValue"
                />
                <span v-else>
                    {{
                    getScorePlayerInfo(
                      i - 1,
                      selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
                      "netScore"
                    )
                  }}</span
                >
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

            <template v-if="isCheckedLongAndNear">
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
                <input
                  v-if="isUpdatable"
                  type="number"
                  :value="
                      getLongOrNearPlayerInfo(
                        i - 1,
                        selectedRoundGroupRank.roundGroupPlayerLongRankVOList,
                        'longValue'
                      )
                    "
                  class="update_input"
                  @change="
                      getOriginalLongValue(
                        getLongOrNearPlayerInfo(
                          i - 1,
                          selectedRoundGroupRank.roundGroupPlayerLongRankVOList
                        )
                      )
                    "
                  @input="updateLongValue"
                />
                <span v-else>
                    {{
                    getLongOrNearPlayerInfo(
                      i - 1,
                      selectedRoundGroupRank.roundGroupPlayerLongRankVOList,
                      "longValue"
                    )
                  }}
                  </span>
              </td>
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
                <input
                  v-if="isUpdatable"
                  type="number"
                  :value="
                      getLongOrNearPlayerInfo(
                        i - 1,
                        selectedRoundGroupRank.roundGroupPlayerNearRankVOList,
                        'nearValue'
                      )
                    "
                  class="update_input"
                  @change="
                      getOriginalNearValue(
                        getLongOrNearPlayerInfo(
                          i - 1,
                          selectedRoundGroupRank.roundGroupPlayerLongRankVOList
                        )
                      )
                    "
                  @input="updateNearValue"
                />
                <span v-else>
                    {{
                    getLongOrNearPlayerInfo(
                      i - 1,
                      selectedRoundGroupRank.roundGroupPlayerNearRankVOList,
                      "nearValue"
                    )
                  }}
                  </span>
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
                <div
                  v-if="isUpdatable"
                  class="lucky__checkbox__wrapper"
                  @click="handleLuckyCheckBoxClick(i - 1)"
                >
                  <i
                    class="fas fa-check lucky_check"
                    :class="{
                        checker:
                          getLuckyPlayerInfo(
                            i - 1,
                            selectedRoundGroupRank.roundGroupPlayerLuckyYnRankVOList,
                            'luckyValue'
                          ) === 'Y',
                      }"
                  ></i>
                </div>

                <div v-else>
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
      <!-- //표 -->
    </main>
    <RoundGroupRankingPrint
      ref="roundGroupRankingPrint"
      :selectedRoundGroupRank="selectedRoundGroupRank"
      :isCheckedLongAndNear="isCheckedLongAndNear"
      :isCheckedBuddy="isCheckedBuddy"
      :isCheckedPar="isCheckedPar"
      :isCheckedOneOver="isCheckedOneOver"
      :isCheckedTwoOver="isCheckedTwoOver"
      :isCheckedThreeOver="isCheckedThreeOver"
      :isCheckedDoublePar="isCheckedDoublePar"
      :isCheckedFirstSecondGap="isCheckedFirstSecondGap"
      :isCheckedLucky="isCheckedLucky"
      :isCheckedNewPerio="isCheckedNewPerio"
      :medalist="this.medalist"
      :newPerioWinner="this.newPerioWinner"
      :longestWinner="this.longestWinner"
      :nearestWinner="this.nearestWinner"
      :buddyWinner="this.buddyWinner"
      :parWinner="this.parWinner"
      :oneOverWinner="this.oneOverWinner"
      :twoOverWinner="this.twoOverWinner"
      :threeOverWinner="this.threeOverWinner"
      :doubleParWinner="this.doubleParWinner"
      :firstSecondGapWinner="this.firstSecondGapWinner"
      :medalistPlayerNm="
        getScorePlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerScoreRankVOList,
          'playerNm'
        )
      "
      :newPerioWinnerPlayerNm="
        getScorePlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerNewPerioRankVOList,
          'playerNm'
        )
      "
      :longestPlayerNm="
        getLongOrNearPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerLongRankVOList,
          'playerLongNm'
        )
      "
      :nearestPlayerNm="
        getLongOrNearPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerNearRankVOList,
          'playerNearNm'
        )
      "
      :buddyPlayerNm="
        getBuddyPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerBuddyRankVOList,
          'playerNm'
        )
      "
      :parPlayerNm="
        getParPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerParRankVOList,
          'playerNm'
        )
      "
      :oneOverPlayerNm="
        getOneOverPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerOneOverRankVOList,
          'playerNm'
        )
      "
      :twoOverPlayerNm="
        getTwoOverPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerTwoOverRankVOList,
          'playerNm'
        )
      "
      :threeOverPlayerNm="
        getThreeOverPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerThreeOverRankVOList,
          'playerNm'
        )
      "
      :doubleParPlayerNm="
        getDoubleParPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerDoubleParRankVOList,
          'playerNm'
        )
      "
      :firstSecondGapPlayerNm="
        getFirstSecondGapPlayerInfo(
          0,
          selectedRoundGroupRank.roundGroupPlayerFirstSecondGapRankVOList,
          'playerNm'
        )
      "
      :updatedTotRankPlayerNm="updatedTotRankPlayerNm"
      :updatedScoreRankPlayerNm="updatedScoreRankPlayerNm"
      :updatedLongestPlayerNm="updatedLongestPlayerNm"
      :updatedNearestPlayerNm="updatedNearestPlayerNm"
      :updatedBuddyPlayerNm="updatedBuddyPlayerNm"
      :updatedParPlayerNm="updatedParPlayerNm"
      :updatedOneOverPlayerNm="updatedOneOverPlayerNm"
      :updatedTwoOverPlayerNm="updatedTwoOverPlayerNm"
      :updatedThreeOverPlayerNm="updatedThreeOverPlayerNm"
      :updatedDoubleParPlayerNm="updatedDoubleParPlayerNm"
      :updatedFirstSecondGapPlayerNm="updatedFirstSecondGapPlayerNm"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { print } from "@/composables/usePrinter";
import CloseButton from "@/components/shared/CloseButton.vue";
import RoundGroupRankingPrint from "@/components/admin/round/roundGroup/prints/ranking/RoundGroupRankingPrint.vue";
import RoundGroupRankingAwardsFilter from "@/components/admin/modal/round/group/ranking/RoundGroupRankingAwardsFilter.vue";
import RoundGroupRankingColumnFilter from "@/components/admin/modal/round/group/ranking/RoundGroupRankingColumnFilter.vue";
import TimeUtil from "@/utils/datetime/TimeUtil";
import useAdminGroup from "@/api/v1/admin/round/useAdminGroup";
import { NO_REQUIRED_DATA } from "@/utils/constants";
import DateUtil from "@/utils/datetime/DateUtil";
import RoundGroupRankingCheckBoxes from "@/components/admin/round/roundGroup/RoundGroupRankingCheckBoxes";
import RoundGroupRankingHeader from "@/components/admin/round/roundGroup/RoundGroupRankingHeader";
import RoundGroupRankingAwardTable from "@/components/admin/round/roundGroup/RoundGroupRankingAwardTable";

const { resetRank, updateRank } = useAdminGroup();

export default {
  name: "RoundGroupRankingModal",

  components: {
    RoundGroupRankingAwardTable,
    RoundGroupRankingHeader,
    RoundGroupRankingCheckBoxes,
    CloseButton,
    RoundGroupRankingPrint,
    RoundGroupRankingAwardsFilter,
    RoundGroupRankingColumnFilter,
  },

  data() {
    return {
      awardKeys: [],
      scoreKeys: [],
      ranking: null,
      isPrint: false,

      //체크박스 체크유무
      isCheckedLongAndNear: false,
      isCheckedBuddy: false,
      isCheckedPar: false,
      isCheckedOneOver: false,
      isCheckedTwoOver: false,
      isCheckedThreeOver: false,
      isCheckedDoublePar: false,
      isCheckedFirstSecondGap: false,
      isCheckedLucky: false,
      isCheckedNewPerio: false,
      currentSelectedCheckBox: [],
      CHECKBOX_MAX_SELECT_COUNT: 6,

      //행운상 req
      luckyPlayerList: [],

      //수정모드
      isUpdatable: false,

      playerGroupScoreRankReq: [],

      roundGroupPlayerScoreRankVOList: [],
      updatedNetScore: "",

      roundGroupPlayerLongRankVOList: [],
      updatedLongScore: "",

      roundGroupPlayerNearRankVOList: [],
      updatedNearScore: "",

      updatedTotRankPlayerNm: "",
      updatedScoreRankPlayerNm: "",
      updatedLongestPlayerNm: "",
      updatedNearestPlayerNm: "",
      updatedBuddyPlayerNm: "",
      updatedParPlayerNm: "",
      updatedOneOverPlayerNm: "",
      updatedTwoOverPlayerNm: "",
      updatedThreeOverPlayerNm: "",
      updatedDoubleParPlayerNm: "",
      updatedFirstSecondGapPlayerNm: "",

      medalist: "",
      newPerioWinner: "",
      longestWinner: "",
      nearestWinner: "",
      buddyWinner: "",
      parWinner: "",
      oneOverWinner: "",
      twoOverWinner: "",
      threeOverWinner: "",
      doubleParWinner: "",
      firstSecondGapWinner: "",
    };
  },
  computed: {
    /**
     * bookgTime parsing
     * input 0600
     * output 06:00
     */
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },

    /**
     * player 인원 수
     * playerCount 계산.
     */
    selectedRoundGroupRank() {
      const selectedRoundGroupRank = {
        ...this.selectedRoundGroup,
        playerCount: this.selectedRoundGroup.roundGroupPlayerScoreRankVOList
          .length,
      };
      return selectedRoundGroupRank;
    },
    ...mapGetters("admin/", {
      selectedRoundGroup: "getSelectedRoundGroup",
    }),
    ...mapGetters("control/", {
      company: "getCompany",
    }),
  },

  methods: {
    beforePrint() {},

    afterPrint() {
      this.isPrint = false;
    },

    async handleClickPrint() {
      this.isPrint = true;
      setTimeout(() => {
        const RoundGroupRankingPrint = this.$refs.roundGroupRankingPrint.$el;

        print({
          targetElement: RoundGroupRankingPrint,
          before: this.beforePrint,
          after: this.afterPrint,
        });
      }, 100);
    },
    updateReqInit() {
      this.playerGroupScoreRankReq = [];
      this.roundGroupPlayerScoreRankVOList = [];
      this.updatedNetScore = "";
      this.roundGroupPlayerLongRankVOList = [];
      this.updatedLongScore = "";
      this.roundGroupPlayerNearRankVOList = [];
      this.updatedNearScore = "";
      this.roundGroupPlayerLuckyYnRankVOList = [];
      this.luckyPlayerList = [];
    },
    rankNameInit() {
      this.medalist = "메달리스트";
      this.newPerioWinner = "신페리오 우승";
      this.longestWinner = "롱기스트";
      this.nearestWinner = "니어리스트";
      this.buddyWinner = "버디";
      this.parWinner = "파";
      this.oneOverWinner = "보기";
      this.twoOverWinner = "더블보기";
      this.threeOverWinner = "트리플보기";
      this.doubleParWinner = "더블파";
      this.firstSecondGapWinner = "전후반";
    },
    rankPlayerNameInit() {
      this.updatedTotRankPlayerNm = "";
      this.updatedScoreRankPlayerNm = "";
      this.updatedLongestPlayerNm = "";
      this.updatedNearestPlayerNm = "";
      this.updatedBuddyPlayerNm = "";
      this.updatedParPlayerNm = "";
      this.updatedOneOverPlayerNm = "";
      this.updatedTwoOverPlayerNm = "";
      this.updatedThreeOverPlayerNm = "";
      this.updatedDoubleParPlayerNm = "";
      this.updatedFirstSecondGapPlayerNm = "";
    },

    /**
     * 초기화 버튼 (기존값으로 reset 하는 API)
     * response data 로 다시 store update 쳐줌.
     * @returns {Promise<void>}
     */
    async handleClickReset() {
      if (this.isUpdatable) {
        this.isUpdatable = !this.isUpdatable;
      }

      const groupCd = this.selectedRoundGroup.round.groupCd;
      const visitDt = this.selectedRoundGroup.round.visitDt;

      const res = await resetRank({ groupCd, visitDt });
      const { status } = res;
      if (status !== "OK") return;

      const { data } = res;

      const round = this.selectedRoundGroup.round;
      const selectedRound = {
        ...data,
        round,
      };
      await this.rankPlayerNameInit();
      await this.rankNameInit();
      await this.updateRoundGroup(selectedRound);
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

    /**
     * 닫기버튼.
     */
    handleClickClose() {
      this.close(false);
    },

    /**
     * ### 롱/니어, 버디, 파, 보기, 더블보기, 트리플보기, 더블파, 전후반차 체크박스 값 화면에 표기.
     * @param {String} type > 선택된 체크박스 타입.
     * @param {Boolean} status > 선택된 체크박스의 상태 값.
     */
    handleCheckBoxClick({ type, status }) {
      // 체크박스 최대 선택 수 초과 여부 확인.
      if (
        this.currentSelectedCheckBox?.length >
        this.CHECKBOX_MAX_SELECT_COUNT - 1 &&
        !status
      ) {
        this.toast({
          title: "체크박스",
          message: `체크박스는 최대 ${this.CHECKBOX_MAX_SELECT_COUNT}개까지 선택할 수 있습니다.`,
        });
        return;
      }

      // 현재 선택된 체크박스 리스트 변수에 적용.
      if (!status) {
        this.currentSelectedCheckBox.push(type);
      } else {
        this.currentSelectedCheckBox = this.currentSelectedCheckBox.filter(
          (box) => box !== type
        );
      }

      switch (type) {
        case "longAndNear":
          this.isCheckedLongAndNear = !this.isCheckedLongAndNear;
          break;
        case "buddy":
          this.isCheckedBuddy = !this.isCheckedBuddy;
          break;
        case "par":
          this.isCheckedPar = !this.isCheckedPar;
          break;
        case "oneOver":
          this.isCheckedOneOver = !this.isCheckedOneOver;
          break;
        case "twoOver":
          this.isCheckedTwoOver = !this.isCheckedTwoOver;
          break;
        case "threeOver":
          this.isCheckedThreeOver = !this.isCheckedThreeOver;
          break;
        case "doublePar":
          this.isCheckedDoublePar = !this.isCheckedDoublePar;
          break;
        case "firstSecondGap":
          this.isCheckedFirstSecondGap = !this.isCheckedFirstSecondGap;
          break;
        case "lucky":
          this.isCheckedLucky = !this.isCheckedLucky;
          break;
        case "newPerio":
          this.isCheckedNewPerio = !this.isCheckedNewPerio;
          break;
      }
    },

    /**
     * 행운상 체크박스 체크/해제.
     * @param i
     */
    handleLuckyCheckBoxClick(i) {
      const checkBoxElement = document.getElementsByClassName("lucky_check");
      const foundCheckBoxElement = checkBoxElement[i];

      if (foundCheckBoxElement.classList.contains("checker")) {
        foundCheckBoxElement.classList.remove("checker");

        const foundPlayer = this.selectedRoundGroupRank
          .roundGroupPlayerLuckyYnRankVOList[i];

        const updatedPlayer = {
          playerId: foundPlayer.playerId,
          value: "N",
        };
        this.luckyPlayerList.push(updatedPlayer);
        this.setPlayerGroupScoreRankReq();
      } else {
        foundCheckBoxElement.classList.add("checker");
        const foundPlayer = this.selectedRoundGroupRank
          .roundGroupPlayerLuckyYnRankVOList[i];

        const updatedPlayer = {
          playerId: foundPlayer.playerId,
          value: "Y",
        };
        this.luckyPlayerList.push(updatedPlayer);
        this.setPlayerGroupScoreRankReq();
      }
    },

    /**
     * 수정모드
     * netScore, 롱/니어, 행운상 수정한 후 update API 호출.
     *
     */
    async handleClickUpdateAndSave() {
      this.isUpdatable = !this.isUpdatable;
      if (!this.isUpdatable && this.playerGroupScoreRankReq.length !== 0) {
        const visitDt = this.selectedRoundGroup.round.visitDt;
        const groupCd = this.selectedRoundGroup.round.groupCd;
        const res = await updateRank(
          { groupCd, visitDt },
          this.playerGroupScoreRankReq
        );

        const { status } = res;
        if (status !== "OK") return;

        await this.updateReqInit();

        const { data } = res;
        const round = this.selectedRoundGroup.round;

        const selectedRound = {
          ...data,
          round,
        };

        this.updateRoundGroup(selectedRound);
      }
    },

    /**
     * 변경할 score 값 가져오는 메소드.
     * */
    getOriginalNetValue(value) {
      if (this.updatedNetScore.length === 0) {
        return this.invalidDataMessage(NO_REQUIRED_DATA);
      }

      const updatedNetValue = {
        playerId: value.playerId,
        netScore: this.updatedNetScore,
      };
      this.roundGroupPlayerScoreRankVOList.push(updatedNetValue);

      this.setPlayerGroupScoreRankReq();
    },

    /**
     * 변경한 netScore 데이터.
     * */
    updateNetValue(e) {
      this.updatedNetScore = e.target.value;
    },

    /**
     * 변경할 롱기스트 값 가져오는 메소드.
     * */
    getOriginalLongValue(value) {
      const updatedLongValue = {
        playerId: value.playerId,
        value: this.updatedLongScore,
      };

      this.roundGroupPlayerLongRankVOList.push(updatedLongValue);

      this.setPlayerGroupScoreRankReq();
    },

    /**
     * 변경한 longest 데이터.
     * */
    updateLongValue(e) {
      this.updatedLongScore = e.target.value;
    },

    /**
     * 변경할 니어리스트 값 가져오는 메소드.
     * */
    getOriginalNearValue(value) {
      const updatedNearValue = {
        playerId: value.playerId,
        value: this.updatedNearScore,
      };
      this.roundGroupPlayerNearRankVOList.push(updatedNearValue);

      this.setPlayerGroupScoreRankReq();
    },

    /**
     * 변경할 nearest 값 가져오는 메소드.
     * */
    updateNearValue(e) {
      this.updatedNearScore = e.target.value;
    },

    /**
     * 최종 update req 보낼객체 만드는 메소드.
     * */
    setPlayerGroupScoreRankReq() {
      this.playerGroupScoreRankReq = {
        roundGroupPlayerScoreRankVOList: this.roundGroupPlayerScoreRankVOList,
        roundGroupPlayerLongRankVOList: this.roundGroupPlayerLongRankVOList,
        roundGroupPlayerNearRankVOList: this.roundGroupPlayerNearRankVOList,
        roundGroupPlayerLuckyYnRankVOList: this.luckyPlayerList,
      };
    },

    /**
     * 엑셀다운로드 메소드.
     */
    handleExcelDownload(title) {
      let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
      tab_text +=
        '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
      tab_text += "<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>";
      tab_text += "<x:Name>단체스코어</x:Name>";
      tab_text +=
        "<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>";
      tab_text += "</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>";
      tab_text += "<table>";
      const temp = document.getElementById("excel__medal__table").innerHTML;
      const temp2 = document.getElementById("excel__rank__table").innerHTML;
      tab_text += temp;
      tab_text += temp2;
      tab_text += "</table></body></html>";
      const fileName = `${title}.xls`;
      const a_tag = document.createElement("a");
      const blob = new Blob([tab_text], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      a_tag.href = window.URL.createObjectURL(blob);
      a_tag.download = fileName;
      a_tag.click();
    },
    /**
     * 시상자 이름변경 메소드
     * @param e
     */
    //////////////////////
    updateTotRankPlayerNm(e) {
      this.updatedTotRankPlayerNm = e.target.value;
    },
    updateScoreRankPlayerNm(e) {
      this.updatedScoreRankPlayerNm = e.target.value;
    },
    updateLongestPlayerNm(e) {
      this.updatedLongestPlayerNm = e.target.value;
    },
    updateNearestPlayerNm(e) {
      this.updatedNearestPlayerNm = e.target.value;
    },
    updateBuddyPlayerNm(e) {
      this.updatedBuddyPlayerNm = e.target.value;
    },
    updateParPlayerNm(e) {
      this.updatedParPlayerNm = e.target.value;
    },
    updateOneOverPlayerNm(e) {
      this.updatedOneOverPlayerNm = e.target.value;
    },
    updateTwoOverPlayerNm(e) {
      this.updatedTwoOverPlayerNm = e.target.value;
    },
    updateThreeOverPlayerNm(e) {
      this.updatedThreeOverPlayerNm = e.target.value;
    },
    updateDoubleParPlayerNm(e) {
      this.updatedDoubleParPlayerNm = e.target.value;
    },
    updateFirstSecondGapPlayerNm(e) {
      this.updatedFirstSecondGapPlayerNm = e.target.value;
    },
    //////////////////////
    /**
     * 시상 이름 변경 메소드.
     * @param e
     */
    //////////////////////
    updateMedallistNm(e) {
      this.medalist = e.target.value;
    },
    updateNewPerioWinner(e) {
      this.newPerioWinner = e.target.value;
    },
    updateLongestWinner(e) {
      this.longestWinner = e.target.value;
    },
    updateNearestWinner(e) {
      this.nearestWinner = e.target.value;
    },
    updateBuddyWinner(e) {
      this.buddyWinner = e.target.value;
    },
    updateParWinner(e) {
      this.parWinner = e.target.value;
    },
    updateOneOverWinner(e) {
      this.oneOverWinner = e.target.value;
    },
    updateTwoOverWinner(e) {
      this.twoOverWinner = e.target.value;
    },
    updateThreeOverWinner(e) {
      this.threeOverWinner = e.target.value;
    },
    updateDoubleParWinner(e) {
      this.doubleParWinner = e.target.value;
    },
    updateFirstSecondGapWinner(e) {
      this.firstSecondGapWinner = e.target.value;
    },
    invalidDataMessage(title, message) {
      this.toast({ title, message });
    },
    //////////////////////
    ...mapActions("admin/", {
      updateRoundGroup: "dispatchUpdateSelectedRoundGroup",
    }),
    ...mapActions({
      toastPreparing: "toastPreparing",
      toast: "toast",
      close: "dispatchIsShowingRoundGroupRankingModal",
    }),
  },
};
</script>

<style scoped>
/* content positions start */
#round_group_ranking_modal__container {
  width: 95%;
  height: 90%;
  grid-gap: 16px;
}

#round_group_ranking_modal__container article {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-top: 40px;
}

#round_group_ranking_modal__container article > section {
  height: 100%;
}

#round_group_ranking_modal__container article section:first-child {
  grid-column: 1/4;
}

#round_group_ranking_modal__container article section:last-child {
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

#round_group_ranking_modal__container article section:last-child > div {
  overflow-y: scroll;
  height: 700px;
}

#round_group_ranking_modal__container article section:last-child footer {
  grid-row: 18/21;
  display: flex;
  justify-content: center;
}

/* content positions end */

/* content right start */
#round_group_ranking_modal__container table {
  width: 100%;
  text-align: center;
  /*border: 1px solid var(--primary);*/
}

#round_group_ranking_modal__container table th,
#round_group_ranking_modal__container table td {
  padding: 10px;
  border: 1px solid var(--primary);
}

/* content right end */

.lucky__checkbox__wrapper {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 5px;
  margin-left: 13px;
}

.lucky__checkbox__wrapper .checker {
  margin-left: 2px;
  color: tomato;
}

.update_input {
  width: 100%;
  height: 25px;
  line-height: 25px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}

.update_rank_input {
  width: 100%;
  height: 25px;
  line-height: 25px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}

#ranks__score__container {
  grid-row: 4/13;
  overflow: scroll;
}

#ranks__score__container #excel__rank__table {
  table-layout: fixed;
}
</style>
