<template>
  <article id="caddie_information__container">
    <header>
      <!-- TODO 조회 , 최신화, 수정-->
      <CaddieInformationSearch
        @handleFetchCaddieInfo="handleFetchCaddieInfo"
        @handleFetchLatest="handleFetchLatest"
        @handleSave="handleSave"
        :isUpdatable="isUpdatable"
      />
    </header>
    <section>
      <CaddieInformationTable
        :isUpdatable="isUpdatable"
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

const {getCaddieInfo} = useCaddie()
export default {
  name: "CaddieInformation",
  components: {CaddieInformationTable, CaddieInformationSearch,Pages},
  data() {
    return {
      isUpdatable: true,

      caddieName : '',
      lastTelNo : '',

      currentPage: 1,
      rows: [],
      pages: [],
      pager: null,


    }
  },
  //TODO 페이징 이상부터
  mounted() {
    this.requestCaddieInfo();
  },
  methods: {
    async requestCaddieInfo(){
      const res = await getCaddieInfo()
      const {status} = res

      if(status !== 'OK') return;

      const {data : caddieInfoList} = res
      this.rows = caddieInfoList;
      this.updatePager(caddieInfoList)

    },
    handleFetchCaddieInfo() {
      //TODO 조회
    },
    handleFetchLatest() {
      //TODO 최신화
    },
    handleSave(isUpdatable) {
      //TODO 수정
      this.isUpdatable = isUpdatable
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
  }
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
