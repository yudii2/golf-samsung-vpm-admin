<template>
  <section class="round-group-ranking-award-table__container">
    <table id="excel__medal__table">
      <colgroup>
        <col width="7%"/>
        <col width="9%"/>
        <col width="7%"/>
        <col width="7%"/>
        <col width="7%"/>
        <col width="5%"/>
        <col width="7%"/>
        <col width="7%"/>
        <col width="8%"/>
        <col width="7%"/>
        <col width="7%"/>
      </colgroup>
      <thead>
      <tr>
        <template v-for="awardNames in competitionSettingList">
          <th
            class="medal__table__th"
            :key="awardNames.gubun"
            v-if="awardNames.gubun !== '23' && awardNames.gubun !== '24' && awardNames.gubun !== '21'">
            {{ awardNames.displayName }}
          </th>
        </template>
      </tr>
      </thead>
      <tbody>
      <template v-for="(awardNames, j) in competitionSettingList">
        <template v-if="isUpdatable">
          <td :key="`${awardNames.gubun}${j}`"
              v-if="awardNames.gubun !== '23' && awardNames.gubun !== '24' && awardNames.gubun !== '21'">
            <input v-if="isUpdatable"
                   class="update_rank_input"
                   type="text"
                   :value="getFirstAwardee(awardNames.gubun)"
                   @change="$emit('updateAwardPlayerName' , $event, {awardNames})"
            >
          </td>
        </template>
        <template v-else>
          <td
            :key="awardNames.gubun"
            v-if="awardNames.gubun !== '23' && awardNames.gubun !== '24' && awardNames.gubun !== '21'">
            {{ getFirstAwardee(awardNames.gubun) }}
          </td>
        </template>
      </template>
      </tbody>
    </table>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "RoundGroupRankingAwardTable",

  props: {
    isUpdatable: {
      type: Boolean,
      required: false,
    },
    updatedTotRankPlayerNm: {type: String, required: false},
    updatedScoreRankPlayerNm: {type: String, required: false},
    updatedLongestPlayerNm: {type: String, required: false},
    updatedNearestPlayerNm: {type: String, required: false},
    updatedBuddyPlayerNm: {type: String, required: false},
    updatedParPlayerNm: {type: String, required: false},
    updatedOneOverPlayerNm: {type: String, required: false},
    updatedTwoOverPlayerNm: {type: String, required: false},
    updatedThreeOverPlayerNm: {type: String, required: false},
    updatedDoubleParPlayerNm: {type: String, required: false},
    updatedFirstSecondGapPlayerNm: {type: String, required: false},
  },

  methods: {
    getFirstAwardee(gubun) {
      switch (gubun) {
        case '10':
          return this.updatedTotRankPlayerNm ? this.updatedTotRankPlayerNm : this.selectedRoundGroup.roundGroupPlayerScoreRankVOList[0].playerNm;
        case '11': //신페리오
          return this.updatedScoreRankPlayerNm ? this.updatedScoreRankPlayerNm : this.selectedRoundGroup.roundGroupPlayerNewPerioRankVOList[0].playerNm;
        case '12': //롱
          return this.updatedLongestPlayerNm ? this.updatedLongestPlayerNm : this.selectedRoundGroup.roundGroupPlayerLongRankVOList[0].playerNm;
        case '13': //니어
          return this.updatedNearestPlayerNm ? this.updatedNearestPlayerNm : this.selectedRoundGroup.roundGroupPlayerNearRankVOList[0].playerNm;
        case '14': //버디
          return this.updatedBuddyPlayerNm ? this.updatedBuddyPlayerNm : this.selectedRoundGroup.roundGroupPlayerBuddyRankVOList[0].playerNm;
        case '15': //파
          return this.updatedParPlayerNm ? this.updatedParPlayerNm : this.selectedRoundGroup.roundGroupPlayerParRankVOList[0].playerNm;
        case '16': //보기
          return this.updatedOneOverPlayerNm ? this.updatedOneOverPlayerNm : this.selectedRoundGroup.roundGroupPlayerOneOverRankVOList[0].playerNm;
        case '17': //더블보기
          return this.updatedTwoOverPlayerNm ? this.updatedTwoOverPlayerNm : this.selectedRoundGroup.roundGroupPlayerTwoOverRankVOList[0].playerNm;
        case '18' :  //트리플보기
          return this.updatedThreeOverPlayerNm ? this.updatedThreeOverPlayerNm : this.selectedRoundGroup.roundGroupPlayerThreeOverRankVOList[0].playerNm;
        case '19': // 더블파
          return this.updatedDoubleParPlayerNm ? this.updatedDoubleParPlayerNm : this.selectedRoundGroup.roundGroupPlayerDoubleParRankVOList[0].playerNm;
        case '20' : //  전,후반차
          return this.updatedFirstSecondGapPlayerNm ? this.updatedFirstSecondGapPlayerNm : this.selectedRoundGroup.roundGroupPlayerFirstSecondGapRankVOList[0].playerNm;
        case '22' : //스트로크 핸디
          return '스트로크핸디'
      }
    }
  },

  computed: {
    competitionSettingList() {
      return this.selectedRoundGroupCompetitionSettingList.competitionSettingList.filter((award) => award.checkYn === 'Y')
    },
    ...mapGetters("admin/", {
      selectedRoundGroup: "getSelectedRoundGroup",
      selectedRoundGroupCompetitionSettingList: 'getSelectedRoundGroupCompetitionSettingList',
      isCheckedLong: 'getIsCheckedLong',
      isCheckedNear: 'getIsCheckedNear',
      isCheckedBuddy: 'getIsCheckedBuddy',
      isCheckedPar: 'getIsCheckedPar',
      isCheckedOneOver: 'getIsCheckedOneOver',
      isCheckedTwoOver: 'getIsCheckedTwoOver',
      isCheckedThreeOver: 'getIsCheckedThreeOver',
      isCheckedDoublePar: 'getIsCheckedDoublePar',
      isCheckedFirstSecondGap: 'getIsCheckedFirstSecondGap',
      isCheckedLucky: 'getIsCheckedLucky',
      isCheckedNewPerio: 'getIsCheckedNewPerio',
      isCheckedFirstSecond: 'getIsCheckedFirstSecond',
      isCheckedStrokeHandy: 'getIsCheckedStrokeHandy',
      isCheckedHonest: 'getIsCheckedHonest',
    })
  }
}
;
</script>

<style scoped>

table {
  width: 100%;
  text-align: center;
}

table th,
table td {
  padding: 10px;
  border: 1px solid var(--primary);
}

.update_rank_input {
  width: 100%;
  height: 25px;
  line-height: 25px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}

</style>
