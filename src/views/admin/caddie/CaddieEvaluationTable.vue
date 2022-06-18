<template>
  <div class="table__wrapper" id="table">
    <table>
      <colgroup>
        <col width="7%"/>
        <col width="7%"/>
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
      <tbody>
      <tr>
<!--        <template v-if="currentPage <= 1">-->
<!--          <td>{{ i + 1 }}</td>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <td>{{ getIndex(i) }}</td>-->
<!--        </template>|-->
        <td>1</td>
        <td>안성베네스트</td>
        <td>20211001</td>
        <td>출발 코스</td>
        <td>출발 시간</td>
        <td>캐디명</td>
        <td>유형</td>
        <td>#친절하고 밝아요</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CaddieEvaluationTable",
  props: {
    rows: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number
    },
    take: {
      type: Number
    }
  },
  methods :{
    getIndex(i) {
      return (this.currentPage * this.take) - this.take + i + 1
    },
  }
}
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
