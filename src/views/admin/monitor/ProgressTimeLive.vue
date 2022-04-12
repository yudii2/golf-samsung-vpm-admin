<template>
  <article id="progress_time_live__container">
    <header>
      <ProgressTimeLiveSearch
        @sendSelectedCourse="handleReceiveSelectedCourse"
      />
    </header>

    <section>
      <ProgressTimeLiveTable :rows="rows" :currentPage="currentPage" :take="take"/>
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
import ProgressTimeLiveSearch from "@/components/admin/monitor/live/ProgressTimeLiveSearch";

const {getRoundPlayRealTime} = useTimeLive()
export default {
  name: "ProgressTimeLive",

  components: {
    ProgressTimeLiveSearch,
    ProgressTimeLiveTable,
    Pages,
  },

  data() {
    return {
      rows: [],
      currentPage: 1,
      pages: [],
      pager: null,
      originalRows: [],
      take: 5
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
        take: this.take,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
    /* paging methods end */
    handleReceiveSelectedCourse(course) {
      //전체
      if (!course) {
        this.rows = this.originalRows;
        this.updatePager(this.rows);
      } else {
        const {courseCd} = course;
        this.rows = this.originalRows.filter((row) => row.firstCourseCd === courseCd);
        this.updatePager(this.rows)
      }
    },
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
    this.originalRows = playRealTimeVOList;
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
