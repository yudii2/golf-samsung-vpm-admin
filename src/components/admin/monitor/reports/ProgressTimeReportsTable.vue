<template>
  <div class="table__wrapper">
    <table>
      <thead>
        <tr>
          <th rowspan="2">No</th>
          <th rowspan="2">날짜</th>
          <th>회원구분</th>
          <th>예약코스</th>
          <th>출발코스</th>
          <th colspan="2">스타트</th>
          <th colspan="2">5번홀 종료</th>
          <th colspan="2">전반(9번홀) 종료</th>
          <th colspan="2">14번홀 종료</th>
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
          <th>시간</th>
          <th>소요시간</th>
          <th>시간</th>
          <th>소요시간</th>
          <th>시간</th>
          <th>소요시간</th>
          <th>간격시간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">1</td>
          <td rowspan="2">2022.01.01</td>
          <td>비회원</td>
          <td>out</td>
          <td>out</td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
          <td rowspan="2"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProgressTimeReportsTable",
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
