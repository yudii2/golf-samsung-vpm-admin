<template>
  <section class="coordinate-info__section" v-if="updatableCoordinate">
    <div class="coordinate-info__header">
      <!-- 좌표 정보 헤더 -->
      <h2>{{ title }}</h2>
      <i class="fas fa-check" v-if="isUpdating" @click="onIconClick"></i>
      <i class="fas fa-pen" v-else @click="onIconClick"></i>
    </div>

    <!-- 좌표 정보 바디 -->
    <!-- 위도 읽기 -->
    <div class="coordinate-info__wrapper" v-if="!isUpdating">
      <span class="mr-1/2">위도</span>
      <span class="mr-1/2">{{ updatableCoordinate.latitude }}</span>
    </div>

    <!-- 위도 수정 -->
    <div class="coordinate-info__wrapper" v-else>
      <span class="mr-1/2">위도</span>
      <input
        class="coordinate-input"
        type="text"
        v-model="updatableCoordinate.latitude"
      />
    </div>

    <!-- 경도 읽기 -->
    <div class="coordinate-info__wrapper" v-if="!isUpdating">
      <span class="mr-1/2">경도</span>
      <span class="mr-1/2">{{ updatableCoordinate.longitude }}</span>
    </div>

    <!-- 경도 수정 -->
    <div class="coordinate-info__wrapper" v-else>
      <span class="mr-1/2">위도</span>
      <input
        class="coordinate-input"
        type="text"
        v-model="updatableCoordinate.longitude"
      />
    </div>
  </section>
</template>

<script>
import {
  COORDINATE_LEFT_BOTTOM_CODE,
  COORDINATE_LEFT_TOP_CODE,
  COORDINATE_RIGHT_BOTTOM_CODE,
  COORDINATE_RIGHT_TOP_CODE,
} from "@/utils/constants";
import { mapActions, mapGetters } from "vuex";
import { updateCoordinate } from "@/api/v1/appSettings/useCoordinate";

export default {
  name: "HoleCoordinateBox",

  props: {
    title: {
      type: String,
      require: true,
    },

    coordinateCode: {
      type: Number,
      require: true,
    },

    coordinate: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      updatableCoordinate: null,
      isUpdating: false,
    };
  },

  computed: {
    /**
     * ### 헤더 구분 값의 코드 값.
     */
    optionCodeValue() {
      const [value] = Object.values(this.selectedOption);
      return value;
    },

    ...mapGetters("appSettings", {
      selectedOption: "getSelectedOption",
      selectedCourse: "getSelectedCourse",
      selectedHole: "getSelectedHole",
    }),
    ...mapGetters("control/", {
      companyCode: "getCompanyCode",
    }),
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      this.updatableCoordinate = { ...this.coordinate };
    },

    async onIconClick() {
      this.isUpdating = !this.isUpdating;

      if (!this.isUpdating) {
        this.handleUpdateCoordinate();
      }
    },

    /**
     * ### 홀/그린 좌표 설정 핸들러.
     */
    async handleUpdateCoordinate() {
      const coordinate = this.getCoordinateByCode();
      const body = {
        companyCd: this.companyCode,
        courseCd: this.selectedCourse.courseCd,
        gubun: this.optionCodeValue,
        holeCd: this.selectedHole.holeCd,
        ...(coordinate && { ...coordinate }),
      };

      const { ok } = await updateCoordinate(body);
      // 토스트 메시징.
      const title = "홀/그린 좌표 변경";
      let message = "";
      if (ok) {
        message = `${this.title} 좌표가 성공적으로 변경되었습니다.`;
      } else {
        message = `${this.title} 좌표 변경을 실패했습니다.`;
      }

      // 토스트 메시지 띄움.
      this.toast({
        title,
        message,
      });
    },

    /**
     * ### 현재 컴포넌트의 코드 좌표 코드값을 기반으로, 특정 구역의 좌표값 리턴.
     */
    getCoordinateByCode() {
      try {
        const { latitude, longitude } = this.updatableCoordinate;
        switch (this.coordinateCode) {
          case COORDINATE_LEFT_TOP_CODE:
            return {
              ltLatitude: latitude,
              ltLongitude: longitude,
            };
          case COORDINATE_RIGHT_TOP_CODE:
            return {
              rtLatitude: latitude,
              rtLongitude: longitude,
            };
          case COORDINATE_LEFT_BOTTOM_CODE:
            return {
              lbLatitude: latitude,
              lbLongitude: longitude,
            };
          case COORDINATE_RIGHT_BOTTOM_CODE:
            return {
              rbLatitude: latitude,
              rbLongitude: longitude,
            };
        }
      } catch (e) {
        console.error(e.message);
        return null;
      }
    },

    ...mapActions({
      toast: "toast",
    }),
  },

  mounted() {
    this.init();
  },

  watch: {
    coordinate() {
      this.initData();
    },
  },
};
</script>

<style scoped>
.hole-coordinate-box__container {
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

.coordinate-info__section:hover {
  background-color: var(--deep-green);
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
