<template>
  <article id="certificate_issue__container">
    <header class="mb">
      <div class="buttons">
        <label for="search__lookup_date__input">조회일</label>
        <input
          class="input-dark mx"
          type="date"
          id="search__lookup_date__input"
          autocomplete="off"
          v-model="searchLookUpDate"
          @keypress.enter="handleClickLookup"
        />
        <button class="button-dark" @click="handleClickLookup">Search</button>
      </div>
    </header>

    <body class="mt">
      <CertificationTable :rows="rows" />
    </body>

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
import { mapActions } from "vuex";
import CertificationTable from "@/components/admin/round/roundGroup/CertificationTable";
import DateUtil from "@/utils/datetime/DateUtil";
import useCertificate from "@/api/v1/admin/certificate/useCertificate";
import Pages from "@/components/shared/Pages";
import { Pager } from "@/utils/usePage";
import {
  INVALID_TOAST_TITLE_FORMAT,
  INVALID_TOAST_MESSAGE_FORMAT,
} from "@/utils/constants";

const { getCertification } = useCertificate();

export default {
  name: "CertificateIssue",
  components: { Pages, CertificationTable },
  data() {
    return {
      searchLookUpDate: "",

      currentPage: 1,
      rows: [],
      pages: [],
      pager: null,
    };
  },
  methods: {
    init() {
      this.initData();
    },

    async initData() {
      this.initLookUpDate();

      await this.refreshCertifications();
    },

    initLookUpDate() {
      const now = new Date();
      const { year, month, day } = DateUtil.dateDivider(now);
      this.searchLookUpDate = `${year}-${month}-${day}`;
    },

    handleClickIssue() {
      this.toastPreparing({ title: "증명서 발급" });
    },

    /**
     * 증명서 조회 api 호출.
     * @param recordDt
     * @returns {list}
     */
    async requestCertifications({ recordDt }) {
      const res = await getCertification({ recordDt });

      const { status } = res;
      if (status !== "OK") return;

      const {
        data: { certificateVOList },
      } = res;
      return certificateVOList;
    },

    /**
     * updatePager methods 에 list 를 넘겨주기 위한 method.
     * @param recordDt
     * @returns {Promise<void>}
     */
    async refreshCertifications() {
      const list = await this.requestCertifications({
        recordDt: this.searchLookUpDate.replaceAll("-", ""),
      });
      this.updatePager(list);
    },

    /**
     *  search 버튼 클릭 method.
     */
    handleClickLookup() {
      if (this.searchLookUpDate === 0) {
        this.dateInvalidMessage(
          INVALID_TOAST_TITLE_FORMAT,
          `${INVALID_TOAST_MESSAGE_FORMAT}(yyyyMMdd).`
        );
      } else {
        this.refreshCertifications();
      }
    },

    /**
     * clear 버튼 클릭 method.
     */
    clearSearchData() {
      this.searchLookUpDate = "";
    },

    //## paging 관련 methods start.
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

    //## paging 관련 methods end.
    dateInvalidMessage(title, message) {
      this.toast({ title, message });
    },

    ...mapActions({
      toast: "toast",
      toastPreparing: "toastPreparing",
    }),
  },

  /**
   * 증명서 조회 api 를 호출할 때, requestParameter 로 넘기는 recordDt setting.
   * @param recordDt
   * @returns {list}
   */
  async mounted() {
    this.init();
  },

  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
  },
};
</script>

<style>
#certificate_issue__container {
  height: 100%;
  position: relative;
  text-align: center;
}

#certificate_issue__container header {
  display: flex;
  align-items: center;
}

#certificate_issue__container .buttons button {
  margin-right: 0.5rem;
  padding: 5px 10px;
  background-color: var(--deep-green);
  color: var(--secondary);
  border: 1px solid var(--primary);
  border-radius: 5px;
  transition: all 0.3s ease;
}

#certificate_issue__container .buttons button:hover {
  background-color: var(--primary);
}

#search__lookup_date__input {
  width: 180px;
}
#certificate_issue__container footer {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
