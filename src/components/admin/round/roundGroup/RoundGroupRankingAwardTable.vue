<template>
  <div>
    <table id="excel__medal__table">
      <colgroup>
        <col width="7%">
        <col width="9%">
        <col width="7%">
        <col width="7%">
        <col width="7%">
        <col width="5%">
        <col width="7%">
        <col width="7%">
        <col width="8%">
        <col width="7%">
        <col width="7%">
      </colgroup>
      <thead>
      <tr>
        <th>
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="medalist ? medalist : '메달리스트'"
            @change="$emit('updateMedallistNm', $event)"
          >
          <span v-else-if="medalist">{{ medalist }}</span>

          <span v-else>메달리스트</span>
        </th>
        <th v-if="isCheckedNewPerio">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="newPerioWinner ? newPerioWinner : '신페리오 우승'"
            @change="$emit('updateNewPerioWinner',$event)"
          >
          <span v-else-if="newPerioWinner">{{ newPerioWinner }}</span>

          <span v-else>신페리오 우승</span>
        </th>
        <th v-if="isCheckedLongAndNear">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="longestWinner ? longestWinner : '롱기스트'"
            @change="$emit('updateLongestWinner',$event)"
          >
          <span v-else-if="longestWinner">{{ longestWinner }}</span>

          <span v-else>롱기스트</span>
        </th>
        <th v-if="isCheckedLongAndNear">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="nearestWinner ? nearestWinner : '니어리스트'"
            @change="$emit('updateNearestWinner',$event)"
          >
          <span v-else-if="nearestWinner">{{ nearestWinner }}</span>

          <span v-else>니어리스트</span>
        </th>
        <th v-if="isCheckedBuddy">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="buddyWinner ? buddyWinner : '버디'"
            @change="$emit('updateBuddyWinner',$event)"
          >
          <span v-else-if="buddyWinner">{{ buddyWinner }}</span>

          <span v-else>버디</span>
        </th>
        <th v-if="isCheckedPar">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="parWinner ? parWinner : '파'"
            @change="$emit('updateParWinner',$event)"
          >
          <span v-else-if="parWinner">{{ parWinner }}</span>

          <span v-else>파</span>
        </th>

        <th v-if="isCheckedOneOver">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="oneOverWinner ? oneOverWinner : '보기'"
            @change="$emit('updateOneOverWinner',$event)"
          >
          <span v-else-if="oneOverWinner">{{ oneOverWinner }}</span>

          <span v-else>보기</span>
        </th>
        <th v-if="isCheckedTwoOver">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="twoOverWinner ? twoOverWinner : '더블보기'"
            @change="$emit('updateTwoOverWinner',$event)"
          >
          <span v-else-if="twoOverWinner">{{ twoOverWinner }}</span>

          <span v-else>더블보기</span>
        </th>
        <th v-if="isCheckedThreeOver">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="threeOverWinner ? threeOverWinner : '트리플보기'"
            @change="$emit('updateThreeOverWinner',$event)"
          >
          <span v-else-if="threeOverWinner">{{ threeOverWinner }}</span>

          <span v-else>트리플보기</span>
        </th>
        <th v-if="isCheckedDoublePar">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="doubleParWinner ? doubleParWinner : '더블파'"
            @change="$emit('updateDoubleParWinner',$event)"
          >
          <span v-else-if="doubleParWinner">{{ doubleParWinner }}</span>

          <span v-else>더블파</span>
        </th>
        <th v-if="isCheckedFirstSecondGap">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="firstSecondGapWinner ? firstSecondGapWinner : '전후반'"
            @change="$emit('updateFirstSecondGapWinner',$event)"
          >
          <span v-else-if="firstSecondGapWinner">{{ firstSecondGapWinner }}</span>

          <span v-else>전후반</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <!-- 메달리스트 -->
        <td>
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedTotRankPlayerNm ? updatedTotRankPlayerNm : medalistPlayerNm"
            @change="$emit('updateTotRankPlayerNm', $event)"
          >
          <span v-else-if="updatedTotRankPlayerNm">
                          {{ updatedTotRankPlayerNm }}
          </span>
          <span
            v-else>
            {{ medalistPlayerNm }}</span>

        </td>
        <!-- 신페리오 우승 -->
        <td v-if="isCheckedNewPerio">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedScoreRankPlayerNm ? updatedScoreRankPlayerNm : newPerioWinnerPlayerNm"
            @change="$emit('updateScoreRankPlayerNm', $event)"
          >
          <span v-else-if="updatedScoreRankPlayerNm">
                          {{ updatedScoreRankPlayerNm }}
                        </span>
          <span
            v-else>{{
              newPerioWinnerPlayerNm
            }}</span>
        </td>
        <!-- 롱기스트 -->
        <td v-if="isCheckedLongAndNear">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedLongestPlayerNm ? updatedLongestPlayerNm : longestPlayerNm"
            @change="$emit('updateLongestPlayerNm', $event)"
          >
          <span v-else-if="updatedLongestPlayerNm">
                          {{ updatedLongestPlayerNm }}
                        </span>
          <span
            v-else>{{
              longestPlayerNm
            }}</span>
        </td>
        <!-- 니어리스트 -->
        <td v-if="isCheckedLongAndNear">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedNearestPlayerNm ? updatedNearestPlayerNm : nearestPlayerNm"
            @change="$emit('updateNearestPlayerNm', $event)"
          >
          <span v-else-if="updatedNearestPlayerNm">
                          {{ updatedNearestPlayerNm }}
                        </span>
          <span
            v-else>{{
              nearestPlayerNm
            }}</span>
        </td>
        <!-- 다버디상 -->
        <td v-if="isCheckedBuddy">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedBuddyPlayerNm ? updatedBuddyPlayerNm : buddyPlayerNm"
            @change="$emit('updateBuddyPlayerNm', $event)"
          >
          <span v-else-if="updatedBuddyPlayerNm">
                          {{ updatedBuddyPlayerNm }}
                        </span>
          <span
            v-else>{{
              buddyPlayerNm
            }}
                        </span>
        </td>
        <!-- 다파상 -->
        <td v-if="isCheckedPar">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedParPlayerNm ? updatedParPlayerNm : parPlayerNm"
            @change="$emit('updateParPlayerNm', $event)"
          >
          <span v-else-if="updatedParPlayerNm">
                          {{ updatedParPlayerNm }}
                        </span>
          <span
            v-else>{{
              parPlayerNm
            }}</span>
        </td>
        <!-- 다보기상 -->
        <td v-if="isCheckedOneOver">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedOneOverPlayerNm ? updatedOneOverPlayerNm : oneOverPlayerNm"
            @change="$emit('updateOneOverPlayerNm', $event)"
          >
          <span v-else-if="updatedOneOverPlayerNm">
                          {{ updatedOneOverPlayerNm }}
                        </span>
          <span
            v-else>{{
              oneOverPlayerNm
            }}</span>
        </td>
        <!-- 다더블보기상 -->
        <td v-if="isCheckedTwoOver">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedTwoOverPlayerNm ? updatedTwoOverPlayerNm : twoOverPlayerNm"
            @change="$emit('updateTwoOverPlayerNm', $event)"
          >
          <span v-else-if="updatedTwoOverPlayerNm">
                          {{ updatedTwoOverPlayerNm }}
                        </span>
          <span
            v-else>{{
              twoOverPlayerNm
            }}</span>
        </td>
        <!-- 다트리플보기상 -->
        <td v-if="isCheckedThreeOver">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedThreeOverPlayerNm ? updatedThreeOverPlayerNm : threeOverPlayerNm"
            @change="$emit('updateThreeOverPlayerNm',$event)"
          >
          <span v-else-if="updatedThreeOverPlayerNm">
                          {{ updatedThreeOverPlayerNm }}
                        </span>
          <span
            v-else>{{
              threeOverPlayerNm
            }}</span>
        </td>
        <!-- 다더블파상 -->
        <td v-if="isCheckedDoublePar">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedDoubleParPlayerNm ? updatedDoubleParPlayerNm : doubleParPlayerNm"
            @change="$emit('updateDoubleParPlayerNm', $event)"
          >
          <span v-else-if="updatedDoubleParPlayerNm">
                          {{ updatedDoubleParPlayerNm }}
                        </span>
          <span
            v-else>{{
              doubleParPlayerNm
            }}</span>
        </td>
        <!-- 전후반상 -->
        <td v-if="isCheckedFirstSecondGap">
          <input
            type="text"
            class="update_rank_input"
            v-if="isUpdatable"
            :value="updatedFirstSecondGapPlayerNm ? updatedFirstSecondGapPlayerNm : firstSecondGapPlayerNm"
            @change="$emit('updateFirstSecondGapPlayerNm', $event)"
          >
          <span v-else-if="updatedFirstSecondGapPlayerNm">
                          {{ updatedFirstSecondGapPlayerNm }}
                        </span>
          <span
            v-else>{{
              firstSecondGapPlayerNm
            }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "RoundGroupRankingAwardTable",
  props: {
    isUpdatable: {type: Boolean, required: true},
    isCheckedLongAndNear: {type: Boolean, require: true},
    isCheckedBuddy: {type: Boolean, require: true},
    isCheckedPar: {type: Boolean, require: true},
    isCheckedOneOver: {type: Boolean, require: true},
    isCheckedTwoOver: {type: Boolean, require: true},
    isCheckedThreeOver: {type: Boolean, require: true},
    isCheckedDoublePar: {type: Boolean, require: true},
    isCheckedFirstSecondGap: {type: Boolean, require: true},
    isCheckedLucky: {type: Boolean, require: true},
    isCheckedNewPerio: {type: Boolean, require: true},
    medalist: {type: String, required: false},
    newPerioWinner: {type: String, required: false},
    longestWinner: {type: String, required: false},
    nearestWinner: {type: String, required: false},
    buddyWinner: {type: String, required: false},
    parWinner: {type: String, required: false},
    oneOverWinner: {type: String, required: false},
    twoOverWinner: {type: String, required: false},
    threeOverWinner: {type: String, required: false},
    doubleParWinner: {type: String, required: false},
    firstSecondGapWinner: {type: String, required: false},
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
    medalistPlayerNm: {type: String, required: false},
    newPerioWinnerPlayerNm: {type: String, required: false},
    longestPlayerNm: {type: String, required: false},
    nearestPlayerNm: {type: String, required: false},
    buddyPlayerNm: {type: String, required: false},
    parPlayerNm: {type: String, required: false},
    oneOverPlayerNm: {type: String, required: false},
    twoOverPlayerNm: {type: String, required: false},
    threeOverPlayerNm: {type: String, required: false},
    doubleParPlayerNm: {type: String, required: false},
    firstSecondGapPlayerNm: {type: String, required: false},
  },
  methods: {}
}
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
