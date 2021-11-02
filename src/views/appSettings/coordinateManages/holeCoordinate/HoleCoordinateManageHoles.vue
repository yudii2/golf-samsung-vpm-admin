<template>
  <div class="hole-list__container">
    <div
      class="hole__wrapper pointer p-1/2"
      :class="{ selected: selectedIndex === holeIndex }"
      v-for="(hole, holeIndex) in holes"
      :key="holeIndex"
      @click="handleHoleOptionClick(holeIndex)"
    >
      <span>{{ hole.holeNm }}</span>
      <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HoleCoordinateManageHoles",

  props: {
    holes: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    };
  },

  methods: {
    handleHoleOptionClick(holeIndex) {
      this.selectedIndex = holeIndex;

      this.setSelectedHole(this.holes[holeIndex]);
    },

    ...mapActions("appSettings", {
      setSelectedHole: "updateSelectedHole",
    }),
  },

  mounted() {
    this.handleHoleOptionClick(this.selectedIndex);
  },
};
</script>

<style scoped>
.hole-list__container {
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

.hole__wrapper {
  border: 1px solid var(--primary);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}
.hole__wrapper:hover {
  background-color: var(--soft-green);
}
.hole__wrapper.selected {
  background-color: var(--primary);
}
</style>
