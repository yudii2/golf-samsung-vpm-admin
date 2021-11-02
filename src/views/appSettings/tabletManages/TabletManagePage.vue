<template>
  <article class="tablet-manage-page__container">
    <!-- 헤더 -->
    <TabletManageHeader />

    <!-- 바디 -->
    <TabletManageBody :tablets="tablets" />
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TabletManageHeader from "./TabletManageHeader.vue";
import TabletManageBody from "./TabletManageBody.vue";
import { getTablets } from "@/api/v1/appSettings/useTablet";
import { COMPANY_CODE_DEFAULT_VALUE } from "@/utils/constants";
import useCompany from "@/api/v1/monitor/useCompany";

const { getCompany } = useCompany();

export default {
  name: "TabletManagePage",

  components: {
    TabletManageHeader,
    TabletManageBody,
  },

  computed: {
    ...mapGetters("control", {
      companyCode: "getCompanyCode",
    }),
    ...mapGetters("appSettings", {
      tablets: "getTablets",
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
     * ### 컴포넌트 초기 데이터 조회 API.
     */
    requests() {
      this.requestCompany();
      this.requestTablets();
    },

    /**
     * ### 태빌릇 목록 조회.
     */
    async requestTablets() {
      const { status, data } = await getTablets();
      if (status && status === "OK") {
        this.setTablets(data);
      }
    },

    /**
     * ### 사업장 정보 조회.
     */
    async requestCompany() {
      if (this.companyCode === COMPANY_CODE_DEFAULT_VALUE) {
        const { status, data } = await getCompany();
        if (status && status === "OK") {
          const { companyCd, companyName } = data;
          this.setCompanyCode(companyCd);
          this.setCompanyName(companyName);
        }
      }
    },

    ...mapActions("control", {
      setCompanyCode: "updateCompanyCode",
      setCompanyName: "updateCompanyName",
    }),
    ...mapActions("appSettings", {
      setTablets: "updateTablets",
    }),
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.tablet-manage-page__container {
  height: 100%;
}
</style>
