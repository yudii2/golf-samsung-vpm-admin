<template>
  <div class="holes" v-if="getHolesByCourse.length">
    <!-- each hole -->
    <div
      v-for="(hole, holeIndex) in getHolesByCourse"
      class="hole"
      :class="{
        par3: hole.par == 3,
        par4: hole.par == 4,
        par5: hole.par == 5,
      }"
      :key="holeIndex"
    >
      <!-- hole number -->
      <div class="hole_number__wrapper">
        <span class="hole_number">{{ ++holeIndex }}</span>
      </div>

      <div v-if="isOrderableMode" class="hole-green">
        <img :src="greenIcon" alt="" />
      </div>

      <!-- caddie icon -->
      <NewCaddieIcon :caddies="findCaddiesByHole(hole)" />
    </div>
  </div>
  <div v-else>
    <span>No Hole Information</span>
  </div>
</template>

<script>
import NewCaddieIcon from "@/components/control/dashboard/body/NewCaddieIcon.vue";

export default {
  name: "Holes",

  components: {
    NewCaddieIcon,
  },

  props: {
    course: {
      type: Object,
      require: true,
    },
  },

  computed: {
    greenIcon() {
      return require("@/assets/images/control/dashboard/ico_flag.png");
    },
    /**
     * ### 현재 페이지에 대한 식음 관리자 모드 여부.
     */
    isOrderableMode() {
      return this.$route.name === "DashboardMobileOrderable";
    },

    findCaddiesByHole() {
      return (hole) => {
        return Object.prototype.hasOwnProperty.call(hole, "caddies")
          ? hole.caddies
          : [];
      };
    },

    getHolesByCourse() {
      let result = [];
      const hasHoles = Object.prototype.hasOwnProperty.call(
        this.course,
        "holes"
      );
      if (hasHoles) {
        const holes = this.course.holes;
        result = holes.map((hole) => {
          const hasCaddies = Object.prototype.hasOwnProperty.call(
            hole,
            "caddies"
          );
          return {
            code: hole.holeCd,
            name: hole.holeNm,
            par: hole.par,
            ...(hasCaddies && { caddies: hole.caddies }),
          };
        });
      }
      return result;
    },
  },
};
</script>

<style scoped>
.holes {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.hole {
  position: relative;
  height: 18px;
  border-radius: 25px;
  margin: 0px 2px;
  display: flex;
  justify-content: center;
}

/* hole number start */
.hole_number__wrapper {
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);

  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
}
.hole_number {
  color: var(--deep-green);
  font-size: 0.8rem;
  font-weight: 600;
}
/* hole number end */

/* green start */
.hole-green {
  position: absolute;
  width: 18px;
  height: 15px;
  border: 1px solid var(--secondary);
  border-radius: 15px;
  background-color: var(--hole-green);
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.hole-green img {
  position: relative;
  top: -80%;
  left: 50%;
}
/* green end */

/* media start */
@media screen and (min-width: 300px) {
  .hole {
    height: 19px;
    margin: 0px 5px;
  }

  /* hole number start */
  .hole_number__wrapper {
    left: 2px;

    width: 15px;
    height: 15px;
  }
  .hole_number {
    font-size: 0.7rem;
  }
  /* hole number end */

  .hole-green {
    right: 2px;
    width: 15px;
    height: 12px;
  }
}
/* laptops */
@media screen and (min-width: 720px) {
  .hole {
    height: 20px;
    margin: 0px 8px;
  }

  /* hole number start */
  .hole_number__wrapper {
    left: 2px;

    width: 16px;
    height: 16px;
  }
  .hole_number {
    font-size: 0.7rem;
  }
  /* hole number end */

  .hole-green {
    right: 2px;
    width: 16px;
    height: 13px;
  }
}
/* laptops lg */
@media screen and (min-width: 900px) {
  .hole {
    height: 21px;
    margin: 0px 10px;
  }

  /* hole number start */
  .hole_number__wrapper {
    left: 2px;

    width: 17px;
    height: 17px;
  }
  .hole_number {
    font-size: 0.8rem;
  }
  /* hole number end */

  .hole-green {
    right: 2px;
    width: 17px;
    height: 14px;
  }
}
/* desktop */
@media screen and (min-width: 1080px) {
  .hole {
    height: 25px;
    margin: 0px 10px;
  }

  /* hole number start */
  .hole_number__wrapper {
    left: 4px;

    width: 18px;
    height: 18px;
  }
  .hole_number {
    font-size: 0.8rem;
  }
  /* hole number end */

  .hole-green {
    right: 4px;
    width: 18px;
    height: 15px;
  }
}
/* desktop lg */
@media screen and (min-width: 1900px) {
  .hole {
    height: 33px;
    margin: 0px 10px;
  }

  /* hole number start */
  .hole_number__wrapper {
    left: 6px;

    width: 25px;
    height: 25px;
  }
  .hole_number {
    font-size: 1.2rem;
  }
  /* hole number end */

  .hole-green {
    right: 4px;
    width: 25px;
    height: 22px;
  }
}
/* media end */
</style>
