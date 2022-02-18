<template>
  <section>
    <table class="table-dark">
      <tbody>
      <tr class="table_th">
        <td colspan="2">
          경기구분
        </td>
        <td colspan="2">
          경기구분
        </td>
        <td colspan="2">
          경기구분
        </td>
      </tr>
      <tr class="table_tr">
        <td>
          <div class="ranks_li__wrapper">
            <li @click="checkHandyMode('1')">
              <div class="checkbox__wrapper">
                <i v-if="getCheckedHandyMode('1')" class="checker fas fa-check"></i>
              </div>
            </li>
          </div>
        </td>
        <td>
          스트로크
        </td>
        <td>
          <div class="ranks_li__wrapper">
            <li @click="checkHandyMode('2')">
              <div class="checkbox__wrapper">
                <i v-if="getCheckedHandyMode('2')" class="checker fas fa-check"></i>
              </div>
            </li>
          </div>
        </td>
        <td>
          신페리오
        </td>
        <td>
          <div class="ranks_li__wrapper">
            <li @click="checkHandyMode('3')">
              <div class="checkbox__wrapper">
                <i v-if="getCheckedHandyMode('3')" class="checker fas fa-check"></i>
              </div>
            </li>
          </div>
        </td>
        <td>
          스트로크 핸디
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "RoundRuleAwardOptionalSettingTable",
  props: {
    roundCompetitionSettingInfoList: {
      type: Array,
      required: false,
    }
  },
  computed: {
    getHandyMode() {
      return this.roundCompetitionSettingInfoList?.find(({gubun}) => gubun === '00') || [];
    },
  },
  methods: {
    getCheckedHandyMode(modeNo) {
      const {checkYn} = this.getHandyMode
      return checkYn === modeNo
    },
    checkHandyMode(modeNo) {
      const foundHandyMode = this.getHandyMode;
      foundHandyMode.checkYn = modeNo;
      this.$emit('onUpdateCompetitionHandyModeClick', foundHandyMode)
    },
    ...mapActions({
      toast: "toast",
    }),
  },
}
</script>

<style scoped>
table {
  width: 99%;
  height: 100px;
}

table .table_th {
  background-color: var(--soft-green);
  font-weight: bold;
  height: 10px;
}

.table_tr td:nth-child(odd) {
  width: 55px;
}

.table_tr td:nth-child(even) {
  width: 28%
}

table td {
  border: 1px solid var(--soft-green);
  padding: 8px;
}

.table_tr .ranks_li__wrapper {
  width: 20px;
  height: 20px;
  text-align: center;
  margin-left: 9px;
}

.table_tr .checkbox__wrapper {
  color: tomato;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 5px;
}

</style>
