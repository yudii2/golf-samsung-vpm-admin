<template>
  <article id="round_rule_setting__container">
    <!-- 헤더 -->
    <RoundRuleSettingHeader
      :headerTitle="headerTitle"
      :hasSelectedRoundGroup="hasSelectedRoundGroup"
      @onSaveClick="handleSaveClick"
      @onRollbackClick="handleRollbackClick"
      @releaseGroup="handleReleaseGroupClick"
    />

    <!-- 바디 -->
    <RoundRuleSettingBody
      v-if="hasRoundRuleSettingInfo"
      :roundRuleInfo="roundRuleSettingInfo"
      :hasSelectedRoundGroup="hasSelectedRoundGroup"
    />
  </article>
</template>

<script scoped>
import { mapActions, mapGetters } from "vuex";
import useAdminGroup from "@/api/v1/admin/round/useAdminGroup";
import RoundRuleSettingHeader from "./RoundRuleSettingHeader.vue";
import RoundRuleSettingBody from "./RoundRuleSettingBody.vue";

const { getAwardInfo } = useAdminGroup();

export default {
  name: "RoundRuleSetting",

  components: {
    RoundRuleSettingHeader,
    RoundRuleSettingBody,
  },

  computed: {
    headerTitle() {
      const { groupNm } = this.roundRuleSettingInfo || {};

      return groupNm ? groupNm : this.getCompanyName;
    },

    hasSelectedRoundGroup() {
      return Boolean(this.selectedRoundGroup);
    },

    hasRoundRuleSettingInfo() {
      return Boolean(this.roundRuleSettingInfo);
    },

    ...mapGetters("admin/", {
      selectedRoundGroup: "getSelectedRoundGroup",
      roundRuleSettingInfo: "getRoundRuleSettingInfo",
    }),
    ...mapGetters("control/", {
      getCompanyName: "getCompanyName",
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
      this.requestAwardInfo();
    },

    async requestAwardInfo() {
      const { visitDt, groupCd } = this.selectedRoundGroup || {};
      const { status, data } = await getAwardInfo({
        ...(visitDt && { visitDt }),
        ...(groupCd && { groupCd }),
      });
      if (status && status === "OK") {
        this.setRoundRuleSettingInfo(data);
      }
    },

    /**
     * 오브젝트 N 값으로 초기화 하는 메소드.
     * @param mapObject
     */
    clearMapObject(mapObject) {
      Object.entries(mapObject).forEach((obj) => {
        const key = String(obj[0]);
        if (key.includes("hole")) {
          mapObject[obj[0]] = "N";
        }
      });
    },

    /**
     * ### 스토어 클리어 메소드.
     */
    clearStore() {
      // Group award 초기화.
      this.setSelectedGroupAward();
    },

    /**
     * 선택된 홀 Y값으로 변경하는 메소드.
     * @param mapObject
     * @param holeName
     */
    setMapObject(mapObject, holeName) {
      Object.entries(mapObject).forEach((obj) => {
        const key = String(obj[0]);
        if (key === `hole0${holeName}`) {
          mapObject[obj[0]] = "Y";
        }
      });
    },

    handleSaveClick() {
      this.setNeedFetch();
    },

    handleRollbackClick() {
      this.requestAwardInfo();
    },

    handleReleaseGroupClick() {
      // 선택된 단체 해제.
      this.setSelectedRoundGroup();

      // 데이터 새로고침.
      this.requestAwardInfo();
    },

    ...mapActions("admin/", {
      setSelectedGroupAward: "updateSelectedGroupAward",
      setRoundRuleSettingInfo: "updateRoundRuleSettingInfo",
      setNeedFetch: "updateNeedFetch",
      setSelectedRoundGroup: "updateSelectedRoundGroup",
    }),
  },

  async mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearStore();
  },
};
</script>

<style scoped>
/* awards start */
#round_rule_setting__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

#round_rule_setting__container .column_type {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

#round_rule_setting__container .column {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

#round_rule_setting__container .column span {
  padding: 0.25rem;
}

#round_rule_setting__container .column span:last-child {
  font-size: 0.9rem;
}

/* awards end */
.selected {
  background-color: var(--primary);
}

.column__wrapper:hover {
  background-color: var(--soft-green);
}
</style>
