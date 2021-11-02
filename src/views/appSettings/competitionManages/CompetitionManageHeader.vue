<template>
  <header>
    <form @submit.prevent="handleSearchSubmit">
      <input
        class="input-dark"
        :placeholder="fromDatePlaceholder"
        v-model="fromDate"
        type="text"
      />
      <span class="date-divider-text ml"> ~ </span>
      <input
        class="input-dark ml"
        :placeholder="toDatePlaceholder"
        v-model="toDate"
        type="text"
      />
      <button class="button-dark ml">Search</button>
    </form>

    <div class="actions">
      <button class="button-dark" @click="handleCompetitionCreateClick">
        대회 생성
      </button>
    </div>
  </header>
</template>

<script>
import useDate from "@/composables/useDate";
import { mapActions, mapGetters } from "vuex";
const { changeDateFormatByChar } = useDate();

export default {
  name: "CompetitionManageHeader",

  data() {
    return {
      fromDate: "",
      toDate: "",
      fromDatePlaceholder: "",
      toDatePlaceholder: "",
    };
  },

  computed: {
    ...mapGetters("appSettings", {
      competitionsUpdated: "getCompetitionsUpdated",
    }),
  },

  methods: {
    init() {
      this.initDate();
    },

    /**
     * ### 날짜 데이터 초기화.
     */
    initDate() {
      const today = new Date();

      // Set to date.
      const to = changeDateFormatByChar(today, "");

      // Set from Date.
      today.setDate(1);
      const from = changeDateFormatByChar(today, "");

      // Set placeholders.
      this.toDatePlaceholder = to;
      this.fromDatePlaceholder = from;

      // Set data
      this.toDate = to;
      this.fromDate = from;

      this.handleSearchSubmit();
    },

    handleSearchSubmit() {
      this.$emit("onSubmit", {
        fromDate: this.fromDate,
        toDate: this.toDate,
      });
    },

    handleCompetitionCreateClick() {
      this.setIsShowingCompetitionCreateModal(true);
    },

    ...mapActions({
      setIsShowingCompetitionCreateModal:
        "updateIsShowingCompetitionCreateModal",
    }),
    ...mapActions("appSettings", {
      setCompetitionsUpdated: "updateCompetitionsUpdated",
    }),
  },

  mounted() {
    this.init();
  },

  watch: {
    async competitionsUpdated(status) {
      if (status) {
        await this.initDate();
      }

      this.setCompetitionsUpdated(false);
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 35px;
}
header form {
  display: flex;
  align-items: center;
}
header form * {
  height: 35px;
}
header .date-divider-text {
  color: var(--secondary);
  line-height: 35px;
}
</style>
