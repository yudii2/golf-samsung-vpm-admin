<template>
  <div class="table__wrapper">
    <table>
      <colgroup>
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
      </colgroup>
      <thead>
        <tr>
          <th>구분</th>
          <th>라운드</th>
          <th>전체</th>
          <th>경기</th>
          <th>전반</th>
          <th>후반</th>
          <th>중간</th>
          <th>홀간누적대기</th>
          <th>우수</th>
          <th>정상</th>
          <th>개선</th>
          <th>위기</th>
          <th>표준편차</th>
          <th>평점</th>
        </tr>
      </thead>

      <tbody v-if="hasRows">
        <tr v-for="(row, i) in rows" :key="`${row.allPlayTime}${i}`">
          <td>{{ row.visitDt }}</td>
          <td>{{ row.roundCnt }}</td>
          <td>{{ row.allPlayTime }}</td>
          <td>{{ row.onlyPlayTime }}</td>
          <td>{{ row.firstPlayTime }}</td>
          <td>{{ row.secondPlayTime }}</td>
          <td>{{ row.middleTime }}</td>
          <td>{{ row.holeAccuTime }}</td>
          <td>{{ row.exCnt }}</td>
          <td>{{ row.standardDiv }}</td>
          <td>{{ row.gdCnt }}</td>
          <td>{{ row.niCnt }}</td>
          <td>{{ row.vgCnt }}</td>
          <td>{{ row.rating }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="14">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProgressTimeStatisticsTable",

  props: {
    rows: {
      type: Array,
      require: true,
    },
  },

  computed: {
    hasRows() {
      return Boolean(this.rows?.length);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}

.table__wrapper {
  height: 725px;
  overflow-y: scroll;
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
    height: 720px;
    overflow-y: scroll;
    text-align: center;
  }
}
</style>
