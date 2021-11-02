<template>
  <transition name="fade" appear>
    <div class="backdrop" @click.self="closeModal">
      <div class="competition-participants-modal__container">
        <CloseButton @onClose="closeModal" />

        <header>
          <h1>{{ title }}</h1>
        </header>

        <section class="table__wrapper mt">
          <table class="mb">
            <thead>
              <tr>
                <th>번호</th>
                <th>대회 ID</th>
                <th>참가자 번호</th>
                <th>승인 여부</th>
              </tr>
            </thead>

            <tbody v-if="hasData">
              <tr v-for="(row, rowIndex) in participants" :key="rowIndex">
                <td>{{ rowIndex + 1 }}</td>
                <td>{{ row.competitionId }}</td>
                <td>{{ row.custNo }}</td>
                <td>{{ row.acceptYn }}</td>
              </tr>
            </tbody>
            <tbody v-else class="no-participants">
              <tr>
                <td colspan="4">참가자가 존재하지 않습니다.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CloseButton from "../../shared/CloseButton.vue";

export default {
  name: "CompetitionParticipantsModal",

  components: {
    CloseButton,
  },

  computed: {
    title() {
      return this.competitionTitle || "참가자";
    },

    hasData() {
      return this.participants.length;
    },

    ...mapGetters("appSettings", {
      participants: "getParticipants",
      competitionTitle: "getCompetitionTitle",
    }),
  },

  methods: {
    closeModal() {
      this.setIsShowingCompetitionParticipantsModal(false);
    },

    ...mapActions({
      setIsShowingCompetitionParticipantsModal:
        "updateIsShowingCompetitionParticipantsModal",
    }),
  },
};
</script>

<style scoped>
.competition-participants-modal__container {
  position: absolute;
  width: 90%;
  height: 90%;
  background-color: var(--deep-green);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 20px;
}

header {
  height: 10%;
  display: flex;
  align-items: center;
}
header h2 {
  letter-spacing: 1.5px;
}

.table__wrapper {
  height: 90%;
  overflow-y: scroll;
}

table {
  width: 100%;
}
table thead tr {
  border: none;
}
table td {
  text-align: center;
}
table th {
  position: sticky;
  top: 0;
  background-color: var(--soft-green);
}
table th,
table td {
  padding: 10px;
  border-bottom: 1px solid var(--soft-green);
}
.no-participants {
  text-align: center;
}
</style>
