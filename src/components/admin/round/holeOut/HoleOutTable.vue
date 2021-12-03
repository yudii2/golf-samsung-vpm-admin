<template>
  <div class="table_wrapper">
    <table>
      <colgroup>
        <col width="4%" />
        <col width="7%" />
        <col width="7%" />
        <col width="6%" />
        <col width="12%" />
        <col width="18%" />
        <col width="7%" />
        <col width="8%" />
        <col width="9%" />
        <col width="12%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th>순번</th>
          <th>날짜</th>
          <th>티타임</th>
          <th>코스</th>
          <th>캐디</th>
          <th>내장객</th>
          <th>단체명</th>
          <th>진행홀</th>
          <th>종료시간</th>
          <th>승인홀</th>
          <th>승인</th>
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
            <div class="players" v-if="row.roundPlayerList.length">
              <span
                v-for="(player, idx) in row.roundPlayerList"
                :key="`${player.playerId}${idx}`"
              >
                {{ maskedPlayerName(player.name) }}
              </span>
            </div>
          </td>
          <td>{{ row.groupNm }}</td>
          <td>{{ row.roundHole }}</td>
          <td>{{ row.endTime }}</td>
          <td>
            <input
              type="number"
              class="update_input"
              :value="row.approveHole ? row.approveHole : ''"
              @change="insertApprovalHoleValue"
              ref="inputApprovalHoleName"
            />
          </td>
          <td>
            <!-- 종료시간 승인-->
            <button class="button-dark" @click="handleClickAcceptButton(row)">
              {{ row.approveYn === "Y" ? "승인완료" : "미승인" }}
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="11">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DateUtil from "@/utils/datetime/DateUtil";
import TimeUtil from "@/utils/datetime/TimeUtil";
import { nameToMasking } from "@/utils/string";
import { NO_REQUIRED_DATA } from "@/utils/constants";
import { mapActions } from "vuex";
import useRound from "@/api/v1/admin/round/useRound";
import { SUCCESS_APPROVAL } from "@/utils/constants";

const { updateHoleOutApprove } = useRound();

export default {
  name: "HoleOutTable",

  props: {
    rows: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      inputApprovalHoleValue: "",
    };
  },

  computed: {
    hasRows() {
      return Boolean(this.rows?.length);
    },

    /**
     * 티타임(bookgTime) 포맷팅
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
     * player 이름 마스킹 처리.
     * @returns {function(*=): string}
     */
    maskedPlayerName() {
      return (playerName) => {
        return nameToMasking(playerName);
      };
    },
  },

  methods: {
    /**
     * 승인버튼.
     * 승인 API 호출.
     */
    async handleClickAcceptButton(row) {
      // this.toastPreparing({title: '승인처리'})
      const inputApprovalHoleValueIsNotEmpty =
        this.inputApprovalHoleValue !== "";
      const inputApprovalHoleValueLength = this.inputApprovalHoleValue.length;
      const roundId = row.roundId;
      const approveHoleCnt = this.inputApprovalHoleValue;

      if (
        inputApprovalHoleValueIsNotEmpty &&
        inputApprovalHoleValueLength > 0
      ) {
        const res = await updateHoleOutApprove({ approveHoleCnt, roundId });
        const { status } = res;
        if (status !== "OK") return;

        this.$emit("requestHoleOutLists");
        this.toastMessage("홀아웃 승인홀", SUCCESS_APPROVAL);
      } else {
        this.toastMessage("홀아웃 승인홀", NO_REQUIRED_DATA);
      }
    },

    /**
     * 사용자가 입력한 승인홀 값 inputApprovalHoleValue 에 할당하는 메소드.
     * @param e
     */
    insertApprovalHoleValue(e) {
      this.inputApprovalHoleValue = e.target.value;
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
      const { year, month, day } = DateUtil.dateDivider(date);
      return `${year}.${month}.${day}`;
    },

    toastMessage(title, message) {
      this.toast({ title, message });
    },
    ...mapActions({
      toast: "toast",
      toastPreparing: "toastPreparing",
    }),
  },
};
</script>

<style scoped>
.table_wrapper {
  height: 725px;
  overflow-y: scroll;
  text-align: center;
  word-break: keep-all;
}

table {
  width: 100%;
  border: 1px solid var(--primary);
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

.update_input {
  width: 50%;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}

@media (height: 1080px) {
  .table_wrapper {
    height: 100%;
    overflow-y: scroll;
    text-align: center;
  }
}
</style>
