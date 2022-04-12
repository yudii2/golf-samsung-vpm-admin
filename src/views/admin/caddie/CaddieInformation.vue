<template>
  <article id="caddie_information__container">
    <header>
      <CaddieInformationSearch
        @handleFetchCaddieInfo="handleFetchCaddieInfo"
        @handleFetchLatest="handleFetchLatest"
        :isLoading="isLoading"
      />
    </header>
    <section>
      <CaddieInformationTable
        :rows="rows"
        :currentPage="currentPage"
        :take="take"
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
import {mapActions, mapGetters} from "vuex";

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

      isLoading: false,
      take : 15,
    }
  },
  created() {
    this.$EventBus.$on('needFetch', this.handleFetchCaddieInfo)
  },
  mounted() {
    this.handleFetchCaddieInfo();
  },
  beforeDestroy() {
    this.updateSelectedCaddieInformation(null);
    this.clearCaddieInformationModal(false)
  },
  methods: {
    async handleFetchCaddieInfo(caddieName, caddieMobileNo) {
      this.isLoading = true;
      const res = await getCaddieInfo(caddieName, caddieMobileNo);

      const {status} = res
      if (status !== 'OK') return;

      const {data: caddieInfoList} = res;
      this.rows = caddieInfoList;
      this.updatePager(caddieInfoList)
      this.isLoading = false;
    },
    async handleFetchLatest() {
      this.isLoading = true;
      const {code} = this.company
      const res = await initCaddieInfo(code);

      const {status} = res
      if (status !== 'OK') return;

      await this.handleFetchCaddieInfo()
      this.isLoading = false;

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
    ...mapActions("admin/", {
      updateSelectedCaddieInformation: "dispatchUpdateSelectedCaddieInformation",
    }),
    ...mapActions({
      clearCaddieInformationModal: "dispatchIsShowingCaddieInformationModal",
    }),
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
