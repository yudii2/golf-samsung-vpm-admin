<template>
  <section class="table_wrapper">
    <table class="table-dark" v-for="(settingList,i) in competitionSettingLists" :key="i">
      <tbody>
      <tr class="table_th">
        <td></td>
        <td>시상구분</td>
        <td>시상명</td>
      </tr>
      <tr class="table_tr" v-for="(competition, j) in settingList" :key="competition[j]">
        <td>
          <div class="ranks_li__wrapper">
            <li @click="checkedAwardBox(competition)">
              <div class="checkbox__wrapper">
                <i v-if="competition.checkYn === 'Y'" class="checker fas fa-check"></i>
              </div>
            </li>
          </div>
        </td>
        <td>
          {{ competition.orgName }}
        </td>
        <td>
          <template v-if="isUpdatable">
            <input
              type="text"
              class="update_input"
              :value=competition.displayName
              @input="updateCompetitionName($event, competition)"
            />
          </template>
          <template v-else>
            {{ competition.displayName }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "RoundRuleAwardSettingTable",

  data() {
    return {
      colGroups: 3,
      maxCheckBoxCount: 5,
    }
  },

  props: {
    roundCompetitionSettingInfoList: {
      type: Array,
      required: true
    },
    isUpdatable: {
      type: Boolean,
      required: true,
    },
    checkedHandyMode: {
      type: Object,
      required: true
    }
  },

  computed: {
    computedSettingInfoList() {
      if (this.roundCompetitionSettingInfoList === null) return;
      else return Math.ceil(this.roundCompetitionSettingInfoList?.length / this.colGroups)
    },
    competitionSettingLists() {
      const settingList = [];
      settingList.push(this.roundCompetitionSettingInfoList?.filter(obj => (obj.gubun === '10' || obj.gubun === '11' || obj.gubun === '22' || obj.gubun === '24' || obj.gubun === '25' || obj.gubun === '26')));
      settingList.push(this.roundCompetitionSettingInfoList?.filter(obj => (obj.gubun === '12' || obj.gubun === '13' || obj.gubun === '20' || obj.gubun === '21' || obj.gubun === '23')));
      settingList.push(this.roundCompetitionSettingInfoList?.filter(obj => (obj.gubun === '14' || obj.gubun === '15' || obj.gubun === '16' || obj.gubun === '17' || obj.gubun === '18' || obj.gubun === '19')))

      return settingList
    },
  },

  methods: {
    countCheckBox() {
      let count = 0;
      this.roundCompetitionSettingInfoList.forEach((checkYn) => {
        if (checkYn.checkYn === 'Y') {
          count += 1;
        }
      })
      return count;
    },

    checkedAwardBox(competition) {
      const foundCompetitionSetting = this.roundCompetitionSettingInfoList.find((targetCompetition) => targetCompetition.gubun === competition.gubun);

      //신페리오 gubun 11, 스트로크핸디 22
      const findNewPerioCheckValue = this.roundCompetitionSettingInfoList.find((_targetCompetition) => _targetCompetition.gubun === '11');
      const findWStrokeHandyCheckValue = this.roundCompetitionSettingInfoList.find((_targetCompetition) => _targetCompetition.gubun === '22');
      const {checkYn} = this.checkedHandyMode || [];

      if (foundCompetitionSetting.gubun === '11' && foundCompetitionSetting.checkYn === 'N') {
        if (checkYn === '1' || checkYn === '3') {
          this.toastControlMessage();
          return;
        }
        if (findWStrokeHandyCheckValue.checkYn === 'Y') {
          this.toastNoticeMessage();
          findWStrokeHandyCheckValue.checkYn = 'N';
        }
      }

      if (foundCompetitionSetting.gubun === '22' && foundCompetitionSetting.checkYn === 'N') {
        if (checkYn === '1' || checkYn === '2') {
          this.toastControlMessage();
          return;
        }
        if (findNewPerioCheckValue.checkYn === 'Y') {
          this.toastNoticeMessage();
          findNewPerioCheckValue.checkYn = 'N';
        }
      }

      if (foundCompetitionSetting.checkYn === 'N') {
        if (this.countCheckBox() > this.maxCheckBoxCount) {
          this.maxCountNoticeMessage();
        } else {
          foundCompetitionSetting.checkYn = 'Y'
        }
      } else {
        foundCompetitionSetting.checkYn = 'N'
      }


    },
    updateCompetitionName(e, competition) {
      const copiedCompetition = {...competition}

      copiedCompetition.displayName = e.target.value

      this.$emit('onUpdateCompetitionClick', {copiedCompetition})
    },
    slicedCompetitionSettingInfoList(idx) {
      return this.roundCompetitionSettingInfoList.slice((idx - 1) * this.colGroups, idx * this.colGroups);
    },
    toastNoticeMessage() {
      this.toast({title: "알림", message: "신페리오와 스트로크핸디 중 하나만 선택하실 수 있습니다."})
    },
    maxCountNoticeMessage() {
      this.toast({title: '라운드 룰 설정', message: '최대 6개까지 가능합니다.'})
    },
    toastControlMessage() {
      this.toast({title: "알림", message: '해당 핸디모드에서는 선택할 수 없습니다.'})
    },

    ...mapActions({
      toast: "toast",
    }),
  },
  watch: {
    checkedHandyMode: {
      handler(mode) {
        //신페리오 gubun 11, 스트로크핸디 22
        const findNewPerioCheckValue = this.roundCompetitionSettingInfoList.find((_targetCompetition) => _targetCompetition.gubun === '11');
        const findWStrokeHandyCheckValue = this.roundCompetitionSettingInfoList.find((_targetCompetition) => _targetCompetition.gubun === '22');
        if (mode.checkYn === '1') {
          findNewPerioCheckValue.checkYn = 'N'
          findWStrokeHandyCheckValue.checkYn = 'N'
        }
        if (mode.checkYn === '2') {
          findWStrokeHandyCheckValue.checkYn = 'N'
        }
        if (mode.checkYn === '3') {
          findNewPerioCheckValue.checkYn = 'N'
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.table_wrapper {
  display: flex;
}

table {
  width: 99%;
  height: 100px;
}

table .table_th {
  background-color: var(--soft-green);
  font-weight: bold;
  height: 10px;
}

.table_tr td:first-child {
  width: 55px;
}

table td {
  border: 1px solid var(--soft-green);
  padding: 8px;
}

.table-dark .ranks_li__wrapper {
  /*display: inline-block;*/
  width: 20px;
  height: 20px;
  text-align: center;
  margin-left: 9px;
}

.table-dark .checkbox__wrapper {
  /*position: absolute;*/
  color: tomato;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 5px;
}

.update_input {
  width: 70%;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}
</style>
