<template>
  <section class="tablets__container mt">
    <table class="table-dark">
      <!-- 테이블 헤더 -->
      <thead>
        <tr>
          <th>순번</th>
          <th>UUID</th>
          <th>사업장</th>
          <th>사용여부</th>
          <th>비고</th>
        </tr>
      </thead>

      <!-- 테이블 바디 -->
      <tbody v-if="hasTablets">
        <tr v-for="(tablet, tabletIndex) in tablets" :key="tabletIndex">
          <td>{{ tabletIndex + 1 }}</td>
          <td>{{ tablet.uuid }}</td>
          <td>{{ tablet.companyCd }}</td>
          <td>{{ tablet.useYn }}</td>
          <td>{{ tablet.remarks | remark }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5">태블릿이 존재하지 않습니다.</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "TabletManageBody",

  props: {
    tablets: {
      type: Array,
      require: true,
    },
  },

  computed: {
    hasTablets() {
      return Boolean(this.tablets.length);
    },
  },

  filters: {
    remark(value) {
      return value ? value : "-";
    },
  },
};
</script>

<style scoped>
/* 
  Tablet list start
  max-height : Logo header(50px) - current tab header(30px) - current tab padding(35px) - table margin top(16px)
*/
.tablets__container {
  height: 100%;
  max-height: calc(100vh - 50px - 30px - 35px - 16px);
  overflow-y: scroll;
}
/* Tablet list end */
</style>
