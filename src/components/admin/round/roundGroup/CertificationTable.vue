<template>
  <div class="table_wrapper">
    <table>
      <colgroup>
        <col width="4%" />
        <col width="7%" />
        <col width="4%" />
        <col width="7%" />
        <col width="4%" />
        <col width="4%" />
        <col width="4%" />
      </colgroup>
      <thead>
        <tr>
          <th>기록일자</th>
          <th>증명서 구분</th>
          <th>기록자</th>
          <th>동반자</th>
          <th>기록코스</th>
          <th>기록홀</th>
          <th>증명서 발급</th>
        </tr>
      </thead>

      <tbody v-if="hasRows">
        <tr v-for="(row, i) in rows" :key="i">
          <td>{{ parsedRecordDt(row.recordDt) }}</td>
          <td>{{ certificateNmByCd(row.certificateCd) }}</td>
          <td>{{ row.playerNm }}</td>
          <td>{{ row.companionNames }}</td>
          <td>{{ row.courseNm }}코스</td>
          <td>{{ row.holeNm }}</td>
          <td>
            <button
              class="button-dark"
              @click="handleClickCertificationDetail(row)"
            >
              발급
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useCertificate from "@/api/v1/admin/certificate/useCertificate";
import DateUtil from "@/utils/datetime/DateUtil";

const { updateCertification } = useCertificate();
export default {
  name: "CertificationTable",

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

  methods: {
    async handleClickCertificationDetail(certification) {
      const roundId = certification.roundId;
      const playerId = certification.playerId;
      const certificateCd = certification.certificateCd;
      const res = await updateCertification({
        roundId,
        playerId,
        certificateCd,
      });

      const { status } = res;
      if (status !== "OK") return;

      this.setSelectedCertification(res.data);
      this.updateIsShowingCertificationDetailModal(true);
    },

    certificateNmByCd(certificateCd) {
      switch (certificateCd) {
        case "1":
          return "이글 증명서";
        case "2":
          return "홀인원 증명서";
        case "3":
          return "알바트로스 증명서";
        case "4":
          return "에이지슈터 증명서";
      }
    },

    parsedRecordDt(visitDt) {
      const date = DateUtil.eightToDate(visitDt);
      const { year, month, day } = DateUtil.dateDivider(date);
      return `${year}.${month}.${day}`;
    },

    ...mapActions({
      updateIsShowingCertificationDetailModal:
        "updateIsShowingCertificationDetailModal",
      toastPreparing: "toastPreparing",
    }),
    ...mapActions("admin/", {
      setSelectedCertification: "dispatchSelectedCertification",
    }),
  },
};
</script>

<style scoped>
.table_wrapper {
  height: 725px;
  overflow-y: scroll;
}

table {
  width: 100%;
  border: 1px solid var(--primary);
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
  .table_wrapper {
    height: 720px;
    overflow-y: scroll;
  }
}
</style>
