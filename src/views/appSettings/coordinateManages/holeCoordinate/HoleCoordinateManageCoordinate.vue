<template>
  <div class="coordinate-info__container" v-if="hasCoordinates">
    <HoleCoordinateBox
      v-for="(coordinate, coordinateIndex) in coordinates"
      :key="coordinateIndex"
      :coordinateCode="coordinate.code"
      :title="coordinate.title"
      :coordinate="coordinate.coordinate"
    />
  </div>
</template>

<script>
import HoleCoordinateBox from "@/components/appSettings/holeCoordinate/HoleCoordinateBox.vue";
import {
  COORDINATE_LEFT_BOTTOM_CODE,
  COORDINATE_LEFT_TOP_CODE,
  COORDINATE_RIGHT_BOTTOM_CODE,
  COORDINATE_RIGHT_TOP_CODE,
} from "@/utils/constants";

export default {
  name: "HoleCoordinateManageCoordinate",

  components: {
    HoleCoordinateBox,
  },

  props: {
    holeCoordinate: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      coordinates: [],
    };
  },

  computed: {
    /**
     * ### 좌표 정보 목록 존재 여부.
     */
    hasCoordinates() {
      return Boolean(this.coordinates);
    },

    /**
     * ### 좌측 상단 좌표 정보.
     */
    coordinateLeftTop() {
      return {
        latitude: this.holeCoordinate?.leftTopLatitude,
        longitude: this.holeCoordinate?.leftTopLongitude,
      };
    },

    /**
     * ### 우측 상단 좌표 정보.
     */
    coordinateRightTop() {
      return {
        latitude: this.holeCoordinate?.rightTopLatitude,
        longitude: this.holeCoordinate?.rightTopLongitude,
      };
    },

    /**
     * ### 좌측 하단 좌표 정보.
     */
    coordinateLeftBottom() {
      return {
        latitude: this.holeCoordinate?.leftBottomLatitude,
        longitude: this.holeCoordinate?.leftBottomLongitude,
      };
    },

    /**
     * ### 우측 하단 좌표 정보.
     */
    coordinateRightBottom() {
      return {
        latitude: this.holeCoordinate?.rightBottomLatitude,
        longitude: this.holeCoordinate?.rightBottomLongitude,
      };
    },
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      // 목록 초기화.
      this.coordinates = [];

      // 목록 재적용.
      this.coordinates.push({
        title: "좌측 상단",
        coordinate: this.coordinateLeftTop,
        code: COORDINATE_LEFT_TOP_CODE,
      });
      this.coordinates.push({
        title: "우측 상단",
        coordinate: this.coordinateRightTop,
        code: COORDINATE_RIGHT_TOP_CODE,
      });
      this.coordinates.push({
        title: "좌측 하단",
        coordinate: this.coordinateLeftBottom,
        code: COORDINATE_LEFT_BOTTOM_CODE,
      });
      this.coordinates.push({
        title: "우측 하단",
        coordinate: this.coordinateRightBottom,
        code: COORDINATE_RIGHT_BOTTOM_CODE,
      });
    },
  },

  mounted() {
    this.init();
  },

  watch: {
    holeCoordinate() {
      this.initData();
    },
  },
};
</script>

<style scoped>
.coordinate-info__container {
  width: 50%;
  height: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 16px;
}

.coordinate-info__section {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary);
  border-radius: 5px;
}
.coordinate-info__header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.coordinate-info__header h2 {
  margin-right: 8px;
}
.coordinate-info__header i {
  color: var(--primary);
  cursor: pointer;
}

.coordinate-info__wrapper {
  margin-top: 8px;
}

.coordinate-input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  color: var(--secondary);
}
</style>
