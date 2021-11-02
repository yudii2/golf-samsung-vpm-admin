<template>
  <article class="hole-coordinate-manage-page__container">
    <!-- 헤더 -->
    <HoleCoordinateManageHeader :distinctionOptions="distinctionOptions" />

    <!-- 바디 -->
    <section class="coordinate-content__container">
      <!-- 코스 목록 -->
      <HoleCoordinateManageCourses
        v-if="hasCourses"
        :courses="courses"
        :holes="parsedHoles"
      />
      <div v-else>
        <span v-if="loading">코스 정보를 가져오는 중입니다.</span>
        <span v-else>코스 정보가 존재하지 않습니다.</span>
      </div>

      <!-- 홀 목록 -->
      <HoleCoordinateManageHoles
        v-if="hasSelectedHoles"
        :holes="selectedHoles"
      />

      <!-- 좌표 값 정보 박스 -->
      <HoleCoordinateManageCoordinate
        v-if="hasCoordinateInfo"
        :holeCoordinate="holeCoordinate"
      />
    </section>
  </article>
</template>

<script>
import useCompany from "@/api/v1/monitor/useCompany";
import HoleCoordinateManageHeader from "./HoleCoordinateManageHeader.vue";
import HoleCoordinateManageCourses from "./HoleCoordinateManageCourses.vue";
import HoleCoordinateManageHoles from "./HoleCoordinateManageHoles.vue";
import {
  DISTINCTION_GREEN_ONE_CODE,
  DISTINCTION_GREEN_ONE_KEY,
  DISTINCTION_GREEN_TWO_CODE,
  DISTINCTION_GREEN_TWO_KEY,
  DISTINCTION_HOLE_CODE,
  DISTINCTION_HOLE_KEY,
} from "@/utils/constants";
import HoleCoordinateManageCoordinate from "./HoleCoordinateManageCoordinate.vue";
import { mapActions, mapGetters } from "vuex";

const { getCompany, getCoordinateByCompanyCode } = useCompany();

export default {
  name: "HoleCoordinateManagePage",

  components: {
    HoleCoordinateManageHeader,
    HoleCoordinateManageCourses,
    HoleCoordinateManageHoles,
    HoleCoordinateManageCoordinate,
  },

  data() {
    return {
      companyCd: null,

      distinctionOptions: [
        { [DISTINCTION_HOLE_KEY]: DISTINCTION_HOLE_CODE },
        { [DISTINCTION_GREEN_ONE_KEY]: DISTINCTION_GREEN_ONE_CODE },
        { [DISTINCTION_GREEN_TWO_KEY]: DISTINCTION_GREEN_TWO_CODE },
      ],
      loading: false,
      courses: [],

      holes: [],

      holeCoordinate: null,
    };
  },

  computed: {
    /**
     * ### 좌표 정보의 존재 여부.
     */
    hasCoordinateInfo() {
      return Boolean(this.courses.length && this.holes.length);
    },

    /**
     * ### 코스 목록 정보의 존재 여부.
     */
    hasCourses() {
      return Boolean(this.courses?.length);
    },

    /**
     * ### 파싱된 홀 목록.
     */
    parsedHoles() {
      if (!this.hasCourses) return [];
      const parsedHoles = [];
      for (const course of this.courses) {
        const obj = {
          courseCd: course.courseCd,
        };
        obj.holes = this.holes.filter(
          (hole) => hole.courseCd === course.courseCd
        );

        parsedHoles.push(obj);
      }

      return parsedHoles;
    },

    /**
     * ### 선택된 홀 목록.
     */
    selectedHoles() {
      const foundHole = this.parsedHoles.find((hole) => {
        return hole.courseCd === this.selectedCourse?.courseCd;
      });

      return foundHole?.holes;
    },

    hasSelectedHoles() {
      return Boolean(this.selectedHoles);
    },

    ...mapGetters("appSettings", {
      selectedOption: "getSelectedOption",
      selectedCourse: "getSelectedCourse",
      selectedHole: "getSelectedHole",
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
     * ### API 요청.
     */
    async requests() {
      this.requestCompany();
    },

    /**
     * ### 사업장 정보 조회.
     */
    async requestCompany() {
      this.loading = true;
      const { status, data } = await getCompany();
      if (status && status === "OK") {
        const { companyCd, companyName, courseList, holeList } = data;
        this.companyCd = companyCd;
        this.courses = courseList;
        this.holes = holeList;

        // 사업장 스토어 설정.
        this.setCompanyName(companyName);
        this.setCompanyCode(companyCd);
      }
      this.loading = false;
    },

    /**
     * ### 현재 정보를 바탕으로 좌표 정보를 받아와서 적용하는 넘.
     */
    async setHoleCoordinateInfo() {
      const [gubun] = Object.values(this.selectedOption);
      if (this.selectedCourse && this.selectedHole) {
        const { status, data } = await this.requestCoordinate({
          companyCd: this.companyCd,
          courseCd: this.selectedCourse.courseCd,
          holeCd: this.selectedHole.holeCd,
          gubun,
        });
        if (status && status === "OK") this.setHoleCoordinate(data);
      }
    },

    /**
     * ### 좌표 값 변수 설정.
     */
    setHoleCoordinate(data) {
      const [coordinateInfo] = data;
      this.holeCoordinate = {
        leftTopLatitude: coordinateInfo?.ltLatitude,
        leftTopLongitude: coordinateInfo?.ltLongitude,
        rightTopLatitude: coordinateInfo?.rtLatitude,
        rightTopLongitude: coordinateInfo?.rtLongitude,
        leftBottomLatitude: coordinateInfo?.lbLatitude,
        leftBottomLongitude: coordinateInfo?.lbLongitude,
        rightBottomLatitude: coordinateInfo?.rbLatitude,
        rightBottomLongitude: coordinateInfo?.rbLongitude,
      };
    },

    /**
     * ### 좌표 정보 조회 API.
     */
    requestCoordinate({ companyCd, courseCd, holeCd, gubun }) {
      return getCoordinateByCompanyCode({ companyCd, courseCd, holeCd, gubun });
    },

    ...mapActions("control/", {
      setCompanyName: "updateCompanyName",
      setCompanyCode: "updateCompanyCode",
    }),
  },

  mounted() {
    this.init();
  },

  watch: {
    selectedOption() {
      this.setHoleCoordinateInfo();
    },

    selectedHole() {
      this.setHoleCoordinateInfo();
    },

    selectedCourse() {
      this.setHoleCoordinateInfo();
    },
  },
};
</script>

<style scoped>
.hole-coordinate-manage-page__container {
  display: flex;
  flex-direction: column;
  height: 100%;
  grid-gap: 16px;
}

.coordinate-content__container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 8fr;
  grid-gap: 16px;
}
</style>
