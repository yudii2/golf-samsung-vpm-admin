<template>
  <div id="round_photo__container" class="print print_size_selphy">
    <!-- info (좌측 상단) -->
    <section>
      <div class="information">
        <div class="club_info">
          <img
            class="logo-image"
            :src="require('@/assets/images/admin/round/ansungLogo.png')"
            alt="Logo"
          />
        </div>
        <div class="member-info__wrapper">
          <div class="member-info-date">
            <span>{{ parsedBookgDate(roundInfo.visitDt) }}</span>
            <span class="ml-1/4">{{
                parsedBookgTime(roundInfo.round.bookgTime)
              }}</span>
          </div>

          <div class="member-info-members" v-if="players && players.length">
            <div
              class="player-info__wrapper"
              v-for="player in players"
              :key="player.playerId"
            >
              <span class="player-name">{{ player.name }}</span>
              <span class="player-score">{{ player.scoreTotal }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 상단 광고 -->
      <div class="ad-top__wrapper">
        <img
          class="ad-top"
          :src="require('@/assets/images/admin/round/ad_top.png')"
        />
      </div>
    </section>

    <!-- half record (하단) -->
    <section class="half_info">
      <div class="first_half table__wrapper">
        <table class="round_table">
          <colgroup>
            <col width="15%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="15%"/>
          </colgroup>
          <thead>
          <tr>
            <th>HOLE</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>{{ firstCourseName }}</th>
          </tr>
          <tr>
            <th>PAR</th>
            <th
              v-for="(par, idx) in roundInfo.roundTeamParList.slice(0, 9)"
              :key="`par_first_${idx}`"
            >
              {{ par.par }}
            </th>
            <th>{{ getTotalPar(0, 9) }}</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(player, idx) in players"
            :key="`${player.playerId}_player_score_${idx}`"
          >
            <td>{{ player.name }}</td>
            <td
              v-for="(score, idx) in player.roundPlayerScoreStrokeList.slice(
                  0,
                  9
                )"
              :key="`${players.playerId}_first_score_${idx}`"
            >
              {{ scoreByViewType(score.value, "first", idx) }}
            </td>
            <td>{{ player.firstScoreSum }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="second_half table__wrapper">
        <table class="round_table">
          <colgroup>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="7.77%"/>
            <col width="15%"/>
            <col width="15%"/>
          </colgroup>
          <thead>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>{{ secondCourseName }}</th>
            <th>Total</th>
          </tr>
          <tr>
            <th
              v-for="(par, idx) in roundInfo.roundTeamParList.slice(9, 18)"
              :key="`par_second_${idx}`"
            >
              {{ par.par }}
            </th>
            <th>{{ getTotalPar(9, 18) }}</th>
            <th>{{ getTotalPar(0, 18) }}</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(player, idx) in players"
            :key="`${player.playerId}_player_score_${idx}`"
          >
            <td
              v-for="(score, idx) in player.roundPlayerScoreStrokeList.slice(
                  9,
                  18
                )"
              :key="`${players.playerId}_second_score_${idx}`"
            >
              {{ scoreByViewType(score.value, "second", idx + 9) }}
            </td>
            <td>{{ player.secondScoreSum }}</td>
            <td>{{ player.scoreTotal }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- photo (우측 상단) -->
    <section class="photo__wrapper">
      <img class="photo" :src="roundPhoto"/>
    </section>

    <!-- ad bottom (최하단) -->
    <section>
      <div class="ad-bottom__wrapper">
        <img
          class="ad-top"
          :src="require('@/assets/images/admin/round/ad_bottom2.png')"
        />
      </div>
    </section>
  </div>
</template>

<script>
import TimeUtil from "@/utils/datetime/TimeUtil";
import DateUtil from "@/utils/datetime/DateUtil";

export default {
  name: "RoundAllScorePrint",
  props: {
    roundInfo: {
      type: Object,
    },
    players: {
      type: Array,
      required: true,
    },
    parInfo: {
      type: Array,
      required: true,
    },
    viewType: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getTotalPar(firstNum, secondNum) {
      let totalPar = 0;
      this.parInfo.slice(firstNum, secondNum).forEach((par) => {
        totalPar += par.par;
      });
      return totalPar;
    },
  },
  computed: {
    /**
     * ### 우측 상단에 표시할 라운드 사진을 가져옴.
     */
    roundPhoto() {
      return this.roundInfo.downUrl
        ? this.roundInfo.downUrl
        : process.env.VUE_APP_ROUND_ALL_SCORE_PRINT_DEFAULT_IMAGE_URL;
    },

    /**
     * ### 전반 라운드의 코스 이름을 가져옴.
     */
    firstCourseName() {
      const {
        round: {firstCourse},
      } = this.roundInfo;
      return firstCourse;
    },

    /**
     * ### 후반 라운드의 코스 이름을 가져옴.
     */
    secondCourseName() {
      const {
        round: {secondCourse},
      } = this.roundInfo;
      return secondCourse;
    },

    /**
     * ### 날짜 데이터를 파싱.
     * @param {string} bookgDate > yyyy-MM-dd 포맷의 날짜 데이터.
     * @returns {string} yyyy년 MM월 dd일 포맷의 날짜 데이터.
     */
    parsedBookgDate() {
      return (bookgDate) => {
        const bookgDateByEight = bookgDate.replaceAll("-", "");
        const bookDateByDate = DateUtil.eightToDate(bookgDateByEight);
        const {year, month, day} = DateUtil.dateDivider(bookDateByDate);
        return `${year}년 ${month}월 ${day}일`;
      };
    },

    /**
     * ### 시간 데이터를 파싱.
     * @param {string} bookgDate > hhmm 포맷의 날짜 데이터.
     * @returns {string} hh:mm 포맷의 날짜 데이터.
     */
    parsedBookgTime() {
      return (bookgTime) => {
        return TimeUtil.timeFormatWithChar(bookgTime);
      };
    },
    scoreByViewType() {
      return (originScore, half, index) => {
        if (originScore === "-") return originScore;

        if (this.viewType) {
          return originScore;
        }

        const isFirstHalf = half === "first";
        if (isFirstHalf) {
          return originScore - this.roundInfo.roundTeamParList[index].par;
        } else {
          return originScore - this.roundInfo.roundTeamParList[index].par;
        }
      };
    },
  },
};
</script>

<style scoped>
#round_photo__container {
  /*right: -20%;*/
  /*opacity: 1;*/
  /*visibility: visible;*/
  /*background-color: white;*/

  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(21, 1fr);
}

