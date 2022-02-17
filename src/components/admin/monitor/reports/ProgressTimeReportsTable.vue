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
      <tbody v-for="(list,index) in playFromToTimeBVOList" :key="index">
      <tr>
        <td rowspan="2">{{ index + 1 }}</td>
        <td rowspan="2">{{ list.visitYear }}.{{ list.visitMonth }}</td>
        <td>{{ list.memberCdName }}</td>
        <td>{{ list.firstCourseNm }}</td>
        <td>{{ list.firstCourseNm }}</td>
        <td rowspan="2">{{ list.startHoleTime }}</td>
        <td rowspan="2">{{ list.startHoleTerm }}</td>
        <td rowspan="2">{{ list.firstMidTime }}</td>
        <td rowspan="2">{{ list.firstMidTerm }}</td>
        <td rowspan="2">{{ list.firstEndTime }}</td>
        <td rowspan="2">{{ list.firstEndTerm }}</td>
        <td rowspan="2">{{ list.secondMidTime }}</td>
        <td rowspan="2">{{ list.secondMidTerm }}</td>
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
    </table>
  </div>
</template>

<script>
export default {
  name: "ProgressTimeReportsTable",
  data() {
    return {
      "playFromToTimeBVOList": [
        {
          "roundId": '23012321',
          "visitYear": '2022',
          "visitMonth": '0230',
          "memberCdName": '회원',
          "caddieName": '최유정',
          "bookgCourse": '서',
          "bookgTime": '0600',
          "firstCourseCd": '1',
          "firstCourseNm": '서',
          "startTime": '0000',
          "startHoleTime": '0001',
          "startHoleTerm": '0002',
          "firstMidTime": '0003',
          "firstMidTerm": '0004',
          "firstEndTime": '0005',
          "firstEndTerm": '0006',
          "secondMidTime": '0007',
          "secondMidTerm": '0008',
          "secondEndTime": '0009',
          "secondEndTerm": '0010',
          "teamTerm": '0011',
          "roundTerm": '123123',
          "secondCourseNm": '남',
          "secondCourseCd": '2 ',
        },
        {
          "roundId": '23012321',
          "visitYear": '2022',
          "visitMonth": '0230',
          "memberCdName": '회원',
          "caddieName": '최유정12',
          "bookgCourse": '서',
          "bookgTime": '0600',
          "firstCourseCd": '1',
          "firstCourseNm": '서',
          "startTime": '0000',
          "startHoleTime": '0001',
          "startHoleTerm": '0002',
          "firstMidTime": '0003',
          "firstMidTerm": '0004',
          "firstEndTime": '0005',
          "firstEndTerm": '0006',
          "secondMidTime": '0007',
          "secondMidTerm": '0008',
          "secondEndTime": '0009',
          "secondEndTerm": '0010',
          "teamTerm": '0011',
          "roundTerm": '123123',
          "secondCourseNm": '남',
          "secondCourseCd": '2 ',
        },

      ]
    }
  },
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
