<template>
  <article id="progress_time_live__container">
    <header>

    </header>

    <section>
      <ProgressTimeLiveTable :rows="rows"/>
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

<script scoped>
import ProgressTimeLiveTable from "@/components/admin/monitor/live/ProgressTimeLiveTable.vue";
import Pages from "@/components/shared/Pages.vue";
import useTimeLive from "@/api/v1/admin/monitor/useTimeLive";
import {Pager} from "@/utils/usePage";

const {getRoundPlayRealTime} = useTimeLive()
export default {
  name: "ProgressTimeLive",

  components: {
    ProgressTimeLiveTable,
    Pages,
  },

  data() {
    return {
      rows: [],
      currentPage: 1,
      pages: [],
      pager: null
    };
  },

  methods: {
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
  },
  /**
   * 진행시간 실시간 정보조회 API 호출.
   * @returns {Promise<void>}
   */
  async mounted() {
    this.currentPage = 1;

    const res = await getRoundPlayRealTime();
    const {status} = res;
    if (status !== 'OK') return;

    const {data: {playRealTimeVOList}} = res;

    this.updatePager(playRealTimeVOList)
  },

  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
  },
};
</script>

<style scoped>
#progress_time_live__container {
  position: relative;
  height: 100%;
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
