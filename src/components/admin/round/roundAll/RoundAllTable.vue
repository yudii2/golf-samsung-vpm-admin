<template>
  <div class="table_wrapper">
    <table>
      <colgroup>
        <col width="5%"/>
        <col width="7%"/>
        <col width="6%"/>
        <col width="7%"/>
        <col width="6%"/>
        <col width="12%"/>
        <col width="15%"/>
        <col width="7%"/>
        <col width="9%"/>
        <col width="10%"/>
        <col width="8%"/>
        <col width="8%"/>
      </colgroup>
      <thead>
      <tr>
        <th>순번</th>
        <th>날짜</th>
        <th>티타임</th>
        <th>코스</th>
        <th>캐디</th>
        <th>진행시간</th>
        <th>내장객</th>
        <th>단체명</th>
        <th>스코어카드</th>
        <th>사진/동영상</th>
        <th>클럽체크</th>
        <th>클럽항목</th>
      </tr>
      </thead>

      <tbody v-if="hasRows">
      <tr v-for="(row, idx) in rows" :key="`${row.roundId}${idx}`">
        <td>{{ idx + 1 }}</td>
        <td>
          <div>
            <span>{{ parsedVisitDt(row.visitDt) }}</span>
          </div>
        </td>
        <td>
          <div>
            <span>{{ parsedBookgTime(row.bookgTime) }}</span>
          </div>
        </td>
        <td>{{ row.firstCourse }} > {{ row.secondCourse }}</td>
        <td>
          <div>
            <span>{{ row.caddieName }}</span>
          </div>
        </td>
        <td>
          <div class="running_time">
            <div>
              <span>전</span>
              <span>{{ row.firstTime }}</span>
            </div>
            <div>
              <span>후</span>
              <span>{{ row.secondTime }}</span>
            </div>
            <div>
              <span>합</span>
              <span>{{ row.totalTime }}</span>
            </div>
            <div>
              <span>총</span>
              <span>{{ row.allTime }}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="players" v-if="row.roundPlayerList.length">
              <span v-for="(player, idx) in row.roundPlayerList" :key="idx">
                {{ player.name }}
              </span>
          </div>
        </td>
        <td>{{ row.groupNm }}</td>
        <td>
          <button class="button-dark" @click="requestRoundsDetail(row)">
            {{ row.roundEndYn === "Y" ? "스코어" : "실시간" }}
          </button>
        </td>

        <!-- 기념사진 있을 때-->
        <td>
          <button
            class="button-dark"
            v-if="row.roundPicVideoList.length"
            @click="handlePicturesClick(row.roundPicVideoList)"
          >
            기념사진
          </button>
          <!-- 기념사진 없을 때-->
          <span v-else> </span>
        </td>
        <td>
          <!-- 클럽사진 있을 때-->
          <button
            class="button-dark"
            @click="handleClubCheckClick(row.roundPicClubList)"
            v-if="row.roundPicClubList.length"
          >
            클럽
          </button>
          <!-- 클럽사진 없을 때-->
          <span v-else> </span>
        </td>
        <td>
          <button
            v-if="row.clubMemoYn === 'Y'"
            class="button-dark"
            @click="handleClubCheckThings(row)"
          >
            항목
          </button>
          <span v-else> </span>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="12">조회된 결과가 없습니다.</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TimeUtil from "@/utils/datetime/TimeUtil";
import {mapActions, mapGetters} from "vuex";
import {fullNameToMasking} from "@/utils/string";
import useRound from "@/api/v1/admin/round/useRound";
import DateUtil from "@/utils/datetime/DateUtil";

