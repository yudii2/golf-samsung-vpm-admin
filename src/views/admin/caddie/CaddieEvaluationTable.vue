<template>
  <div class="table__wrapper" id="table">
    <table>
      <colgroup>
        <col width="7%"/>
        <col width="13%"/>
        <col width="7%"/>
        <col width="10%"/>
        <col width="10%"/>
        <col width="7%"/>
        <col width="7%"/>
        <col width="*"/>
      </colgroup>
      <thead>
      <tr>
        <th>No</th>
        <th>골프장</th>
        <th>방문일</th>
        <th>출발 코스</th>
        <th>출발 시간</th>
        <th>캐디명</th>
        <th>유형</th>
        <th>VALUE_REMARK</th>
      </tr>
      </thead>
      <template v-if="hasRows">
        <tbody v-for="(row, index) in rows" :key="`caddie-evaluation-${index}`">
        <tr>
          <template v-if="currentPage <= 1">
            <td>{{ index + 1 }}</td>
          </template>
          <template v-else>
            <td>{{ getIndex(index) }}</td>
          </template>
          <td>{{company.name}}</td>
          <td>{{ formatRoundDt(row.roundDt) }}</td>
          <td>{{ row.startCourseNm }}</td>
          <td>{{ parsedBookgTime(row.startTime) }}</td>
          <td>{{ row.caddieName }}</td>
          <td>{{ row.valueName }}</td>
          <td>{{ row.valueRemark }}</td>
        </tr>
        </tbody>
      </template>
      <template v-else>
        <tbody>
        <tr>
          <td colspan="8">조회된 결과가 없습니다.</td>
        </tr>
        </tbody>
      </template>

    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TimeUtil from "@/utils/datetime/TimeUtil";
export default {
  name: "CaddieEvaluationTable",
  props: {
    rows: {
      type: Array,
    },
    currentPage: {
      type: Number
    },
    take: {
      type: Number
    }
  },
  methods: {
    getIndex(i) {
      return (this.currentPage * this.take) - this.take + i + 1
    },
    formatRoundDt(roundDt){
      const year = roundDt.substring(0,4);
      const month = roundDt.substring(4,6);
      const day = roundDt.substring(6,8);
      return `${year}.${month}.${day}`
    }
  },
  computed: {
    hasRows() {
      return !!this.rows?.length
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

    ...mapGetters("control/", {
      company: "getCompany",
    }),
  },
}
</script>

<style scoped>
.table__wrapper {
  height: 100%;
  max-height: calc(100vh - 50px - 30px - 35px - 16px - 100px);
  overflow-y: scroll;
  text-align: center;
  table-layout: fixed;
  word-break: keep-all;
}

table {
  width: 100%;
  text-align: center;
}

table tr:hover {
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
  padding: 0.5rem;
  border: 1px solid var(--soft-green);
  font-size: 0.9rem;
}

@media (height: 1080px) {
  .table__wrapper {
    height: 720px;
    overflow-y: scroll;
    text-align: center;
    margin-top: 15px;
  }
}
</style>
