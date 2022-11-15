<template>
  <article id="round_hole_out__container">

    <section class="mt">
      <HoleOutTable
        :rows="rows"
        @requestHoleOutLists="requestHoleOutLists"
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
import HoleOutTable from "@/components/admin/round/holeOut/HoleOutTable";
import Pages from "@/components/shared/Pages";
import useRound from "@/api/v1/admin/round/useRound";
import {Pager} from "@/utils/usePage";

const {getHoleOutLists} = useRound()
export default {
  name: "HoleOut",

  components: {Pages, HoleOutTable},

  data() {
    return {
      currentPage: 1,
      rows: [],
      pages: [],
      pager: null,
      take: 15
    }
  },
  methods: {
    async requestHoleOutLists() {
      const res = await getHoleOutLists();

      const {status} = res;
      if (status !== 'OK') return;

      const {data: {approvalHoleOutList}} = res;
      this.updatePager(approvalHoleOutList);
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
        take: this.take,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
  },

  mounted() {
    this.requestHoleOutLists();
  },

  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
  },
}
</script>

<style scoped>
#round_hole_out__container {
  position: relative;
  height: 100%;
  text-align: center;
}

#round_hole_out__container * {
  color: var(--secondary);
}

#round_hole_out__container footer {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