#round_photo__container * {
  font-size: 0.8rem;
  font-weight: 600;
  color: black;
}

/* grid positions start */
#round_photo__container section:nth-child(1) {
  grid-column: 1/2;
  grid-row: 1/10;

  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;
}

#round_photo__container section:nth-child(2) {
  grid-column: 1/3;
  grid-row: 10/20;
}

#round_photo__container section:nth-child(3) {
  grid-column: 2/3;
  grid-row: 1/10;
}

#round_photo__container section:nth-child(4) {
  grid-column: 1/3;
  grid-row: 20/22;
  display: grid;
}

/* grid positions end */

/* information start */
#round_photo__container .information {
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  /* border: 1px solid gray; */

  grid-row: 1/4;
}

#round_photo__container .information .club_info {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-right: 1px solid gray; */
}

#round_photo__container .information .club_info .logo-image {
  width: 80%;
  height: 55%;
}

.information .member-info__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 5px; */
}

.information .member-info__wrapper span {
  font-size: 0.95rem !important;
}

.member-info__wrapper .member-info-date {
  width: 100%;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
  padding: 5px 0;
}

.member-info__wrapper .member-info-members {
  width: 100%;
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
}

.member-info__wrapper .member-info-members div {
  display: flex;
  justify-content: space-around;
}

/* ad-top__wrapper start */
#round_photo__container .ad-top__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid gray; */

  grid-row: 4/6;
}

.ad-top__wrapper .ad-top {
  width: 100%;
  height: 100%;
}

/*ad-top__wrapper end */

/* information end */

/* half info start */
#round_photo__container .half_info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}

.half_info .table__wrapper {
  border-bottom: 1px solid gray;
}

#round_photo__container .half_info > .first_half {
  height: 100%;
  /* border: 1px solid gray; */
}

#round_photo__container .round_table td {
  text-align: center;
}

#round_photo__container .half_info > .first_half table {
  width: 100%;
  height: 100%;
}

#round_photo__container .half_info > .second_half {
  height: 100%;
  /* border: 1px solid gray; */
}

#round_photo__container .half_info > .second_half table {
  width: 100%;
  height: 100%;
}

#round_photo__container .half_info tr:first-child th {
  background-color: var(--khaki);
  color: var(--amber);
}

#round_photo__container .half_info tr:last-child th {
  background-color: var(--amber);
  color: var(--khaki);
}

#round_photo__container .half_info tr {
}

#round_photo__container .half_info th {
  padding: 3px 0;
}

/* half info end */

/* photo start */
#round_photo__container .photo__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid gray; */
  overflow: hidden;
}

#round_photo__container .photo__wrapper .photo {
  width: 100%;
  height: 100%;
}

/* photo end */

/* ad 2 start */
#round_photo__container .ad-bottom__wrapper {
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
}

/* ad 2 end */
</style>
