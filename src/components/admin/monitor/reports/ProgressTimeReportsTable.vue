<template>
  <div class="table__wrapper" id="table">
    <table>
      <thead>
      <tr>
        <th rowspan="2">No</th>
        <th rowspan="2">날짜</th>
        <th>회원구분</th>
        <th>예약코스</th>
        <th>출발코스</th>
        <th colspan="2">스타트</th>
        <th colspan="2">전반(9번홀) 종료</th>
        <th>팀간</th>
        <th colspan="2">종료시간</th>
        <th>팀간</th>
        <th rowspan="2">코스내O/T</th>
      </tr>
      <tr>
        <th>캐디명</th>
        <th>예약시간</th>
        <th>출발시간</th>
        <th>시간</th>
        <th>소요시간</th>
        <th>시간</th>
        <th>소요시간</th>
        <th>간격시간</th>
        <th>시간</th>
        <th>소요시간</th>
        <th>간격시간</th>
      </tr>
      </thead>
      <template v-if="hasRows">
        <tbody v-for="(list,index) in rows" :key="index">
        <tr>
          <template v-if="currentPage <= 1 ">
            <td rowspan="2">{{ index + 1 }}</td>
          </template>
          <template v-else>
            <td rowspan="2">{{ getIndex(index) }}</td>
          </template>
          <td rowspan="2">{{ parsedVisitDt(list) }}</td>
          <td>{{ list.memberCdName }}</td>
          <td>{{ list.bookgCourse }}</td>
          <td>{{ list.firstCourseNm }}</td>
          <td rowspan="2">{{ list.startHoleTime }}</td>
          <td rowspan="2">{{ list.startHoleTerm }}</td>
          <td rowspan="2">{{ list.firstEndTime }}</td>
          <td rowspan="2">{{ list.firstEndTerm }}</td>
          <td rowspan="2">{{ list.midTeamTerm }}</td>
          <td rowspan="2">{{ list.secondEndTime }}</td>
          <td rowspan="2">{{ list.secondEndTerm }}</td>
          <td rowspan="2">{{ list.teamTerm }}</td>
          <td rowspan="2">{{ list.roundTerm }}</td>
        </tr>
        <tr>
          <td>{{ list.caddieName }}</td>
          <td>{{ list.bookgTime }}</td>
          <td>{{ list.startTime }}</td>
        </tr>
        </tbody>
      </template>
      <template v-else>
        <tbody>
        <tr>
          <td colspan="14">조회된 결과가 없습니다.</td>
        </tr>
        </tbody>
      </template>
    </table>
    <table v-show="isShown" id="excel_all_table">
      <thead>
      <tr>
        <th rowspan="2">No</th>
        <th rowspan="2">날짜</th>
        <th>회원구분</th>
        <th>예약코스</th>
        <th>출발코스</th>
        <th colspan="2">스타트</th>
        <th colspan="2">전반(9번홀) 종료</th>
        <th>팀간</th>
        <th colspan="2">종료시간</th>
        <th>팀간</th>
        <th rowspan="2">코스내O/T</th>
      </tr>
      <tr>
        <th>캐디명</th>
        <th>예약시간</th>
        <th>출발시간</th>
        <th>시간</th>
        <th>소요시간</th>
        <th>시간</th>
        <th>소요시간</th>
        <th>간격시간</th>
        <th>시간</th>
        <th>소요시간</th>
        <th>간격시간</th>
      </tr>
      </thead>
      <template v-if="hasRows">
        <tbody v-for="(list,index) in allRows" :key="index">
        <tr>
          <td rowspan="2">{{ index + 1 }}</td>
          <td rowspan="2">{{ parsedVisitDt(list) }}</td>
          <td>{{ list.memberCdName }}</td>
          <td>{{ list.firstCourseNm }}</td>
          <td>{{ list.firstCourseNm }}</td>
          <td rowspan="2">{{ list.startHoleTime }}</td>
          <td rowspan="2">{{ list.startHoleTerm }}</td>
          <td rowspan="2">{{ list.firstEndTime }}</td>
          <td rowspan="2">{{ list.firstEndTerm }}</td>
          <td rowspan="2">{{ list.midTeamTerm }}</td>
          <td rowspan="2">{{ list.secondEndTime }}</td>
          <td rowspan="2">{{ list.secondEndTerm }}</td>
          <td rowspan="2">{{ list.teamTerm }}</td>
          <td rowspan="2">{{ list.roundTerm }}</td>
        </tr>
        <tr>
          <td>{{ list.caddieName }}</td>
          <td>{{ list.bookgTime }}</td>
          <td>{{ list.startTime }}</td>
        </tr>
        </tbody>
      </template>
      <template v-else>
        <tbody>
        <tr>
          <td colspan="14">조회된 결과가 없습니다.</td>
        </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import xlsx from "xlsx";

export default {
  name: "ProgressTimeReportsTable",
  props: {
    rows: {
      type: Array,
    },
    allRows: {
      type: Array,
    },
    currentPage: {
      type: Number
    },
    take: {
      type: Number
    }
  },
  data() {
    return {
      isShown: false
    }
  },
  computed: {
    hasRows() {
      return !!this.rows?.length
    }
  },
  methods: {
    parsedVisitDt(row) {
      const {visitYear, visitMonth} = row
      const parsedVisitMonth = visitMonth.replaceAll('-', '.');
      return `${visitYear}.${parsedVisitMonth}`
    },
    getIndex(index) {
      return (this.currentPage * this.take) - this.take + index + 1
    },
    excelDownloadFunc() {
      if (!this.rows) {
        this.toast({title: '엑셀 다운로드', message: ' 조회된 결과가 없습니다.'});
        return;
      }
      const tableData = document.getElementById("excel_all_table")

      const dataWorkSheet = xlsx.utils.table_to_sheet(tableData)
      const dataWorkBook = xlsx.utils.book_new();

      xlsx.utils.book_append_sheet(dataWorkBook, dataWorkSheet, '진행시간평가');
      xlsx.writeFile(dataWorkBook, '진행시간평가.xlsx');
    },
    ...mapActions({
      toast: "toast",
    })
  },
  watch: {
    currentPage() {
      document.getElementById('table').scrollTop = 0;
    }
  }
};
</script>

<style scoped>
.table__wrapper {
  height: 725px;
  overflow-y: scroll;
  text-align: center;
  table-layout: fixed;
  word-break: keep-all;
}

table {
  width: 100%;
  text-align: center;
}

table tbody:hover {
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
