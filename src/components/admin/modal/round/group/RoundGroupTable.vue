<template>
  <div class="table__wrapper">
    <table>
      <colgroup>
        <col width="8.33%"/>
        <col width="8.33%"/>
        <col width="8.33%"/>
        <col width="8.33%"/>
        <col width="8.33%"/>
        <col width="8.33%"/>
        <col width="8.33%"/>
        <col width="8.33%"/>
        <col width="10%%"/>
        <col width="8.33%"/>
      </colgroup>
      <thead>
      <tr>
        <th>날짜</th>
        <th>단체명</th>
        <th>첫팀 티업</th>
        <th>막팀 티업</th>
        <th>총팀 수</th>
        <th>완료팀 수</th>
        <th>대회 설정</th>
        <th>진행상황</th>
        <th>단체 스코어</th>
        <th>시상</th>
      </tr>
      </thead>

      <tbody v-if="hasGroups">
      <tr v-for="(row, idx) in roundGroups" :key="`${row.groupCd}${idx}`">
        <!-- 날짜 -->
        <td>{{ parsedVisitDt(row.visitDt) }}</td>

        <!-- 단체명 -->
        <td>{{ row.groupNm }}</td>

        <!-- 첫팀 타임 -->
        <td>{{ row.firstTeamTime | bookgTime }}</td>

        <!-- 막팀 타임 -->
        <td>{{ row.lastTeamTime | bookgTime }}</td>

        <!-- 총팀 수 -->
        <td>{{ row.totalTeamCnt }}</td>

        <!-- 완료팀 수 -->
        <td>{{ row.endTeamCnt }}</td>

        <!-- 대회 설정 -->
        <td>
          <button class="button-dark" @click="handleClickNewPerio(row)">
            {{ row.handyMod === "Y" ? "적용됨" : "미적용됨" }}
          </button>
        </td>

        <!-- 진행상황 -->
        <td>{{ row.playingGubun === "Y" ? "경기중" : "라운딩 종료" }}</td>

        <!-- 단체 스코어 -->
        <td>
          <button class="button-dark" @click="handleClickScorePrint(row)">
            스코어
          </button>
        </td>

        <!-- 시상 -->
        <td v-if="row.groupRank === 'Y'">
          <button class="button-dark" @click="handleClickRankingDown(row)">
            랭킹
          </button>
        </td>
        <td v-else></td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="10">조회된 결과가 없습니다.</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import TimeUtil from "@/utils/datetime/TimeUtil";
import useAdminGroup from "@/api/v1/admin/round/useAdminGroup";
import DateUtil from "@/utils/datetime/DateUtil";

const {
  updateGroupHandyModeAsYes,
  getGroupScoreDetail,
  getRankList,
  getAwardInfo
} = useAdminGroup();

const now = new Date();
const {year, month, day} = DateUtil.dateDivider(now);
const visitDt = year + month + day;

