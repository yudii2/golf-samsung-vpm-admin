<template>
  <div id="caddie_test__container">
    <section class="caddie_test__header">
      <h1>Caddie test</h1>
      <div>
        <span class="pointer mr" @click="handleSetCaddiesClick"
          >Set caddie</span
        >
        <span class="pointer" @click="goBack">Back</span>
      </div>
    </section>
    <section class="caddie_test__caddies__container">
      <div
        class="caddie_test__caddie__container p mb"
        v-for="(caddie, idx) in caddies"
        :key="idx"
      >
        <div class="caddie_test__caddie pointer" @click="toggleShowDetail(idx)">
          <div>
            <span>{{ caddie.caddieUniqNo }}</span>
            <span class="ml">{{ caddie.caddieName }}</span>
            <span class="ml">Wait? : {{ caddie.startTeeYn }}</span>
          </div>
          <span class="ml"
            >현재 위치:{{ caddie.currCourseCd }}-{{ caddie.currHoleIndex }}
          </span>
        </div>
        <div
          class="caddie_test__caddie_detail__container hide"
          ref="caddieDetail"
        >
          <div class="caddie_test__caddie_detail__container">
            <div>
              <span>
                <label>골프장 코드 : </label>
                <span>{{ caddie.companyCd }}</span>
              </span>
              <span>
                <label>라운딩 ID : </label>
                <span>{{ caddie.roundId }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>예약 코스 코드 : </label>
                <span>{{ caddie.bookgCourseCd }}</span>
              </span>
              <span>
                <label>현재 코스 코드 : </label>
                <span>{{ caddie.currCourseCd }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>현재홀 코드 : </label>
                <span>{{ caddie.currHoleCd }}</span>
              </span>

              <span>
                <label>현재홀 순번 : </label>
                <span>{{ caddie.currHoleIndex }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>전반 코스 코드 : </label>
                <span>{{ caddie.firstCourseCd }}</span>
              </span>

              <span>
                <label>후반 코스 코드 : </label>
                <span>{{ caddie.secondCourseCd }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>단체 코드 : </label>
                <span>{{ caddie.groupCd }}</span>
              </span>
              <span>
                <label>단체 명 : </label>
                <span>{{ caddie.groupNm }}</span>
              </span>
            </div>
            <div v-if="caddie.mark1 || caddie.mark2">
              <label>마크 : </label>
              <span>{{ caddie.mark1 }}</span
              ><span>{{ caddie.mark2 }}</span>
            </div>
            <div>
              <span>
                <label>시작홀 : </label>
                <span>{{ caddie.startHole }}</span>
              </span>

              <span>
                <label>종료 홀 카운트 : </label>
                <span>{{ caddie.finHoleCount }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>티샷 대기 여부 (Y:대기, N:플레이) : </label>
                <span>{{ caddie.startTeeYn }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>식사 주문 여부 : </label>
                <span>{{ caddie.orderYn }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>라운딩 종료 여부 : </label>
                <span>{{ caddie.roundFinishYn }}</span>
              </span>
            </div>
            <div>
              <label>플레이어 : </label>
              <span v-for="(player, idx) in caddie.playerNameVOList" :key="idx">
                {{ player.name }}
              </span>
            </div>
            <div>
              <label>포인트 좌표 : </label>
              <span>Latitude : {{ latitude(caddie) }}</span>
              <span>Longitude : {{ longitude(caddie) }}</span>
            </div>
            <div>
              <span>
                <label>예약 시간 : </label>
                <span>{{ caddie.bookgTime }}</span>
              </span>
            </div>
            <div>
              <span>
                <label>경기 시작 시간 : </label>
                <span>{{ caddie.startTime }}</span>
              </span>

              <span>
                <label>경기 진행 시간 : </label>
                <span>{{ caddie.roundTime }}</span>
              </span>
            </div>
          </div>
          <div class="caddie_test__caddie_move__container mt">
            <button @click="currentHoleStart(caddie)">play</button>
            <button @click="currentHoleDone(caddie)">done</button>
          </div>
          <div class="caddie_test__caddie_options__container mt">
            <button @click="copyAccessToken(caddie)">copy access token</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import useCaddie from "@/api/v1/monitor/useCaddie";
import useCopy from "@/composables/useCopy.js";
import { mapGetters, mapState } from "vuex";
import {
  myTestCaddies,
  allCaddies,
  tempCaddies,
} from "@/utils/test/testCaddies.js";

const { clipboard } = useCopy();
const { getCaddies, setCaddie } = useCaddie();

export default {
  name: "CaddieTest",

  data() {
    return {
      clipboard: null,
      caddieInfos: myTestCaddies,
    };
  },

  computed: {
    latitude() {
      return (caddie) => {
        return caddie?.points?.latitude;
      };
    },

    longitude() {
      return (caddie) => {
        return caddie?.points?.longitude;
      };
    },

    ...mapGetters("control", {
      caddies: "currentCaddies",
    }),
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      if (!this.caddies.length) this.requestCaddies();
      this.clipboard = clipboard;
    },

    requestCaddies() {
      getCaddies();
    },

    async currentHoleStart(caddie) {
      const { holeGameStart } = useCaddie();
      const res = await holeGameStart(caddie);
      if (res !== undefined && res.status === "OK") {
        console.info(res);
      }
    },
    async currentHoleDone(caddie) {
      const { holeGameDone } = useCaddie();
      const res = await holeGameDone(caddie);
      if (res !== undefined && res.status === "OK") {
        console.info(res);
      }
    },
    toggleShowDetail(idx) {
      const caddieDetail = this.$refs.caddieDetail[idx];
      if (caddieDetail.classList.contains("hide")) {
        caddieDetail.classList.remove("hide");
      } else {
        caddieDetail.classList.add("hide");
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    async handleSetCaddiesClick() {
      await this.caddieRound();
      await this.requestCaddies();
    },

    async caddieRound() {
      return await this.caddieInfos.forEach(
        async (caddie) => await setCaddie(caddie)
      );
    },

    copyAccessToken(caddie) {
      if (this.clipboard !== null) {
        const accessToken = sessionStorage.getItem(
          `authentication_caddie_${caddie.caddieUniqNo}`
        );

        this.clipboard(accessToken);
      }
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style>
#caddie_test__container {
  width: 100%;
  height: 100%;
  letter-spacing: 2px;
  cursor: default;
  overflow-y: scroll;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.caddie_test__header {
  min-width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
}
.caddie_test__header h1 {
  text-transform: uppercase;
}
.caddie_test__header > div span {
  transition: all 0.3s ease;
}
.caddie_test__header > div span:hover {
  color: dodgerblue;
}

.caddie_test__caddies__container {
  min-width: 50%;
}

/* caddie start */
.caddie_test__caddie__container {
  border: 1px solid gold;
  border-radius: 10px;
  transition: all 0.3s ease;
}
.caddie_test__caddie {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.caddie_test__caddie_detail__container {
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}
.caddie_test__caddie_detail__container > div {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.caddie_test__caddie_options__container > button:hover {
  color: whitesmoke;
  background-color: indigo;
}
.caddie_test__caddie_move__container > button:last-child:hover {
  color: whitesmoke;
  background-color: dodgerblue;
}

.caddie_test__caddie_move__container button,
.caddie_test__caddie_options__container button {
  width: 100%;
  margin: 0 5px;
  padding: 10px 0;
  border-radius: 5px;
  transition: all 0.3s ease;
  color: var(--secondary);
  background-color: transparent;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 1px solid var(--soft-green);
}
.caddie_test__caddie_move__container button:hover {
  border: 1px solid var(--secondary);
  background-color: tomato;
}

/* .caddie_test__caddie_detail > div > label:nth-child(3) {
  margin-left: 15px;
} */
/* caddie end */
</style>
