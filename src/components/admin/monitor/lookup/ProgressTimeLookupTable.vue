<template>
  <div class="table__wrapper">
    <table id="excel_table">
      <colgroup>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="13%"/>

        <!-- 1홀 ~ 9홀-->
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>

        <col width="6%"/>
      </colgroup>
      <thead>
      <tr>
        <th>년도</th>
        <th>티업</th>
        <th>캐디</th>
        <th>전반</th>
        <th>후반</th>
        <th>전체</th>
        <th>코스간</th>

        <th rowspan="2">1홀</th>
        <th rowspan="2">2홀</th>
        <th rowspan="2">3홀</th>
        <th rowspan="2">4홀</th>
        <th rowspan="2">5홀</th>
        <th rowspan="2">6홀</th>
        <th rowspan="2">7홀</th>
        <th rowspan="2">8홀</th>
        <th rowspan="2">9홀</th>

        <th rowspan="2">1홀</th>
        <th rowspan="2">2홀</th>
        <th rowspan="2">3홀</th>
        <th rowspan="2">4홀</th>
        <th rowspan="2">5홀</th>
        <th rowspan="2">6홀</th>
        <th rowspan="2">7홀</th>
        <th rowspan="2">8홀</th>
        <th rowspan="2">9홀</th>

        <th rowspan="2">평가</th>
      </tr>

      <tr>
        <th>월일</th>
        <th>종료</th>
        <th>카트</th>
        <th>시간</th>
        <th>시간</th>
        <th>경기</th>
        <th>홀간누적대기</th>
      </tr>
      </thead>
      <tbody v-for="(row, i) in rows" :key="i">
      <tr>
        <td>{{ row.visitYear }}</td>
        <td>{{ parsedBookgTime(row.startTime) }}</td>
        <td>{{ row.caddieName }}</td>
        <td>{{ row.firstCourseNm }}</td>
        <td>{{ row.secondCourseNm }}</td>
        <td>{{ row.totalTime }}</td>
        <td>{{ row.courseAccrueWaitTime }}</td>

        <td
          v-for="(par, i) in getCourseParInfo(row.firstCourseCd)"
          :key="`first_${i}`"
        >
          {{ par.par }}
        </td>

        <td
          v-for="(par, i) in getCourseParInfo(row.secondCourseCd)"
          :key="`second_${i}`"
        >
          {{ par.par }}
        </td>
        <td rowspan="2">{{ row.appraisal }}</td>
      </tr>

      <tr>
        <td>{{ parsedVisitMonth(row.visitMonth) }}</td>
        <td>{{ parsedBookgTime(row.endTime) }}</td>
        <td>{{ row.cartNo }}</td>
        <td>{{ row.firstTime }}</td>
        <td>{{ row.secondTime }}</td>
        <td>{{ row.roundTime }}</td>
        <td>{{ row.holeAccrueWaitTime }}</td>

        <td>{{ row.firstTimeHole1 }}</td>
        <td>{{ row.firstTimeHole2 }}</td>
        <td>{{ row.firstTimeHole3 }}</td>
        <td>{{ row.firstTimeHole4 }}</td>
        <td>{{ row.firstTimeHole5 }}</td>
        <td>{{ row.firstTimeHole6 }}</td>
        <td>{{ row.firstTimeHole7 }}</td>
        <td>{{ row.firstTimeHole8 }}</td>
        <td>{{ row.firstTimeHole9 }}</td>

        <td>{{ row.secondTimeHole1 }}</td>
        <td>{{ row.secondTimeHole2 }}</td>
        <td>{{ row.secondTimeHole3 }}</td>
        <td>{{ row.secondTimeHole4 }}</td>
        <td>{{ row.secondTimeHole5 }}</td>
        <td>{{ row.secondTimeHole6 }}</td>
        <td>{{ row.secondTimeHole7 }}</td>
        <td>{{ row.secondTimeHole8 }}</td>
        <td>{{ row.secondTimeHole9 }}</td>
      </tr>
      </tbody>
      <tbody v-if="!hasRows">
      <tr>
        <td colspan="26">조회된 결과가 없습니다.</td>
      </tr>
      </tbody>
    </table>
    <table v-show="isShown" id="excel_all_table">
      <colgroup>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="6%"/>
        <col width="13%"/>

        <!-- 1홀 ~ 9홀-->
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>
        <col width="*"/>

        <col width="6%"/>
      </colgroup>
      <thead>
      <tr>
        <th>년도</th>
        <th>티업</th>
        <th>캐디</th>
        <th>전반</th>
        <th>후반</th>
        <th>전체</th>
        <th>코스간</th>

        <th rowspan="2">1홀</th>
        <th rowspan="2">2홀</th>
        <th rowspan="2">3홀</th>
        <th rowspan="2">4홀</th>
        <th rowspan="2">5홀</th>
        <th rowspan="2">6홀</th>
        <th rowspan="2">7홀</th>
        <th rowspan="2">8홀</th>
        <th rowspan="2">9홀</th>

        <th rowspan="2">1홀</th>
        <th rowspan="2">2홀</th>
        <th rowspan="2">3홀</th>
        <th rowspan="2">4홀</th>
        <th rowspan="2">5홀</th>
        <th rowspan="2">6홀</th>
        <th rowspan="2">7홀</th>
        <th rowspan="2">8홀</th>
        <th rowspan="2">9홀</th>

        <th rowspan="2">평가</th>
      </tr>

      <tr>
        <th>월일</th>
        <th>종료</th>
        <th>카트</th>
        <th>시간</th>
        <th>시간</th>
        <th>경기</th>
        <th>홀간누적대기</th>
      </tr>
      </thead>
      <tbody v-for="(row, i) in computedAllRows" :key="i">
      <tr>
        <td>{{ row.visitYear }}</td>
        <td>{{ parsedBookgTime(row.startTime) }}</td>
        <td>{{ row.caddieName }}</td>
        <td>{{ row.firstCourseNm }}</td>
        <td>{{ row.secondCourseNm }}</td>
        <td>{{ row.totalTime }}</td>
        <td>{{ row.courseAccrueWaitTime }}</td>

        <td
          v-for="(par, i) in getCourseParInfo(row.firstCourseCd)"
          :key="`first_${i}`"
        >
          {{ par.par }}
        </td>

        <td
          v-for="(par, i) in getCourseParInfo(row.secondCourseCd)"
          :key="`second_${i}`"
        >
          {{ par.par }}
        </td>
        <td rowspan="2">{{ row.appraisal }}</td>
      </tr>

      <tr>
        <td>{{ parsedVisitMonth(row.visitMonth) }}</td>
        <td>{{ parsedBookgTime(row.endTime) }}</td>
        <td>{{ row.cartNo }}</td>
        <td>{{ row.firstTime }}</td>
        <td>{{ row.secondTime }}</td>
        <td>{{ row.roundTime }}</td>
        <td>{{ row.holeAccrueWaitTime }}</td>

        <td>{{ row.firstTimeHole1 }}</td>
        <td>{{ row.firstTimeHole2 }}</td>
        <td>{{ row.firstTimeHole3 }}</td>
        <td>{{ row.firstTimeHole4 }}</td>
        <td>{{ row.firstTimeHole5 }}</td>
        <td>{{ row.firstTimeHole6 }}</td>
        <td>{{ row.firstTimeHole7 }}</td>
        <td>{{ row.firstTimeHole8 }}</td>
        <td>{{ row.firstTimeHole9 }}</td>

        <td>{{ row.secondTimeHole1 }}</td>
        <td>{{ row.secondTimeHole2 }}</td>
        <td>{{ row.secondTimeHole3 }}</td>
        <td>{{ row.secondTimeHole4 }}</td>
        <td>{{ row.secondTimeHole5 }}</td>
        <td>{{ row.secondTimeHole6 }}</td>
        <td>{{ row.secondTimeHole7 }}</td>
        <td>{{ row.secondTimeHole8 }}</td>
        <td>{{ row.secondTimeHole9 }}</td>
      </tr>
      </tbody>
      <tbody v-if="!hasRows">
      <tr>
        <td colspan="26">조회된 결과가 없습니다.</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TimeUtil from "@/utils/datetime/TimeUtil";