export default {
  name: "RoundGroupTable",

  props: {
    roundGroups: {
      type: Array,
      require: true,
    },
    searchParams: {
      type: Object,
      require: false
    }
  },

  data() {
    return {
      visitDt,
    };
  },

  computed: {
    hasGroups() {
      return Boolean(this.roundGroups.length);
    },
  },

  methods: {
    /**
     * ### 당일 단체 라운드 신페리오 클릭 메소드.
     * ### swagger 참조.
     * 미적용됨 -> 핸디모드를 생성하는 api 호출 및 전체 골프장 설정 이동
     * 적용됨 -> 시상설정 조회 api 호출 및 전체 골프장 설정 이동
     * @param row
     * @returns {Promise<void>}
     */
    async handleClickNewPerio(clickedRoundGroup) {
      const {handyMod, groupCd, visitDt} = clickedRoundGroup;
      if (handyMod === "N") {
        const {status} = await updateGroupHandyModeAsYes({
          groupCd,
          visitDt,
        });
        if (status !== "OK") {
          this.$emit("clearSearchData");
        }
      }

      const paramGroupNm = this.searchParams.groupNm;
      const paramVisitDt = this.searchParams.visitDt;
      const parsedVisitDt = DateUtil.stringDateToFormattedByYearMonthDayWithChar(visitDt);

      // 스토어 설정.
      this.setSelectedRoundGroup(clickedRoundGroup);
      this.setSelectedRoundGroupName(paramGroupNm);
      this.setSelectedRoundGroupVisitDt(paramVisitDt ? paramVisitDt : parsedVisitDt);
      // 탭 이동.
      this.updateContentView({title: "round", subtitle: 3});
    },

    /**
     * 스코어 모달창 메소드.
     * @param round
     * @returns {Promise<void>}
     */
    async handleClickScorePrint(round) {
      const groupCd = round.groupCd;
      const visitDt = round.visitDt;
      const res = await getGroupScoreDetail({groupCd, visitDt});

      const {status} = res;
      if (status !== "OK") return;

      const {data} = res;
      const selectedRound = {
        ...data,
        round,
      };
      this.updateRoundGroup(selectedRound);
      this.updateIsShowingRoundGroupScoreDetailModal(true);
    },

    /**
     * 랭킹 모달창 메소드.
     * @param round
     * @returns {Promise<void>}
     */
    async handleClickRankingDown(round) {
      const groupCd = round.groupCd;
      const visitDt = round.visitDt;

      const res = await getRankList({groupCd, visitDt});

      const {status} = res;
      if (status !== "OK") return;

      await this.getRoundGroupAwardInfo({groupCd, visitDt})

      const {data} = res;

      const selectedRound = {
        ...data,
        round,
      };
      this.updateIsShowingRoundGroupRankingModal(true);
      this.updateRoundGroup(selectedRound);
    },
    async getRoundGroupAwardInfo({groupCd, visitDt}) {
      const res = await getAwardInfo({groupCd, visitDt})
      const {status} = res;

      if (status !== "OK") return;

      const {data} = res;
      this.setSelectedRoundGroupCompetitionSettingList(data);

      this.setIsCheckedNewPerio(data.competitionSettingList[1].checkYn)
      this.setIsCheckedLong(data.competitionSettingList[2].checkYn)
      this.setIsCheckedNear(data.competitionSettingList[3].checkYn)
      this.setIsCheckedBuddy(data.competitionSettingList[4].checkYn)
      this.setIsCheckedPar(data.competitionSettingList[5].checkYn)
      this.setIsCheckedOneOver(data.competitionSettingList[6].checkYn)
      this.setIsCheckedTwoOver(data.competitionSettingList[7].checkYn)
      this.setIsCheckedThreeOver(data.competitionSettingList[8].checkYn)
      this.setIsCheckedDoublePar(data.competitionSettingList[9].checkYn)
      this.setIsCheckedFirstSecondGap(data.competitionSettingList[10].checkYn)
      this.setIsCheckedLucky(data.competitionSettingList[11].checkYn)
      this.setIsCheckedStrokeHandy(data.competitionSettingList[12].checkYn)
      this.setIsCheckedHonest(data.competitionSettingList[13].checkYn)
      this.setIsCheckedFirstSecond(data.competitionSettingList[14].checkYn)

    },

    /**
     * visitDt 포맷팅
     * input : 20210914
     * output : 2021.09.14
     * @param visitDt
     * @returns {string}
     */
    parsedVisitDt(visitDt) {
      const date = DateUtil.eightToDate(visitDt);
      const {year, month, day} = DateUtil.dateDivider(date);
      return `${year}.${month}.${day}`;
    },

    ...mapActions({
      toastPreparing: "toastPreparing",
      updateIsShowingRoundGroupScoreDetailModal:
        "dispatchIsShowingRoundGroupScoreDetailModal",
      updateIsShowingRoundGroupRankingModal:
        "dispatchIsShowingRoundGroupRankingModal",
    }),
    ...mapActions("admin/", {
      updateRoundGroup: "dispatchUpdateSelectedRoundGroup",
      updateContentView: "dispatchContentView",
      setSelectedRoundGroup: "updateSelectedRoundGroup",
      setRoundGroupTeamList: "updateRoundGroupTeamList",
      setSelectedRoundGroupCompetitionSettingList: "dispatchSetSelectedRoundGroupCompetitionSettingList",
      setIsCheckedLong: 'dispatchSetIsCheckedLong',
      setIsCheckedNear: 'dispatchSetIsCheckedNear',
      setIsCheckedBuddy: 'dispatchSetIsCheckedBuddy',
      setIsCheckedPar: 'dispatchSetIsCheckedPar',
      setIsCheckedOneOver: 'dispatchSetIsCheckedOneOver',
      setIsCheckedTwoOver: 'dispatchSetIsCheckedTwoOver',
      setIsCheckedThreeOver: 'dispatchSetIsCheckedThreeOver',
      setIsCheckedDoublePar: 'dispatchSetIsCheckedDoublePar',
      setIsCheckedFirstSecondGap: 'dispatchSetIsCheckedFirstSecondGap',
      setIsCheckedLucky: 'dispatchSetIsCheckedLucky',
      setIsCheckedNewPerio: 'dispatchSetIsCheckedNewPerio',
      setIsCheckedFirstSecond: 'dispatchSetIsCheckedFirstSecond',
      setIsCheckedStrokeHandy: 'dispatchSetIsCheckedStrokeHandy',
      setIsCheckedHonest: 'dispatchSetIsCheckedHonest',
      setSelectedRoundGroupName: 'dispatchSetSelectedRoundGroupName',
      setSelectedRoundGroupVisitDt: 'dispatchSetSelectedRoundGroupVisitDt',
    }),
  },

  filters: {
    /**
     * BookgTime 포맷팅.
     * input : 0600
     * output : 06:00
     * @returns {string}
     */
    bookgTime(value) {
      return TimeUtil.timeFormatWithChar(value);
    },
  },
};
</script>
<style scoped>
.table__wrapper {
  height: 725px;
  overflow-y: scroll;
}

table {
  width: 100%;
  border: 1px solid var(--primary);
  text-align: center;
}

table tbody tr:hover {
  background-color: var(--deep-green);
}

table th {
  height: 50px;
  padding: 0.25rem;
  background-color: var(--soft-green);
  border: 1px solid var(--deep-green);
}

table td {
  height: 50px;
  padding: 0.25rem;
  border: 1px solid var(--soft-green);
  font-size: 0.9rem;
}

@media (height: 1080px) {
  .table__wrapper {
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
