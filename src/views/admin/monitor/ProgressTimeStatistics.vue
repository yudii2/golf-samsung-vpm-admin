<template>
  <article id="progress_time_statistics__container">
    <header>
      <label for="search__term__input">기간조회</label>
      <input
        type="date"
        id="search__term__input"
        autocomplete="off"
        class="input-dark ml"
        v-model="parsedVisitFromDt"
        ref="input_from_date"
      />
      <span class="mx">-</span>
      <input
        type="date"
        id="search__to_term__input"
        class="input-dark"
        v-model="parsedVisitToDt"
        autocomplete="off"
        required
      />
      <button class="button-dark ml" @click="handleClickLookup">Search</button>
      <div v-if="isLoading" class="loading">
        <div></div>
      </div>
    </header>

    <body>
    <ProgressTimeStatisticsTable :rows="rows"/>
    </body>

    <footer class="pages__container mt">
      <Pages
        v-if="pager"
        :currentPage="currentPage"
        :pages="pages"
        :hasNext="pager.hasNext()"
        :hasPrevious="pager.hasPrevious()"
        @handleClickPage="updatePage"
        @onPrevious="handlePreviousPages"
        @onNext="handleNextPages"
      />
    </footer>
  </article>
</template>

<script>
import Pages from "@/components/shared/Pages.vue";
import ProgressTimeStatisticsTable from "@/components/admin/monitor/statistics/ProgressTimeStatisticsTable.vue";
import DateUtil from "@/utils/datetime/DateUtil";
import useStatistic from "@/api/v1/admin/monitor/useStatistic";
import {Pager} from "@/utils/usePage";
import {mapActions} from "vuex";
import {NO_REQUIRED_VISIT_DATE} from "@/utils/constants";

const now = new Date();
const {year, month, day} = DateUtil.dateDivider(now);
const visitDt = year + month + day;
const {getStatistics} = useStatistic();

export default {
  name: "ProgressTimeStatistics",
  components: {
    ProgressTimeStatisticsTable,
    Pages,
  },
  data() {
    return {
      currentPage: 1,
      pages: [],
      rows: [],
      pager: null,
      visitFromDt: "",
      visitToDt: "",
      visitDt,

      isLoading: false,
    };
  },

  methods: {
    /**
     * 진행시간 통계조회 API 호출.
     * @param visitFromDt
     * @param visitToDt
     * @returns {Promise<void>}
     */
    async requestGetStatistics({visitFromDt, visitToDt}) {
      const res = await getStatistics({visitFromDt, visitToDt});

      const {status} = res;
      this.isLoading = false;
      if (status !== "OK") return;

      const {
        data: {playTimeStatsVOList},
      } = res;
      this.updatePager(playTimeStatsVOList);
    },
    /**
     * Search 버튼 클릭메소드.
     */
    handleClickLookup() {
      let oldVisitFromDt = this.visitFromDt;
      let oldVisitToDt = this.visitToDt;

      if (oldVisitToDt.length === 0 || oldVisitToDt.length === 0) {
        this.dateInvalidMessage(NO_REQUIRED_VISIT_DATE);
      } else {
        this.isLoading = true;
        const visitFromDt = oldVisitFromDt.split("-").join("");
        const visitToDt = oldVisitToDt.split("-").join("");
        this.requestGetStatistics({visitFromDt, visitToDt});
      }
    },
    dateInvalidMessage(title, message) {
      this.toast({title, message});
    },
    /* paging methods start */
    updatePage(page) {
      this.currentPage = page;
    },

    handlePreviousPages() {
      const res = this.pager.previousPages();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },

    handleNextPages() {
      const res = this.pager.nextPages();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },

    updatePager(list) {
      this.pager = new Pager({
        list,
        take: 5,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
    /* paging methods end */
    ...mapActions({
      toast: "toast",
    }),
  },
  computed: {
    parsedVisitFromDt: {
      get() {
        const year = this.visitFromDt.substring(0, 4);
        const day = this.visitFromDt.substring(6, 8);
        const month = this.visitFromDt.substring(4, 6);
        return `${year}-${month}-${day}`
      },
      set(newValue) {
        const changedVisitFromDt = newValue.replaceAll('-', '');
        this.visitFromDt = changedVisitFromDt
      }
    },
    parsedVisitToDt: {
      get() {
        const year = this.visitToDt.substring(0, 4);
        const month = this.visitToDt.substring(4, 6);
        const day = this.visitToDt.substring(6, 8);

        return `${year}-${month}-${day}`
      },
      set(newValue) {
        const changedVisitToDt = newValue.replaceAll('-', '');
        this.visitToDt = changedVisitToDt
      }
    }
  },
  created() {
    this.visitFromDt = this.visitDt;
    this.visitToDt = this.visitDt;
  },
  /**
   * 진행시간 조회 API 호출.
   */
  mounted() {
    this.currentPage = 1;
    const visitFromDt = this.visitFromDt;
    const visitToDt = this.visitToDt;
    this.isLoading = true;
    this.requestGetStatistics({visitFromDt, visitToDt});
  },
  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
  },
};
</script>

<style scoped>
#progress_time_statistics__container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

#search__to_term__input,
#search__term__input {
  width: 180px;
}

/* footer start */
.loading {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
}

.loading div {
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  border: 3px solid transparent;
  border-left-width: 2px;
  border-top-color: var(--secondary);
  border-radius: 50%;
  animation: spinnerOne 2s infinite linear;
  margin-left: 15px;
}

/* footer end */
</style>
