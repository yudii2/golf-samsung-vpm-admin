<template>
  <div id="new-playing-caddie-info__container" ref="container" v-if="isShown">
    <div class="playing-caddie-info__container">
      <!-- 캐디 명 -->
      <div class="caddie-info-row">
        <span>캐디명 : </span>
        <span
          >{{ hoveredCaddie.caddieName }}
          <span v-if="hoveredCaddie.cartNo"
            >({{ hoveredCaddie.cartNo }})</span
          ></span
        >
      </div>

      <!-- 예약 시간 -->
      <div class="caddie-info-row">
        <span>예약시간 : </span>
        <span>{{ hoveredCaddie.bookgTime | filteredBookgTime }}</span>
      </div>

      <!-- 예약자 -->
      <div class="caddie-info-row">
        <span>예약자 : </span>
        <span>{{ hoveredCaddie.bookgName }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import TimeUtil from "@/utils/datetime/TimeUtil";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NewPlayingCaddieInfo",

  computed: {
    ...mapGetters({
      isShown: "getIsShowingPlayingCaddieInfoModal",
    }),
    ...mapGetters("control/", {
      hoveredCaddie: "getHoveredCaddie",
    }),
  },

  methods: {
    handleMouseEvent(e) {
      try {
        const { innerWidth, innerHeight } = window;
        const moveX =
          e.x > innerWidth - 400
            ? -1 * (innerWidth / 10 / 2) - 80
            : innerWidth / 10 / 5;
        const moveY = e.y > 100 ? -50 : 0;
        let modifiedX = `${e.x + moveX}`;
        let modifiedY = `${e.y + moveY}`;

        this.$refs.container.style.transform = `translate(${modifiedX}px, ${modifiedY}px)`;
      } catch (e) {
        console.error(e.message);
      }
    },

    ...mapActions({
      updateIsShowingPlayingCaddieInfoModal:
        "updateIsShowingPlayingCaddieInfoModal",
    }),
  },

  mounted() {},

  destroyed() {
    window.removeEventListener("mousemove", this.handleMouseEvent, true);
  },

  watch: {
    isShown(status) {
      if (status) {
        window.addEventListener("mousemove", this.handleMouseEvent, true);
      } else {
        window.removeEventListener("mousemove", this.handleMouseEvent, true);
      }
    },
  },

  filters: {
    /**
     * ### 파싱된 예약시간.
     * @param {string} date > 'hh:mm:ss' 형식의 데이터.
     * @returns {string} 'hh:mm' 형식의 데이터.
     */
    filteredBookgTime(date) {
      if (!date) return null;

      const removeColon = date.replaceAll(":", "");
      const parsedTime = TimeUtil.parse(removeColon);
      const hours = String(parsedTime.getHours()).padStart(2, "0");
      const minutes = String(parsedTime.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    },

    /**
     * ### 가운데 글자가 마스킹 된 캐디 이름.
     */
    maskedPlayerName(name) {
      if (!name) return;

      const maskedName = String(name);
      if (maskedName.length > 1) {
        const splittedName = [];
        for (let i = 0; i < maskedName.length; i++) {
          splittedName.push(maskedName[i]);
        }

        if (splittedName.length > 1) {
          splittedName[1] = "*";
        }
        return splittedName.join("");
      }
      return name;
    },
  },
};
</script>

<style scoped>
#new-playing-caddie-info__container {
  position: absolute;
  top: 0;
  left: 0;
  background-color: tomato;
  z-index: 200;
  background-color: var(--soft-green);
  border-radius: 10px;
  padding: 5px;
}

.caddie-info-row:nth-child(2) {
  margin: 1px 0;
}

.caddie-info-row span {
  font-size: 0.7rem;
}

/* media start */
@media screen and (min-width: 1080px) {
  #new-playing-caddie-info__container {
    padding: 7px;
  }

  .caddie-info-row:nth-child(2) {
    margin: 3px 0;
  }

  .caddie-info-row span {
    font-size: 0.9rem;
  }
}

@media screen and (min-width: 1920px) {
  #new-playing-caddie-info__container {
    padding: 10px;
  }

  .caddie-info-row:nth-child(2) {
    margin: 5px 0;
  }

  .caddie-info-row span {
    font-size: 1rem;
  }
}
/* media end */
</style>
