<template>
  <header>
    <form @submit.prevent="handleSearchSubmit">
      <label for="company-code">사업장</label>
      <input
        id="company-code"
        class="input-dark ml"
        type="text"
        :placeholder="companyCodePlaceholder"
        v-model="companyCode"
      />

      <label for="course-code" class="ml">코스 코드</label>
      <input
        id="course-code"
        class="input-dark ml"
        type="text"
        :placeholder="courseCodePlaceholder"
        v-model="courseCode"
      />

      <label for="hole-code" class="ml">홀 코드</label>
      <input
        id="hole-code"
        class="input-dark ml"
        type="text"
        :placeholder="holeCodePlaceholder"
        v-model="holeCode"
      />

      <label for="position-code" class="ml">위치 코드</label>
      <input
        id="position-code"
        class="input-dark ml"
        type="text"
        :placeholder="positionCodePlaceholder"
        v-model="positionCode"
      />

      <button class="button-dark ml">Search</button>
    </form>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { COMPANY_CODE_DEFAULT_VALUE } from "@/utils/constants";
import { getOtherCoordinates } from "@/api/v1/appSettings/useCoordinate";

export default {
  name: "OtherCoordinateManageHeader",

  props: ["value"],

  data() {
    return {
      companyCode: "",
      courseCode: "",
      holeCode: "",
      positionCode: "",

      companyCodePlaceholder: "",
      courseCodePlaceholder: "",
      holeCodePlaceholder: "",
      positionCodePlaceholder: "",
    };
  },

  computed: {
    ...mapGetters("control", {
      currentCompanyCode: "getCompanyCode",
    }),
  },

  methods: {
    /**
     * ### 컴포넌트 초기화.
     */
    init() {
      this.initData();

      this.handleSearchSubmit();
    },

    /**
     * ### 컴포넌트 데이터 초기화.
     */
    initData() {
      if (this.currentCompanyCode !== COMPANY_CODE_DEFAULT_VALUE) {
        console.log('타냐??')
        this.companyCode = this.currentCompanyCode;
        this.companyCodePlaceholder = this.currentCompanyCode;

        // this.courseCode = 1;
        this.courseCodePlaceholder = 1;

        // this.holeCode = 5;
        this.holeCodePlaceholder = 5;

        // this.positionCode = 21;
        this.positionCodePlaceholder = 21;
      }
    },

    /**
     * ### 기타 좌표 조회 로직.
     */
    async handleSearchSubmit() {
      const { status, data } = await getOtherCoordinates(
        this.companyCode,
        this.courseCode,
        this.holeCode,
        this.positionCode
      );
      if (status && status === "OK") {
        const parsedCoordinates = data?.map((c) => ({
          ...c,
          isUpdating: false,
        }));
        this.setOtherCoordinates(parsedCoordinates);
      }
    },

    ...mapActions("appSettings", {
      setOtherCoordinates: "updateOtherCoordinates",
    }),
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
/* header start */
header {
  max-height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header form {
  color: var(--secondary);
}
/* header end */
</style>
