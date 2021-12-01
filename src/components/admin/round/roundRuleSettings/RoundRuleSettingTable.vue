<template>
  <table class="table-dark">
    <colgroup>
      <col width="10%"/>

      <col width="10%"/>
      <col width="10%"/>
      <col width="10%"/>
      <col width="10%"/>
      <col width="10%"/>
      <col width="10%"/>
      <col width="10%"/>
      <col width="10%"/>
      <col width="10%"/>
    </colgroup>

    <thead>
    <tr>
      <th>코스</th>
      <th colspan="9">{{ tableHead }}</th>
    </tr>
    </thead>
    <tbody v-if="hasRoundInfo">
    <tr
      v-for="(roundRuleSettingInfo, i) in getRoundRuleSettingInfoList"
      :key="i"
    >
      <td>{{ roundRuleSettingInfo.courseNm }}</td>
      <td
        v-for="(hole, j) in getRoundHolesByCourseCd(
            roundRuleSettingInfo.courseCd
          )"
        :key="j"
      >
        <div
          class="column"
          :class="{ selected: getRoundHoleValueByHole(hole) === 'Y' }"
          @click="
              $emit('onColumnClick', {
                tableHead,
                hole,
                courseCode: roundRuleSettingInfo.courseCd,
              })
            "
        >
          <span>{{ j + 1 }}</span>
          <span>{{
              getHoleParByCourseCode(roundRuleSettingInfo.courseCd, j)
            }}</span>
        </div>
      </td>
    </tr>
    </tbody>
    <tbody v-else>
    <tr>
      <td class="empty" colspan="10">{{ tableHead }} 정보가 없습니다.</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "RoundRuleSettingTable",

  props: {
    roundRuleSettingInfoList: {
      type: Array,
      require: true,
    },

    tableHead: {
      type: String,
      require: true,
    },
  },

  computed: {
    hasRoundInfo() {
      return Boolean(this.roundRuleSettingInfoList?.length);
    },

    getRoundInfoByCourseCode() {
      return (courseCode) => {
        return this.roundRuleSettingInfoList.find(
          (info) => info.courseCd === courseCode
        );
      };
    },

    getRoundHolesByCourseCd() {
      return (courseCode) => {
        const foundCourse = this.getRoundInfoByCourseCode(courseCode);

        if (foundCourse) {
          const holes = Object.entries(foundCourse).filter(([key]) => {
            return String(key).includes("hole");
          });
          const parsedHoles = holes.map(([key, value]) => ({
            [key]: value,
          }));
          return parsedHoles;
        }
        return [];
      };
    },

    getRoundHoleValueByHole() {
      return (hole) => {
        const [value] = Object.values(hole);
        return value;
      };
    },

    getHoleParByCourseCode() {
      return (courseCode, j) => {
        const parInfos = this.getCourseParInfoByCourseCode(courseCode);
        return parInfos[j].par;
      };
    },
    getRoundRuleSettingInfoList() {
      const copiedRoundRuleSettingInfoList = [...this.roundRuleSettingInfoList];

      copiedRoundRuleSettingInfoList.sort((a, b) => {
        return a.courseCd < b.courseCd ? -1 : a.courseCd > b.courseCd ? 1 : 0;
      });

      return copiedRoundRuleSettingInfoList
    },
    ...mapGetters("control", {
      getCourseParInfoByCourseCode: "getCourseParInfoByCourseCode",
    }),
  },
};
</script>

<style scoped>
table {
  width: 99%;
}

table td {
  border: 1px solid var(--soft-green);
  padding: 0;
}

.column {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50px;
}

.column:hover {
  background-color: var(--soft-green);
}

.column.selected {
  background-color: var(--primary);
}

.empty {
  padding: 16px;
}
</style>
