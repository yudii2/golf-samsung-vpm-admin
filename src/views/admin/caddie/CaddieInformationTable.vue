<template>
  <div class="table__wrapper" id="table">
    <table>
      <colgroup>
        <col width="7%"/>
        <col width="7%"/>
        <col width="7%"/>
        <col width="10%"/>
        <col width="7%"/>
      </colgroup>
      <thead>
      <tr>
        <th>No</th>
        <th>캐디번호</th>
        <th>캐디이름</th>
        <th>핸드폰번호</th>
        <th>카트번호</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(caddie,i) in rows" :key="i" @click="handleCaddieInformationClick(caddie)">
        <template v-if="currentPage <= 1">
          <td>{{ i + 1 }}</td>
        </template>
        <template v-else>
          <td>{{ getIndex(i) }}</td>
        </template>
        <td>{{ caddie.caddieUniqNo }}</td>
        <td>{{ caddie.caddieName }}</td>
        <td>{{ caddie.mobileNo | getFormattedPhoneNumber }}</td>
        <td>{{ caddie.cartNo }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getFormattedPhoneNumber} from "@/utils/string";
import {mapActions} from "vuex";

export default {
  name: "CaddieInformationTable",
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
  methods: {
    handleCaddieInformationClick(caddie) {
      this.updateSelectedCaddieInformation(caddie)
      this.updateIsShowingClubMemoModal(true);
    },
    getIndex(i) {
      return (this.currentPage * this.take) - this.take + i + 1
    },
    ...mapActions({
      updateIsShowingClubMemoModal: "dispatchIsShowingCaddieInformationModal",
    }),
    ...mapActions('admin/', {
      updateSelectedCaddieInformation: "dispatchUpdateSelectedCaddieInformation",
    })
  },
  watch: {
    currentPage() {
      document.getElementById('table').scrollTop = 0;
    }
  },
  filters: {
    getFormattedPhoneNumber
  }
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
