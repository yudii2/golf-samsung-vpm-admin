<template>
  <section class="round-group-ranking-award-table__container">
    <table id="excel__medal__table">
      <colgroup>
        <col width="10%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
        <col width="9%"/>
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
                   :value="getFirstAwardee(awardNames)"
                   @change="updatePlayerName($event, awardNames)"
            >
          </td>
        </template>
        <template v-else>
          <td
            :key="awardNames.gubun"
            v-if="awardNames.gubun !== '23' && awardNames.gubun !== '24' && awardNames.gubun !== '21'">
            {{ getFirstAwardee(awardNames) }}
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
  },

  data() {
    return {
      playerNameList: []
    }
  },

  methods: {
    init() {
      this.playerNameList = [];
    },
    updatePlayerName(e, awardName) {
      const {checkYn, competitionId, displayName, gubun, orgName} = awardName
      this.playerNameList.push({
        "checkYn": checkYn,
        "competitionId": competitionId,
        "displayName": displayName,
        "gubun": gubun,
        "orgName": orgName,
        "playerName": e.target.value
      })
      this.$emit('updatePlayerNames', this.playerNameList)
    },
    getFirstAwardee(award) {
      const {gubun, playerName} = award
      switch (gubun) {
        case '10':
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerScoreRankVOList[0]?.playerNm : playerName;
        case '11': //신페리오
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerNewPerioRankVOList[0]?.playerNm : playerName;
        case '12': //롱
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerLongRankVOList[0]?.playerNm : playerName;
        case '13': //니어
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerNearRankVOList[0]?.playerNm : playerName;
        case '14': //버디
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerBuddyRankVOList[0]?.playerNm : playerName;
        case '15': //파
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerParRankVOList[0]?.playerNm : playerName;
        case '16': //보기
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerOneOverRankVOList[0]?.playerNm : playerName;
        case '17': //더블보기
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerTwoOverRankVOList[0]?.playerNm : playerName;
        case '18' :  //트리플보기
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerThreeOverRankVOList[0]?.playerNm : playerName;
        case '19': // 더블파
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerDoubleParRankVOList[0]?.playerNm : playerName;
        case '20' : //  전,후반차
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerFirstSecondGapRankVOList[0]?.playerNm : playerName;
        case '22' : //스트로크 핸디
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerNewPerioRankVOList[0]?.playerNm : playerName;
        case '25' : //준우승
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerNewPerioRankVOList[1]?.playerNm : playerName;
        case '26' : //3등
          return playerName === 'X' ? this.selectedRoundGroup.roundGroupPlayerNewPerioRankVOList[2]?.playerNm : playerName;
      }
    },
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
      isCheckedSecondClass: 'getIsCheckedSecondClass',
      isCheckedThirdClass: 'getIsCheckedThirdClass',
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
