<template>
  <div class="holes">
    <div
      class="hole"
      v-for="hole in holes"
      :key="hole.holeCd"
      :class="{
        par3: hole.par === 3,
        par4: hole.par === 4,
        par5: hole.par === 5,
      }"
    >
      <div v-for="caddie in currentCaddies" :key="caddie.caddieUniqNo">
        <div v-if="caddiePositioned(hole, caddie)">
          <div
            class="caddie_icon_container"
            :class="{
              'position-1/10': isPositionFirst(caddie.caddiePositionRate10Per),
              'position-2/10': isPositionSecond(caddie.caddiePositionRate10Per),
              'position-3/10': isPositionThird(caddie.caddiePositionRate10Per),
              'position-4/10': isPositionFourth(caddie.caddiePositionRate10Per),
              'position-5/10': isPositionFifth(caddie.caddiePositionRate10Per),
              'position-6/10': isPositionSixth(caddie.caddiePositionRate10Per),
              'position-7/10': isPositionSeventh(
                caddie.caddiePositionRate10Per
              ),
              'position-8/10': isPositionEighth(caddie.caddiePositionRate10Per),
              'position-9/10': isPositionNinth(caddie.caddiePositionRate10Per),
              'position-10/10': isPositionTenth(caddie.caddiePositionRate10Per),
            }"
            ref="caddieIconContainer"
          >
            <CaddieMark :caddie="caddie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import CaddieMark from "@/components/control/dashboard/body/CaddieMark.vue";

export default {
  name: "HolesInfo",
  props: ["holes", "courseIndex"],
  components: { CaddieMark },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    this.setCaddiePosition();
  },
  updated() {
    this.setCaddiePosition();
  },
  methods: {
    handleResize() {
      this.setCaddiePosition();
    },
    setCaddiePosition() {
      const caddieIconContainers = this.$refs.caddieIconContainer;
      if (caddieIconContainers) {
        caddieIconContainers.forEach((caddieIconContainer) => {
          const hole = caddieIconContainer?.parentNode?.parentNode?.parentNode;
          const ref = hole.clientWidth / 12;

          const isPositionOne = caddieIconContainer.classList.contains(
            "position-1/10"
          );
          const isPositionTwo = caddieIconContainer.classList.contains(
            "position-2/10"
          );
          const isPositionThree = caddieIconContainer.classList.contains(
            "position-3/10"
          );
          const isPositionFour = caddieIconContainer.classList.contains(
            "position-4/10"
          );
          const isPositionFive = caddieIconContainer.classList.contains(
            "position-5/10"
          );
          const isPositionSix = caddieIconContainer.classList.contains(
            "position-6/10"
          );
          const isPositionSeven = caddieIconContainer.classList.contains(
            "position-7/10"
          );
          const isPositionEight = caddieIconContainer.classList.contains(
            "position-8/10"
          );
          const isPositionNine = caddieIconContainer.classList.contains(
            "position-9/10"
          );
          const isPositionTen = caddieIconContainer.classList.contains(
            "position-10/10"
          );

          if (isPositionOne) {
            caddieIconContainer.style.transform = `translateX(${ref * 0}px)`;
          } else if (isPositionTwo) {
            caddieIconContainer.style.transform = `translateX(${ref * 1}px)`;
          } else if (isPositionThree) {
            caddieIconContainer.style.transform = `translateX(${ref * 2}px)`;
          } else if (isPositionFour) {
            caddieIconContainer.style.transform = `translateX(${ref * 3}px)`;
          } else if (isPositionFive) {
            caddieIconContainer.style.transform = `translateX(${ref * 4}px)`;
          } else if (isPositionSix) {
            caddieIconContainer.style.transform = `translateX(${ref * 5}px)`;
          } else if (isPositionSeven) {
            caddieIconContainer.style.transform = `translateX(${ref * 6}px)`;
          } else if (isPositionEight) {
            caddieIconContainer.style.transform = `translateX(${ref * 7}px)`;
          } else if (isPositionNine) {
            caddieIconContainer.style.transform = `translateX(${ref * 8}px)`;
          } else if (isPositionTen) {
            caddieIconContainer.style.transform = `translateX(${ref * 9}px)`;
          }
        });
      }
    },
    ...mapMutations("control/", ["selectCaddie"]),
  },
  computed: {
    caddiePositioned() {
      return (hole, caddie) => {
        const isSameHoleCode = hole.holeCd === caddie.currHoleCd;
        if (!isSameHoleCode) {
          return false;
        }

        const isSameCourseCode = hole.courseCd === caddie.bookgCourseCd;
        if (!isSameCourseCode) {
          return false;
        }

        const isStartTee = caddie.startTeeYn === "N";
        if (!isStartTee) {
          const isNotFirstHole = caddie.currHoleIndex != 1;
          const isNotTenHole = caddie.currHoleIndex != 10;
          if (isNotFirstHole && isNotTenHole) {
            return true;
          }

          return false;
        }

        return true;
      };
    },
    isPositionFirst() {
      return (position) => {
        return position > 0 && position <= 1;
      };
    },
    isPositionSecond() {
      return (position) => {
        return position > 1 && position <= 2;
      };
    },
    isPositionThird() {
      return (position) => {
        return position > 2 && position <= 3;
      };
    },
    isPositionFourth() {
      return (position) => {
        return position > 3 && position <= 4;
      };
    },
    isPositionFifth() {
      return (position) => {
        return position > 4 && position <= 5;
      };
    },
    isPositionSixth() {
      return (position) => {
        return position > 5 && position <= 6;
      };
    },
    isPositionSeventh() {
      return (position) => {
        return position > 6 && position <= 7;
      };
    },
    isPositionEighth() {
      return (position) => {
        return position > 7 && position <= 8;
      };
    },
    isPositionNinth() {
      return (position) => {
        return position > 8 && position <= 9;
      };
    },
    isPositionTenth() {
      return (position) => {
        return position > 9 && position <= 10;
      };
    },
    ...mapState("control/", {
      lookUpCaddies: (state) => state.lookUpCaddies,
      isMultiSelectMode: (state) => state.isMultiSelectMode,
      caddies: (state) => state.caddies,
    }),
    ...mapGetters("control/", ["currentCaddies"]),
  },
};
</script>

<style scoped>
.hole {
  position: relative;
  margin: 0px 10px;
  border-radius: 25px;
  height: 25px;
}
.caddie_icon_container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.par__caddie_position__icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 46px;
  height: 50px;
  background-repeat: no-repeat;
  transform: translateY(-30%);
  cursor: pointer;
}
.par__caddie_position__name {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(220%);
  font-size: 15px;
  font-weight: 600;
  cursor: default;
  transition: all 0.5s ease;
}

.selected {
  color: gold;
}
</style>
