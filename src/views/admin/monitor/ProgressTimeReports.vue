<template>
  <article id="progress_time_reports__container">
    <header>
      <ProgressTimeReportsSearch @onSearchClick="handleSearchClick"
                                 @changVisitFromDt="handleChangeVisitFromDt"
                                 @changVisitToDt="handleChangeVisitToDt"
                                 @onExcelDownloadClick="handleExcelDownload"
                                 :isLoading="isLoading"
                                 :visitFromDt="visitFromDt"
                                 :visitToDt="visitToDt"/>
    </header>
    <section>
      <ProgressTimeReportsTable ref="reportTable" :rows="rows" :allRows="allRows" :currentPage="currentPage" :take="take"/>
    </section>

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
import ProgressTimeReportsSearch from "@/components/admin/monitor/reports/ProgressTimeReportsSearch";
import ProgressTimeReportsTable from "@/components/admin/monitor/reports/ProgressTimeReportsTable";
import {fetchReport} from '@/api/v1/admin/monitor/useReport'
import DateUtil from "@/utils/datetime/DateUtil";
import Pages from "@/components/shared/Pages";
import {Pager} from "@/utils/usePage";

const now = new Date();
const {year, month, day} = DateUtil.dateDivider(now);
const visitDt = year + month + day;

export default {
  name: "ProgressTimeReports",
  components: {Pages, ProgressTimeReportsTable, ProgressTimeReportsSearch},
  data() {
    return {
      visitDt,
      rows: [],
      allRows: [],
      pages: [],
      pager: null,
      currentPage: 1,
      isLoading: false,
      visitFromDt: "",
      visitToDt: "",
      take: 15
    }
  },
  created() {
    this.visitFromDt = visitDt
    this.visitToDt = visitDt
  },
  async mounted() {
    this.currentPage = 1;
    await this.requestFetchReport();
  },
  methods: {
    async handleSearchClick(conditions) {
      const {visitFromDt, visitToDt, caddieName, currentCourseName} = conditions
      if (visitFromDt === "" && visitToDt === "") return alert('???????????? ??????????????????.')

      this.isLoading = true
      const {playFromToTimeBVOList} = await fetchReport({visitFromDt, visitToDt})

      this.allRows = playFromToTimeBVOList
      this.updatePager(playFromToTimeBVOList);

      if (caddieName || currentCourseName) {
        //case
        //?????? x , ?????? o
        //?????? o , ?????? x
        //?????? o , ?????? o
        if (caddieName && !currentCourseName) {
          this.rows = this.allRows?.filter((row) => row.caddieName === caddieName).map((row) => row);
          this.updatePager(this.rows);
        }

        if (!caddieName && currentCourseName) {
          if (currentCourseName !== '??????') {
            this.rows = this.allRows?.filter((row) => row.firstCourseNm === currentCourseName).map((row) => row);
            this.updatePager(this.rows);
          } else {
            this.updatePager(this.allRows);
          }
        }

        if (caddieName && currentCourseName) {
          if (currentCourseName !== '??????') {
            this.rows = this.allRows?.filter((row) => row.firstCourseNm === currentCourseName && row.caddieName === caddieName).map((row) => row);
            this.updatePager(this.rows);
          } else {
            this.rows = this.allRows?.filter((row) => row.caddieName === caddieName).map((row) => row);
            this.updatePager(this.rows);
          }
        }
      }
      this.isLoading = false
    },
    async requestFetchReport() {
      const visitFromDt = this.visitFromDt;
      const visitToDt = this.visitToDt;

      this.isLoading = true;
      const {playFromToTimeBVOList} = await fetchReport({visitFromDt, visitToDt})

      this.allRows = playFromToTimeBVOList
      this.updatePager(playFromToTimeBVOList);
      this.isLoading = false;
    },
    handleChangeVisitFromDt(changedVisitFromDt) {
      this.visitFromDt = changedVisitFromDt
    },
    handleChangeVisitToDt(changedVisitToDt) {
      this.visitToDt = changedVisitToDt
    },
    handleExcelDownload() {
      this.$refs.reportTable.excelDownloadFunc();
    },
    removeDash(visitMonth) {
      if (visitMonth.includes('-')) {
        return visitMonth.replaceAll("-", "");
      }
    },
    /* methods about paging start */
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
        take: this.take,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
    /* methods about paging end*/
  },
  computed: {
    getRowToTalCount() {
      return this.rows?.length || 0
    }
  },
  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
  },

};
</script>

<style scoped>
#progress_time_reports__container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

</style>
