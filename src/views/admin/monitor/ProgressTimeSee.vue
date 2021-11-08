<template>
  <article id="progress_time_look_up__container">
    <header>
      <label for="search__term__input">기간조회</label>
      <input
        type="date"
        id="search__term__input"
        autocomplete="off"
        class="input-dark ml"
        v-model="visitFromDt"
        ref="input_from_date"
      />
      <span class="mx">-</span>
      <input
        type="date"
        id="search__to_term__input"
        class="input-dark"
        v-model="visitToDt"
        autocomplete="off"
        required
      />
      <button class="button-dark ml" @click="handleClickLookup">Search</button>
    </header>

    <section>
      <ProgressTimeLookupTable :rows="rows" />
    </section>

    <footer>
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
import { Pager } from "@/utils/usePage.js";
import Pages from "@/components/shared/Pages.vue";
import ProgressTimeLookupTable from "@/components/admin/monitor/lookup/ProgressTimeLookupTable.vue";
import useStandardSetting from "@/api/v1/admin/monitor/useStandardSetting";
import DateUtil from "@/utils/datetime/DateUtil";
import { mapActions } from "vuex";
import { NO_REQUIRED_VISIT_DATE } from "@/utils/constants";

const { getPlayingTime } = useStandardSetting();
const now = new Date();
const { year, month, day } = DateUtil.dateDivider(now);
const visitDt = year + month + day;
export default {
  name: "ProgressTimeLookup",
  components: { ProgressTimeLookupTable, Pages },
  data() {
    return {
      currentPage: 1,
      pages: [],
      rows: [],
      pager: null,
      visitFromDt: "",
      visitToDt: "",
      visitDt,
    };
  },
  mounted() {
    this.currentPage = 1;

    const visitFromDt = this.visitDt;
    const visitToDt = this.visitDt;
    this.requestGetPlayingTime({ visitFromDt, visitToDt });
  },
  methods: {
    handleClickLookup() {
      let oldVisitFromDt = this.visitFromDt;
      let oldVisitToDt = this.visitToDt;

      if (oldVisitToDt.length === 0 || oldVisitToDt.length === 0) {
        this.dateInvalidMessage(NO_REQUIRED_VISIT_DATE);
      } else {
        const visitFromDt = oldVisitFromDt.split("-").join("");
        const visitToDt = oldVisitToDt.split("-").join("");
        this.requestGetPlayingTime({ visitFromDt, visitToDt });
      }
    },
    async requestGetPlayingTime({ visitFromDt, visitToDt }) {
      const res = await getPlayingTime({ visitFromDt, visitToDt });

      const { status } = res;
      if (status !== "OK") return;

      const {
        data: { playFromToTimeVOList },
      } = res;
      this.updatePager(playFromToTimeVOList);
    },
    dateInvalidMessage(title, message) {
      this.toast({ title, message });
    },
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
        take: 15,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
    ...mapActions({
      toast: "toast",
    }),
  },
  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
  },
};
</script>

<style scoped>
#progress_time_look_up__container {
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
footer {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
}

/* footer end */
</style>
