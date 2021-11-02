<template>
  <article id="progress-time-standard-setting__container">
    <header>
      <button class="button-dark" @click="handleClickUpdate">
        {{ isUpdatable ? "저장" : "수정하기" }}
      </button>
    </header>

    <ProgressTimeStandardSettingTable
      v-if="hasCourseSettingInfo"
      :courseSettingInfo="progressTimeStandardSettingInfo"
      :isUpdatable="isUpdatable"
    />
  </article>
</template>

<script>
import ProgressTimeStandardSettingTable from "@/components/admin/monitor/standardSetting/ProgressTimeStandardSettingUpdateTable.vue";
import ProgressTimeStandardSettingViewTable from "@/components/admin/monitor/standardSetting/ProgressTimeStandardSettingViewTable.vue";
import useStandardSetting from "@/api/v1/admin/monitor/useStandardSetting";
import { mapActions, mapGetters } from "vuex";

const { getStandardSetting } = useStandardSetting();
export default {
  name: "ProgressTimeStandardSetting",

  components: {
    ProgressTimeStandardSettingTable,
    ProgressTimeStandardSettingViewTable,
  },

  data() {
    return {
      isUpdatable: false,
    };
  },

  computed: {
    hasCourseSettingInfo() {
      return Boolean(this.progressTimeStandardSettingInfo?.length);
    },

    ...mapGetters("admin", {
      progressTimeStandardSettingInfo: "getProgressTimeStandardSettingInfo",
    }),
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      this.requests();
    },

    requests() {
      this.requestGetStandardSettings();
    },

    /**
     * 저장버튼 클릭 시, 하위 컴포넌트 requestUpdateSettings() method 호출.
     * 하위컴포넌트 : ProgressTimeStandardSettingUpdateTable.vue
     * api 호출 결과 200일 시, 표준시간 조회 API 호출.
     * @returns {Promise<void>}
     */
    async handleClickUpdate() {
      if (this.isUpdatable) {
        this.setProgressTimeStandardSettingNeedUpdate();
        // const {
        //   status,
        // } = await this.$refs.requestUpdateSettingsMethod.requestUpdateSettings();
        // if (status !== "OK") return;

        // await this.requestGetStandardSettings();
      }
      this.isUpdatable = !this.isUpdatable;
    },

    /**
     * ### 표준시간 조회 API 호출.
     */
    async requestGetStandardSettings() {
      const res = await getStandardSetting();
      const { status } = res;
      if (status !== "OK") return;

      const {
        data: { playTimeStandardSetupVOList },
      } = res;

      this.setProgressTimeStandardSettingInfo(playTimeStandardSetupVOList);
    },

    ...mapActions("admin", {
      setProgressTimeStandardSettingInfo:
        "updateProgressTimeStandardSettingInfo",
      setProgressTimeStandardSettingNeedUpdate:
        "updateProgressTimeStandardSettingNeedUpdate",
    }),
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
/* header start */
#progress-time-standard-setting__container {
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

/* header end */
</style>
