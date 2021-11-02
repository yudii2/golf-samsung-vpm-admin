<template>
  <article class="round-rule-setting-body__container">
    <section class="round-setting-info__container">
      <RoundRuleSettingTable
        :roundRuleSettingInfoList="longestInfo"
        tableHead="롱기스트"
        @onColumnClick="handleColumnClick"
      />

      <RoundRuleSettingTable
        :roundRuleSettingInfoList="nearestInfo"
        tableHead="니어리스트"
        @onColumnClick="handleColumnClick"
      />

      <RoundRuleSettingTable
        :roundRuleSettingInfoList="newPerioInfo"
        tableHead="신페리오"
        @onColumnClick="handleColumnClick"
      />
    </section>
  </article>
</template>

<script>
import RoundRuleSettingTable from "@/components/admin/round/roundRuleSettings/RoundRuleSettingTable.vue";
import { mapActions, mapGetters } from "vuex";
import useAdminGroup from "@/api/v1/admin/round/useAdminGroup";

const { updateAwardInfo } = useAdminGroup();

export default {
  name: "RoundRuleSettingBody",

  components: {
    RoundRuleSettingTable,
  },

  props: {
    roundRuleInfo: {
      type: Object,
      require: true,
    },

    hasSelectedRoundGroup: {
      type: Boolean,
      require: true,
    },
  },

  data() {
    return {
      MAX_SELECTED_COUNT: 6,
      longestInfo: [],
      nearestInfo: [],
      newPerioInfo: [],
    };
  },

  computed: {
    ...mapGetters("admin", {
      needFetch: "getNeedFetch",
    }),
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      const {
        roundAwardVOLongList,
        roundAwardVONearList,
        roundAwardVONewPerioList,
      } = this.roundRuleInfo || {};

      this.longestInfo = roundAwardVOLongList;
      this.nearestInfo = roundAwardVONearList;
      this.newPerioInfo = roundAwardVONewPerioList;
    },

    findRoundCourseByCourseCode(awardInfo, courseCode) {
      return awardInfo.find((c) => c.courseCd === courseCode);
    },

    clearRoundCourseSettingsByCourseCode(course) {
      for (const [key, _] of Object.entries(course)) {
        if (String(key).includes("hole")) course[key] = "N";
      }
    },

    applyRoundCourseSettingByHoleKey(hole, course) {
      const [holeKey] = Object.keys(hole);
      course[holeKey] = course[holeKey] === "Y" ? "N" : "Y";
    },

    getSelectedCount(roundCourse) {
      let count = 0;
      for (const [key, _] of Object.entries(roundCourse)) {
        if (String(key).includes("hole") && roundCourse[key] === "Y") {
          count++;
        }
      }
      return count;
    },

    handleColumnClick({ tableHead, hole, courseCode }) {
      // find specific item.
      switch (tableHead) {
        case "롱기스트":
          // Find matched course.
          const foundLongestCourse = this.findRoundCourseByCourseCode(
            this.longestInfo,
            courseCode
          );

          // Clear hole values.
          this.clearRoundCourseSettingsByCourseCode(foundLongestCourse);

          // Apply hole values.
          this.applyRoundCourseSettingByHoleKey(hole, foundLongestCourse);

          break;
        case "니어리스트":
          // Find matched course.
          const foundNearestCourse = this.findRoundCourseByCourseCode(
            this.nearestInfo,
            courseCode
          );

          // Clear hole values.
          this.clearRoundCourseSettingsByCourseCode(foundNearestCourse);

          // Apply hole values.
          this.applyRoundCourseSettingByHoleKey(hole, foundNearestCourse);

          break;
        case "신페리오":
          const foundNewPerioCourse = this.findRoundCourseByCourseCode(
            this.newPerioInfo,
            courseCode
          );

          // Check setting columns count.
          const [value] = Object.values(hole);
          if (value === "Y") {
            this.applyRoundCourseSettingByHoleKey(hole, foundNewPerioCourse);
          } else {
            // Get setting columns count.
            const setColumnsCount = this.getSelectedCount(foundNewPerioCourse);
            const isValid = setColumnsCount < this.MAX_SELECTED_COUNT;

            // Check validation.
            if (isValid) {
              this.applyRoundCourseSettingByHoleKey(hole, foundNewPerioCourse);
            } else {
              this.toast({
                title: "라운드 룰 설정 (신페리오)",
                message: `신페리오는 최대 ${this.MAX_SELECTED_COUNT}개까지 설정 가능합니다.`,
              });
            }
          }
          break;
      }
    },

    ...mapActions({
      toast: "toast",
    }),
  },

  mounted() {
    this.init();
  },

  watch: {
    /**
     * ### 헤더 되돌리기 로직.
     */
    roundRuleInfo() {
      this.initData();
    },

    async needFetch(status) {
      if (status) {
        const newRoundRuleInfo = { ...this.roundRuleInfo };

        newRoundRuleInfo.roundAwardVOLongList = [...this.longestInfo];
        newRoundRuleInfo.roundAwardVONearList = [...this.nearestInfo];
        newRoundRuleInfo.roundAwardVONewPerioList = [...this.newPerioInfo];

        const { status } = await updateAwardInfo({ ...newRoundRuleInfo });
        if (status === "OK") {
          this.toast({
            title: "라운드 룰 설정",
            message: "라운드 룰이 정상적으로 저장되었습니다.",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.round-rule-setting-body__container {
  overflow-y: scroll;
  height: calc(100vh - 35px - 96px);
}

.round-setting-info__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}
</style>
