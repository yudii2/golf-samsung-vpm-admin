<template>
  <section class="other-coordinate-manage-body__container mt">
    <table class="table-dark">
      <colgroup>
        <col width="5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="20%" />
        <col width="20%" />
        <col width="5%" />
      </colgroup>

      <!-- 헤드 -->
      <thead>
        <tr>
          <th>순번</th>
          <th>사업장</th>
          <th>코스 이름</th>
          <th>홀 이름</th>
          <th>위치 이름</th>
          <th>위도</th>
          <th>경도</th>
          <th>수정</th>
        </tr>
      </thead>

      <!-- 바디 -->
      <tbody v-if="hasCoordinates">
        <tr
          v-for="(coordinate, coordinateIndex) in coordinates"
          :key="coordinateIndex"
        >
          <td>{{ coordinateIndex + 1 }}</td>

          <td>{{ coordinate.companyCd }}</td>

          <td>{{ coordinate.courseNm }}</td>

          <td>{{ coordinate.holeNm }}</td>

          <td>{{ coordinate.positionNm }}</td>

          <td v-if="!coordinate.isUpdating">{{ coordinate.latitude }}</td>
          <td v-else><input type="text" v-model="currentLatitudeInput" /></td>

          <td v-if="!coordinate.isUpdating">{{ coordinate.longitude }}</td>
          <td v-else><input type="text" v-model="currentLongitudeInput" /></td>

          <td v-if="coordinate.isUpdating">
            <i
              class="fas fa-check update-icon done-icon"
              @click="onUpdateIconClick(coordinate, coordinateIndex)"
            ></i>
          </td>
          <td v-else>
            <i
              class="fas fa-pen update-icon"
              @click="onUpdateIconClick(coordinate, coordinateIndex)"
            ></i>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="8">기타 좌표가 존재하지 않습니다.</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { updateOtherCoordinate } from "@/api/v1/appSettings/useCoordinate";
import { mapActions } from "vuex";

export default {
  name: "OtherCoordinateManageBody",

  props: {
    coordinates: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      currentLatitudeInput: "",
      currentLongitudeInput: "",
    };
  },

  computed: {
    hasCoordinates() {
      return Boolean(this.coordinates?.length);
    },
  },

  methods: {
    clearIsUpdating() {
      for (const coordinate of this.coordinates) coordinate.isUpdating = false;
    },

    async onUpdateIconClick(coordinateInfo, coordinateIndex) {
      const currentCoordinates = [...this.coordinates];
      const { latitude, longitude, isUpdating } = currentCoordinates[
        coordinateIndex
      ];

      // clear isUpdating.
      this.clearIsUpdating();

      if (isUpdating) {
        // update fetching.
        // companyCd, courseCd, holeCd, positionCd, latitude, longitude
        const { companyCd, courseCd, holeCd, positionCd } = coordinateInfo;

        const { ok } = await updateOtherCoordinate(
          companyCd,
          courseCd,
          holeCd,
          positionCd,
          this.currentLatitudeInput,
          this.currentLongitudeInput
        );

        const title = "기타 촤표 변경";
        let message;
        if (ok) {
          message = `${companyCd}-${courseCd}-${holeCd}-${positionCd} 좌표를 성공적으로 변경했습니다.`;
          // 이거 말고 캐시로 처리.
          this.setIsOtherCoordinateUpdated(true);
          this.setUpdatedOtherCoordinate({
            ...coordinateInfo,
            newLatitude: this.currentLatitudeInput,
            newLongitude: this.currentLongitudeInput,
          });
          this.setUpdatedOtherCoordinateIndex(coordinateIndex);
        } else {
          message = "좌표 변경에 실패했습니다.";
        }
        this.toast({
          title,
          message,
        });
      } else {
        this.currentLatitudeInput = latitude;
        this.currentLongitudeInput = longitude;
      }

      currentCoordinates[coordinateIndex].isUpdating = !isUpdating;
    },

    ...mapActions({
      toast: "toast",
    }),
    ...mapActions("appSettings", {
      setOtherCoordinates: "updateOtherCoordinates",
      setIsOtherCoordinateUpdated: "updateIsOtherCoordinateUpdated",
      setUpdatedOtherCoordinate: "updateUpdatedOtherCoordinate",
      setUpdatedOtherCoordinateIndex: "updateUpdatedOtherCoordinateIndex",
    }),
  },
};
</script>

<style scoped>
.other-coordinate-manage-body__container {
  height: 100%;
  max-height: calc(100vh - 50px - 30px - 35px - 16px - 100px);
  overflow-y: scroll;
}

table input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--secondary);
  color: var(--secondary);
  text-align: center;
}

.update-icon {
  color: var(--primary);
  cursor: pointer;
}
.update-icon.done-icon {
  color: var(--secondary);
}
</style>