const {getRoundDetail, getPlayerClubThings, getRoundPic} = useRound();
export default {
  name: "RoundAllTable",

  props: {
    rows: {
      type: Array,
      require: true,
    },
  },

  computed: {
    hasRows() {
      return Boolean(this.rows && this.rows.length);
    },

    /**
     * bookgTime 포맷팅
     * input : 0600
     * output : 06:00
     * @returns {function(*=): string}
     */
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },

    /**
     * player 이름 마스킹처리.
     * @returns {function(*=): string}
     */
    maskedPlayerName() {
      return (playerName, visitDt) => {
        const elapsedDay = DateUtil.calculateElapsedDate(visitDt)
        if (elapsedDay > 3) {
          return fullNameToMasking(playerName);
        } else {
          return playerName;
        }
      };
    },
    ...mapGetters("admin/", {
      roundAllRows: "getRoundAllRows",
    }),
  },

  methods: {
    /**
     * 전체 라운드 스코어 조회 API 호출.
     * @param round
     * @returns {Promise<void>}
     */
    async requestRoundsDetail(round) {
      const paramRoundId = round.roundId;
      const res = await getRoundDetail({paramRoundId});

      const {status} = res;
      if (status !== "OK") return;

      const {data} = res;
      const selectedRound = {
        ...data,
        round,
      };
      this.updateSelectedRound(selectedRound);
      this.updateIsShowRoundAllScoreDetailModal(true);
    },

    /**
     * 기념사진 모달창.
     * @param pictures
     */
    async handlePicturesClick(pictures) {
      const picGubun = "2";
      const {roundId} = pictures[0];

      const res = await getRoundPic({picGubun, roundId});
      const {status} = res;
      if (status !== "OK") return;

      const {
        data: {roundPicList},
      } = res;

      this.updateIsShowingPicturesModal(true);
      this.updatePictures(roundPicList);
    },

    /**
     * 클럽체크 모달창.
     * @param clubCheckImages
     */
    async handleClubCheckClick(clubCheckImages) {
      const picGubun = "1";
      const {roundId} = clubCheckImages[0];

      const res = await getRoundPic({picGubun, roundId});
      const {status} = res;

      if (status !== "OK") return;

      const {
        data: {roundPicList},
      } = res;

      this.updateIsShowingClubCheckModal(true);
      this.updateClubCheckImages(roundPicList);
    },

    /**
     * 클럽 항목보기 모달창.
     * */
    async handleClubCheckThings(row) {
      const roundId = row.roundId;
      const res = await getPlayerClubThings({roundId});

      const {status} = res;
      if (status !== "OK") return;

      const {
        data: {roundPlayerClubMemoVOList},
      } = res;

      this.updateIsShowingClubThingsModal(true);
      this.updateClubThings(roundPlayerClubMemoVOList);
    },
    /**
     * visitDt 포맷팅.
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
      updateIsShowingClubCheckModal: "dispatchIsShowingClubCheckModal",
      updateIsShowRoundAllScoreDetailModal:
        "dispatchIsShowingRoundAllScoreDetailModal",
      updateIsShowingPicturesModal: "updateIsShowingPicturesModal",
      updateIsShowingClubThingsModal: "dispatchIsShowingClubThingsModal",
    }),
    ...mapActions("admin/", {
      updateSelectedRound: "dispatchSelectedRound",
      updateClubCheckImages: "dispatchUpdateClubCheckImages",
      updatePictures: "dispatchUpdatePictures",
      updateClubThings: "dispatchUpdateSelectedClubThings",
    }),
  },
};
</script>

<style scoped>
/* contents start */
.table_wrapper {
  height: 725px;
  overflow-y: scroll;
}

table {
  width: 120%;
  border: 1px solid var(--primary);
  word-break: keep-all;
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

table td > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

table td > div.running_time {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

table td > div.running_time > div:nth-child(2) {
  grid-row: 2/3;
  grid-column: 1/2;
}

table td > div.running_time > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px;
}

table td > div.runningTime > span {
  display: inline-block;
}

table td > div.players {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

table td > div.players > span {
  display: inline-block;
}

.button-dark {
  padding: 3px 10px !important;
  font-size: 14px !important;
}

@media (height: 1080px) {
  .table_wrapper {
    height: 100%;
    overflow-y: scroll;
  }
}

/* contents end */
</style>
