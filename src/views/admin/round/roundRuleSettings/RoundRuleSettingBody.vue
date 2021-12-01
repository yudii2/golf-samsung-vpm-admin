<template>
  <article class="round-rule-setting-body__container">
    <section class="round-setting-info__container">
      <RoundRuleAwardSettingTable
        :roundCompetitionSettingInfoList="competitionSettingInfo"
        :isUpdatable="isUpdatable"
        @onUpdateCompetitionClick="handleUpdateCompetitionClick"
        v-if="selectedRoundGroup !== null"
      />
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
import {mapActions, mapGetters} from "vuex";
import useAdminGroup from "@/api/v1/admin/round/useAdminGroup";
import RoundRuleAwardSettingTable from "@/components/admin/round/roundRuleSettings/RoundRuleAwardSettingTable";

const {updateAwardInfo, deleteAwardInfo} = useAdminGroup();

export default {
  name: "RoundRuleSettingBody",

  components: {
    RoundRuleAwardSettingTable,
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
    isUpdatable: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      MAX_SELECTED_COUNT: 6,
      longestInfo: [],
      nearestInfo: [],
      newPerioInfo: [],
      competitionSettingInfo: [],
    };
  },

  computed: {
    ...mapGetters("admin", {
      needFetch: "getNeedFetch",
      selectedRoundGroup: "getSelectedRoundGroup",
      selectedRoundGroupName: "getSelectedRoundGroupName",
      selectedRoundGroupVisitDt: "getSelectedRoundGroupVisitDt",
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
        competitionSettingList,
      } = this.roundRuleInfo || {};

      this.longestInfo = roundAwardVOLongList;
      this.nearestInfo = roundAwardVONearList;
      this.newPerioInfo = roundAwardVONewPerioList;
      this.competitionSettingInfo = competitionSettingList;
    },

    findRoundCourseByCourseCode(awardInfo, courseCode) {
      return awardInfo.find((c) => c.courseCd === courseCode);
    },

    clearRoundCourseSettingsByCourseCode(course) {
      for (const [key] of Object.entries(course)) {
        if (String(key).includes("hole")) course[key] = "N";
      }
    },

    applyRoundCourseSettingByHoleKey(hole, course) {
      const [holeKey] = Object.keys(hole);
      course[holeKey] = course[holeKey] === "Y" ? "N" : "Y";
    },

    getSelectedCount(roundCourse) {
      let count = 0;
      for (const [key] of Object.entries(roundCourse)) {
        if (String(key).includes("hole") && roundCourse[key] === "Y") {
          count++;
        }
      }
      return count;
    },

    handleColumnClick({tableHead, hole, courseCode}) {
      let foundLongestCourse, foundNearestCourse, foundNewPerioCourse, value;
      // find specific item.
      switch (tableHead) {
        case "롱기스트":
          // Find matched course.
          foundLongestCourse = this.findRoundCourseByCourseCode(
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
          foundNearestCourse = this.findRoundCourseByCourseCode(
            this.nearestInfo,
            courseCode
          );

          // Clear hole values.
          this.clearRoundCourseSettingsByCourseCode(foundNearestCourse);

          // Apply hole values.
          this.applyRoundCourseSettingByHoleKey(hole, foundNearestCourse);

          break;
        case "신페리오":
          foundNewPerioCourse = this.findRoundCourseByCourseCode(
            this.newPerioInfo,
            courseCode
          );

          // Check setting columns count.
          [value] = Object.values(hole);
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
    handleUpdateCompetitionClick({copiedCompetition}) {
      let foundCompetitionSetting = this.competitionSettingInfo?.find((competitionSetting) => competitionSetting.gubun === copiedCompetition.gubun)

      foundCompetitionSetting.checkYn = copiedCompetition.checkYn
      foundCompetitionSetting.displayName = copiedCompetition.displayName

    },
    async handleCancelClick() {
      const newRoundRuleInfo = this.sendRequest();

      const {status} = await deleteAwardInfo({...newRoundRuleInfo});
      if (status === "OK") {
        await this.toast({
          title: "라운드 룰 설정",
          message: "라운드 룰이 삭제되었습니다.",
        });

        await this.updateContentView({title: "round", subtitle: 2})
      }
    },
    sendRequest() {
      const newRoundRuleInfo = {...this.roundRuleInfo};

      newRoundRuleInfo.roundAwardVOLongList = [...this.longestInfo];
      newRoundRuleInfo.roundAwardVONearList = [...this.nearestInfo];
      newRoundRuleInfo.roundAwardVONewPerioList = [...this.newPerioInfo];

      if (this.selectedRoundGroup !== null) {
        newRoundRuleInfo.roundCompetitionSettingInfoList = [...this.competitionSettingInfo];
      }

      return newRoundRuleInfo
    },

    ...mapActions({
      toast: "toast",
    }),
    ...mapActions('admin/', {
      updateContentView: "dispatchContentView",
      updateSelectedRoundGroupName: "dispatchSetSelectedRoundGroupName",
      updateSelectedRoundGroupVisitDt: "dispatchSetSelectedRoundGroupVisitDt",
    })
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
        const newRoundRuleInfo = this.sendRequest();

        const {status} = await updateAwardInfo({...newRoundRuleInfo});
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
