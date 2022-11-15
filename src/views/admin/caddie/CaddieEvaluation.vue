<template>
  <article id="caddie_evaluation__container">
    <header>
      <CaddieEvaluationSearch
        :isLoading="isLoading"
        :visitFromDt="visitFromDt"
        :visitToDt="visitToDt"
        @onSearchClick="handleFetchCaddieEvaluation"
        @changVisitFromDt="handleChangeVisitFromDt"
        @changVisitToDt="handleChangeVisitToDt"
      />
    </header>
    <section>
      <CaddieEvaluationTable
        :rows="rows"
        :currentPage="currentPage"
        :take="take"
      />
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
import CaddieEvaluationSearch from "@/views/admin/caddie/CaddieEvaluationSearch";
import CaddieEvaluationTable from "@/views/admin/caddie/CaddieEvaluationTable";
import Pages from "@/components/shared/Pages";
import useCaddie from "@/api/v1/admin/caddie/useCaddie";
import {Pager} from "@/utils/usePage";
import {mapGetters} from "vuex";
import DateUtil from "@/utils/datetime/DateUtil";

const {getCaddieEvaluation} = useCaddie();

const now = new Date();
const {year, month, day} = DateUtil.dateDivider(now);
const visitDt = year + month + day;

export default {
  name: "CaddieEvaluation",
  components: {Pages, CaddieEvaluationTable, CaddieEvaluationSearch},
  data() {
    return {
      visitDt,
      currentPage: 1,
      rows: [],
      pages: [],
      pager: null,

      isLoading: false,
      visitFromDt: "",
      visitToDt: "",
      take: 15,
    }
  },
  created() {
    this.visitFromDt = visitDt
    this.visitToDt = visitDt
  },
  mounted() {
    this.handleFetchCaddieEvaluation(this.visitFromDt, this.visitToDt);
  },
  methods: {
    async handleFetchCaddieEvaluation(fromDt, toDt) {
      this.isLoading = true;
      const {code} = this.company
      const res = await getCaddieEvaluation(code, fromDt, toDt);

      const {status} = res;
      if (status !== 'OK') return;

      const {data: {roundEvaluationList}} = res;
      this.rows = roundEvaluationList;
      this.updatePager(this.rows);
      this.isLoading = false;
    },
    handleChangeVisitFromDt(changedVisitFromDt){
      this.visitFromDt = changedVisitFromDt
    },
    handleChangeVisitToDt(changedVisitToDt) {
      this.visitToDt = changedVisitToDt
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
  },
  /* methods about paging end*/
  computed: {
    ...mapGetters("control/", {
      company: "getCompany",
    }),
  },
  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
  },

}
</script>

<style scoped>
#caddie_evaluation__container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

</style>
