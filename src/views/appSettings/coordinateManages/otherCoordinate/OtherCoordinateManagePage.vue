<template>
  <article class="other-coordinate-manage-page__container">
    <!-- 헤더 -->
    <OtherCoordinateManageHeader />

    <!-- 바디 -->
    <OtherCoordinateManageBody :coordinates="coordinates" />

    <!-- 푸터 -->
    <footer class="pages__container mt">
      <Pages
        class=""
        :currentPage="currentPage"
        :hasNext="hasNext"
        :hasPrevious="hasPrevious"
        :pages="pages"
        @handleClickPage="handlePageClick"
        @onPrevious="handlePreviousPageClick"
        @onNext="handleNextPageClick"
      />
    </footer>
  </article>
</template>

<script>
import useCompany from "@/api/v1/monitor/useCompany";
import OtherCoordinateManageHeader from "./header/OtherCoordinateManageHeader.vue";
import OtherCoordinateManageBody from "./body/OtherCoordinateManageBody.vue";
import { mapActions, mapGetters } from "vuex";
import { COMPANY_CODE_DEFAULT_VALUE } from "@/utils/constants";
import { Pager } from "@/utils/usePage";
import Pages from "@/components/shared/Pages.vue";

const { getCompany } = useCompany();

export default {
  name: "OtherCoordinateManagePage",

  components: {
    OtherCoordinateManageHeader,
    OtherCoordinateManageBody,
    Pages,
  },

  data() {
    return {
      coordinates: [],
      pager: null,
      currentPage: -1,
      pages: [],
      hasPrevious: false,
      hasNext: false,
    };
  },

  computed: {
    ...mapGetters("control", {
      companyCode: "getCompanyCode",
    }),
    ...mapGetters("appSettings", {
      otherCoordinates: "getOtherCoordinates",
      isOtherCoordinateUpdated: "getIsOtherCoordinateUpdated",
      updatedOtherCoordinate: "getUpdatedOtherCoordinate",
      updatedOtherCoordinateIndex: "getUpdatedOtherCoordinateIndex",
    }),
  },

  methods: {
    /**
     * ### 컴포넌트 초기화.
     */
    init() {
      this.requests();
    },

    /**
     * ### 조회 API
     */
    requests() {
      this.requestCompany();
    },

    /**
     * ### 사업장 조회 API.
     */
    async requestCompany() {
      if (this.companyCode !== COMPANY_CODE_DEFAULT_VALUE) {
        const { status, data } = await getCompany();
        if (status && status === "OK") {
          const { companyCd, companyName } = data;

          this.setCompanyCode(companyCd);
          this.setCompanyName(companyName);
        }
      }
    },

    refreshPageInfo() {
      this.coordinates = this.pager.getPageRowsByPage();
      this.pages = this.pager.getCurrentPages();
      this.hasNext = this.pager.hasNext();
      this.hasPrevious = this.pager.hasPrevious();
      this.currentPage = this.pager.page;
    },

    handlePageClick(clickedPage) {
      this.pager.setCurrentPage(clickedPage);
      this.coordinates = this.pager.getCurrentPageRows();
      this.currentPage = clickedPage;
    },
    handlePreviousPageClick() {
      this.pager.previousPages();
      this.refreshPageInfo();
    },
    handleNextPageClick() {
      this.pager.nextPages();
      this.refreshPageInfo();
    },

    ...mapActions("control", {
      setCompanyCode: "updateCompanyCode",
      setCompanyName: "updateCompanyName",
    }),
    ...mapActions("appSettings", {
      setIsOtherCoordinateUpdated: "updateIsOtherCoordinateUpdated",
      setUpdatedOtherCoordinate: "updateUpdatedOtherCoordinate",
      setUpdatedOtherCoordinateIndex: "updateUpdatedOtherCoordinateIndex",
    }),
  },

  mounted() {
    this.init();
  },

  watch: {
    /**
     * ### 기타 좌표 목록 조회 시.
     * 페이지네이션을 위한 로직.
     */
    otherCoordinates(list) {
      this.pager = new Pager({
        list: [...list],
        take: 50,
        divideUnit: 10,
      });

      const res = this.pager.generate();
      const { ok } = res;

      if (ok) {
        this.coordinates = this.pager.getPageRowsByPage();
        this.currentPage = this.pager.getCurrentPage();
        this.pages = this.pager.getCurrentPages();
        this.hasPrevious = this.pager.hasPrevious();
        this.hasNext = this.pager.hasNext();
      }
    },

    /**
     * ### 바디 테이블 데이터 변경 시 이벤트 발생.
     * 업데이트 완료 시 하기된 스토어 클리어 필수.
     * - updatedOtherCoordinate 스테이트 클리어.
     * - updatedOtherCoordinateIndex 스테이트 클리어.
     */
    isOtherCoordinateUpdated(status) {
      if (status) {
        const { newLatitude, newLongitude } = this.updatedOtherCoordinate;
        const list = this.pager.getCurrentPageRows();
        list[this.updatedOtherCoordinateIndex]["latitude"] = newLatitude;
        list[this.updatedOtherCoordinateIndex]["longitude"] = newLongitude;

        this.coordinates = [...list];

        // 스토어 클리어.
        this.setIsOtherCoordinateUpdated(false);
        this.setUpdatedOtherCoordinate();
        this.setUpdatedOtherCoordinateIndex();
      }
    },
  },
};
</script>

<style scoped>
.other-coordinate-manage-page__container {
}

.pages__container {
}
</style>
