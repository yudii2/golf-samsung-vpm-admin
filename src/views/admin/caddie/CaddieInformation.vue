<template>
  <article id="caddie_information__container">
    <header>
      <CaddieInformationSearch
        @handleFetchCaddieInfo="handleFetchCaddieInfo"
        @handleFetchLatest="handleFetchLatest"
      />
    </header>
    <section>
      <CaddieInformationTable
        :rows="rows"
      />
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
import CaddieInformationSearch from "@/views/admin/caddie/CaddieInformationSearch";
import CaddieInformationTable from "@/views/admin/caddie/CaddieInformationTable";
import Pages from "@/components/shared/Pages";
import useCaddie from "@/api/v1/admin/caddie/useCaddie";
import {Pager} from "@/utils/usePage";
import {mapGetters} from "vuex";

const {getCaddieInfo, initCaddieInfo} = useCaddie()
export default {
  name: "CaddieInformation",
  components: {CaddieInformationTable, CaddieInformationSearch, Pages},
  data() {
    return {
      currentPage: 1,
      rows: [],
      pages: [],
      pager: null,


    }
  },
  created() {
    this.$EventBus.$on('needFetch', this.handleFetchCaddieInfo)
  },
  mounted() {
    this.handleFetchCaddieInfo();
  },
  methods: {
    async handleFetchCaddieInfo(caddieName, caddieMobileNo) {
      const res = await getCaddieInfo(caddieName, caddieMobileNo);

      const {status} = res
      if (status !== 'OK') return;

      const {data: caddieInfoList} = res;
      this.rows = caddieInfoList;
      this.updatePager(caddieInfoList)
    },
    async handleFetchLatest() {
      const {code} = this.company
      const res = await initCaddieInfo(code);

      const {status} = res
      if (status !== 'OK') return;

      await this.handleFetchCaddieInfo()

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
        take: 15,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
    /* methods about paging end*/
  },
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
#caddie_information__container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

footer {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
