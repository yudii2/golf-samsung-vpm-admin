<template>
  <table class="table-dark">
    <colgroup>
      <col width="7%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
      <col width="6%" />
    </colgroup>

    <thead>
      <tr>
        <th>코스별</th>
        <th>1홀</th>
        <th>2홀</th>
        <th>3홀</th>
        <th>4홀</th>
        <th>5홀</th>
        <th>6홀</th>
        <th>7홀</th>
        <th>8홀</th>
        <th>9홀</th>
        <th>전체시간</th>
      </tr>
    </thead>

    <tbody v-if="hasSettingInfo">
      <tr v-for="course in settingInfo" :key="course.code">
        <td>
          <div class="column">
            <span>{{ course.courseNm }}</span>
          </div>
        </td>

        <td v-for="(standard, i) in course.standardSetupVOList" :key="i">
          <div class="column">
            <input
              v-if="isUpdatable"
              class="play-time-input"
              type="number"
              v-model="standard.normalTime"
            />
            <span class="no-drag" v-else>
              {{ standard.normalTime | withTimeUnit }}</span
            >
          </div>
        </td>

        <!-- 전체 시간 -->
        <td>{{ getTotalTime(course.standardSetupVOList) | withTimeUnit }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="11">코스 정보가 없습니다.</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import useStandardSetting from "@/api/v1/admin/monitor/useStandardSetting";
import { useInput } from "@/utils/string";
import { mapActions, mapGetters } from "vuex";

const { updateStandardSetting } = useStandardSetting();
const { lengthIsInvalid, getValidText } = useInput(3);
export default {
  name: "ProgressTimeStandardSettingTable",

  props: {
    courseSettingInfo: {
      type: Array,
      require: true,
    },

    isUpdatable: {
      type: Boolean,
      require: true,
    },
  },

  data() {
    return {
      settingInfo: [],
      updatedNormalTime: "",
      updateRequestList: [],
    };
  },

  computed: {
    hasSettingInfo() {
      return Boolean(this.settingInfo.length);
    },

    ...mapGetters("admin", {
      progressTimeStandardSettingNeedUpdate:
        "getProgressTimeStandardSettingNeedUpdate",
    }),
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      if (this.courseSettingInfo?.length)
        this.settingInfo = [...this.courseSettingInfo];
    },

    /**
     * ### 저장버튼 클릭 시, 표준시간 update API 호출.
     */
    async requestUpdateSettings() {
      const parsed = this.settingInfo.map((info) => info.standardSetupVOList);
      const parsed_ = parsed.map((info) => {
        return info.map((p) => ({
          code: p.code,
          companyCd: p.companyCd,
          normalTime: p.normalTime,
        }));
      });

      const result = parsed_.reduce((prev, curr) => {
        const r = [...prev, ...curr];
        return r;
      }, []);

      const { status } = await updateStandardSetting({
        standardSetupVOList: result,
      });

      if (status === "OK") {
        this.toast({
          title: "진행시간 표준설정 변경",
          message: "성공적으로 변경되었습니다.",
        });
      } else {
        this.toast({
          title: "진행시간 표준설정 변경",
          message: "데이터 변경을 실패했습니다.",
        });
      }
    },

    /**
     * 코스별 총 전체시간 계산.
     * @param course
     * @returns {number}
     */
    getTotalTime(standardSetupVOList = []) {
      return standardSetupVOList.reduce(
        (prev, { normalTime }) => Number(prev) + Number(normalTime),
        0
      );
    },

    invalidDataMessage(title, message) {
      this.toast({ title, message });
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
     * 휴대폰 번호 2자리 수 제한.
     * @param text
     */
    updatedNormalTime(text) {
      if (lengthIsInvalid(text)) this.updatedNormalTime = getValidText(text);
    },

    progressTimeStandardSettingNeedUpdate(status) {
      if (status) {
        this.requestUpdateSettings();
      }
    },
  },

  filters: {
    withTimeUnit(val) {
      return `${val}분`;
    },
  },
};
</script>

<style scoped>
table .play-time-input {
  width: 40px;
  height: 25px;
  line-height: 25px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}
</style>
