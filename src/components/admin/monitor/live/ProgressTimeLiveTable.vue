<template>
  <div class="table__wrapper">
    <table>
      <colgroup>
        <col width="3%" />
        <col width="4%" />
        <col width="3%" />
        <col width="3%" />
        <col width="4%" />
        <col width="4%" />
        <col width="7%" />

        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />

        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />

        <col width="4%" />
        <col width="4%" />
      </colgroup>
      <thead>
        <tr>
          <th>티업</th>
          <th>캐디</th>
          <th>전반</th>
          <th>후반</th>
          <th>현재</th>
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
          <th rowspan="2">정보</th>
        </tr>
        <tr>
          <th>종료</th>
          <th>카트</th>
          <th>시간</th>
          <th>시간</th>
          <th>홀</th>
          <th>경기</th>
          <th>홀간누적대기</th>
        </tr>
      </thead>
      <tbody v-for="(row, i) in rows" :key="i">
        <tr>
          <td>{{ parsedBookgTime(row.startTime) }}</td>
          <td>{{ row.caddieName }}</td>
          <td>{{ row.firstCourseNm }}</td>
          <td>{{ row.secondCourseNm }}</td>
          <td>{{ row.currentGolfCourse }}</td>
          <td>{{ row.totalTime }}</td>
          <td>{{ row.courseAccrueWaitTime }}</td>

          <td
            v-for="(par, i) in getCourseParInfo(row.firstCourseCd)"
            :key="`first${i}`"
          >
            {{ par.par }}
          </td>
          <td
            v-for="(par, i) in getCourseParInfo(row.secondCourseCd)"
            :key="`second${i}`"
          >
            {{ par.par }}
          </td>

          <td rowspan="2">{{ row.appraisal }}</td>
          <td rowspan="2">정보</td>
        </tr>

        <tr>
          <td>{{ row.endTime }}</td>
          <td>{{ row.cartNo }}</td>
          <td>{{ row.firstTime }}</td>
          <td>{{ row.secondTime }}</td>
          <td>{{ row.currentGOlfHole }}</td>
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
      <tbody v-if="!hasRow">
        <tr>
          <td colspan="27">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TimeUtil from "@/utils/datetime/TimeUtil";

export default {
  name: "ProgressTimeLiveTable",

  props: {
    rows: {
      type: Array,
      require: true,
    },
  },

  computed: {
    hasRow() {
      return Boolean(this.rows?.length);
    },

    /**
     * 문자열 시간 형태의 데이터를 구분자와 함께 포맷팅 해주는 함수.
     * @returns {function(*=): string}
     */
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
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
  },
};
</script>

<style scoped>
.table__wrapper {
  height: 610px;
  overflow-y: scroll;
  text-align: center;
}

table {
  width: 100%;
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
</style>