import xlsx from 'xlsx'

export default {
  name: "ProgressTimeLookupTable",

  props: {
    rows: {
      type: Array,
      require: true,
    },
    allRows: {
      type: Array,
    },
  },

  data() {
    return {
      isShown: false
    }
  },

  computed: {
    hasRows() {
      return Boolean(this.rows?.length);
    },

    /**
     * bookgTime 포맷팅.
     * input : 0600
     * output : 06:00
     * @returns {function(*=): string}
     */
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },
    computedAllRows(){
      const computedAllRows = this.allRows;

      return computedAllRows?.reverse() || [];
    },
    ...mapGetters("control/", {
      getCourseParInfoByCourseCode: "getCourseParInfoByCourseCode",
    }),
  },

  methods: {
    /**
     * 코스 코드로 해당 코스 홀의 파 정보를 가져오는 메소드.
     * @param courseCd
     * @returns {*}
     */
    getCourseParInfo(courseCd) {
      return this.getCourseParInfoByCourseCode(courseCd);
    },

    /**
     * visitMonth 파싱 메소드.
     * input 09-14
     * output 09.14
     * @param visitMonth
     * @returns {*|string}
     */
    parsedVisitMonth(visitMonth) {
      return visitMonth.replaceAll("-", ".");
    },
    excelDownloadFunc() {
      if (!this.rows) {
        this.toast({title: '엑셀 다운로드', message: ' 조회된 결과가 없습니다.'});
        return;
      }

      const tableData = document.getElementById("excel_all_table")

      const dataWorkSheet = xlsx.utils.table_to_sheet(tableData)
      const dataWorkBook = xlsx.utils.book_new();

      xlsx.utils.book_append_sheet(dataWorkBook, dataWorkSheet, '진행시간조회');
      xlsx.writeFile(dataWorkBook, '진행시간조회.xlsx');
    },
    ...mapActions({
      toast: "toast",
    })
  },
};
</script>

<style scoped>
.table__wrapper {
  height: 725px;
  overflow-y: scroll;
  table-layout: fixed;
  word-break: keep-all;
}

table {
  width: 100%;
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
