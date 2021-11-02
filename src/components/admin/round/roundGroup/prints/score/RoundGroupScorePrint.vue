<template>
  <article id="round_group_score_print__container" class="group_print_setting">
    <section>
      <div class="table_wrapper">
        <table>
          <colgroup>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="7%"/>
            <col width="7%"/>

            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="5%"/>

            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="7%"/>
            <col width="5%"/>
          </colgroup>
          <thead>
          <tr>
            <th>전반</th>
            <th>후반</th>
            <th>시간</th>
            <th>이름</th>
            <th>항목</th>
            <th v-for="(hole, idx) in roundInfo.roundGroupPlayerList[0].roundTeamParList.slice(0,9)"
                :key="`hole_first_${idx}`">
              {{ hole.holeNm }}
            </th>
            <th>전반</th>
            <th
              v-for="(hole, idx) in roundInfo.roundGroupPlayerList[0].roundTeamParList.slice(9,18)"
              :key="`hole_second_${idx}`"
            >
              {{ hole.holeNm }}
            </th>
            <th>후반</th>
            <th>합계</th>
          </tr>
          </thead>
          <tbody v-for="(player, i) in players" :key="`player_${i}`">
          <tr style="text-align: center">
            <td rowspan="2">
              {{ player.firstCourse }}
            </td>
            <td rowspan="2">
              {{ player.secondCourse }}
            </td>
            <td rowspan="2">{{ parsedBookgTime(roundInfo.round.lastTeamTime) }}</td>
            <td rowspan="2">{{ player.name }}</td>
            <td>스코어</td>
            <td
              v-for="(score, idx) in player.roundPlayerScoreStrokeList.slice(0,9)"
              :key="`score_first_${idx}`"
            >
              {{ scoreByViewType(score.value, idx, player) }}
            </td>
            <td>
              {{ player.firstScoreSum }}
            </td>
            <td
              v-for="(score, idx) in player.roundPlayerScoreStrokeList.slice(9,18)"
              :key="`score_second_${idx}`"
            >
              {{ scoreByViewType(score.value, idx + 9, player) }}
            </td>
            <td>
              {{ player.secondScoreSum }}
            </td>
            <td>
              {{ player.scoreTotal }}
            </td>
          </tr>
          <tr style="text-align: center">
            <td>퍼팅</td>
            <td
              v-for="(putting, idx) in player.roundPlayerScorePutterList.slice(0,9)"
              :key="`putting_first_${idx}`"
            >
              {{ putting.value }}
            </td>
            <td>
              {{ player.firstPutterSum }}
            </td>
            <td
              v-for="(putting, idx) in player.roundPlayerScorePutterList.slice(9,18)"
              :key="`putting_second_${idx}`"
            >
              {{ putting.value }}
            </td>
            <td>
              {{ player.secondPutterSum }}
            </td>
            <td>
              {{ player.putterTotal }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>

<script>
import TimeUtil from "@/utils/datetime/TimeUtil";

export default {
  name: "RoundGroupScorePrint",
  props: {
    roundInfo: {
      type: Object,
    },
    players: {
      type: Array,
      required: true,
    },
    isSeeTotalScore: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },
    scoreByViewType() {
      return (score, i, player) => {
        if (score === '-') return score;

        if (this.isSeeTotalScore) {
          return score;
        } else {
          return Number(score) - player?.roundTeamParList[i].par

        }
      };
    },
    accumulator() {
      return list => {
        return list.reduce((acc, cur) => acc + cur);
      };
    },
  },
};
</script>

<style scoped>
/* content positions start */
#round_group_score_print__container {
  /*opacity: 1;*/
  /*visibility: visible;*/
  /*background: white;*/
  /*color: black;*/
  /*top: 200px;*/
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.group_print_setting {
  display: grid;
  grid-gap: 5px;
  position: relative;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
}

#round_group_score_print__container table {
  width: 100%;
  height: 100%;
}

#round_group_score_print__container section:first-child {
  grid-column: 1/4;
}

#round_group_score_print__container section:last-child {
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* content left end */

/* content right start */
#round_group_score_print__container table th,
#round_group_score_print__container table td {
  /*padding: 10px;*/
  border: 1px solid black;
}


/* common record table end */
</style>
