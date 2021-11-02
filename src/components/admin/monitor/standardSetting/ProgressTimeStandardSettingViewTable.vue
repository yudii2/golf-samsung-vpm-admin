<template>
  <table>
    <colgroup>
      <col width="15%" />
    </colgroup>
    <thead>
      <tr>
        <th></th>
        <th>코스</th>
        <th>경기시간</th>
        <th>홀간대기</th>
        <th>코스대기</th>
        <th>전체시간</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>전반</td>
        <td>코스</td>
        <td>경기시간</td>
        <td>홀간대기</td>
        <td rowspan="2">코스대기</td>
        <td rowspan="2">전체시간</td>
      </tr>
      <tr>
        <td>후반</td>
        <td>코스</td>
        <td>경기시간</td>
        <td>홀간대기</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ProgressTimeStandardSettingViewTable",
};
</script>

<style scoped>
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
