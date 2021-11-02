<template>
  <article id="vehicle-create-and-list__container">
    <!-- create form -->
    <div class="create-form__wrapper">
      <form @submit.prevent="handleVehicleCreateSubmit" class="create-form">
        <div class="inputs">
          <input
            class="input-dark mb-1/2"
            type="number"
            placeholder="차량 번호"
            v-model="vehicleNumber"
          />
          <input
            class="input-dark"
            type="text"
            placeholder="구역 번호"
            v-model="vehicleArea"
          />
        </div>
        <input
          class="create-button button-dark ml-1/2"
          type="submit"
          value="저장"
        />
      </form>
    </div>

    <!-- vehicle list -->
    <div class="vehicle-list__container">
      <!-- title -->
      <div class="vehicle-list__header">
        <h1>등록된 차량</h1>
        <i
          @click="handleVehicleListRefreshClick"
          class="vehicle-list-refresh-icon fas fa-sync-alt"
          ref="refreshIcon"
        />
      </div>

      <!-- list -->
      <div class="vehicle-list__body">
        <div class="vehicle-list__wrapper" v-if="vehicles && vehicles.length">
          <div
            class="vehicle-item__wrapper"
            v-for="item in vehicles"
            :key="item.id"
          >
            <div class="vehicle-item-info">
              <!-- vehicle number -->
              <p class="vehicle-item__chunk">
                <label for="">차량 번호</label> <span>{{ item.carNo }}</span>
              </p>

              <!-- vehicle area -->
              <p class="vehicle-item__chunk mt-1/2">
                <label for="">구역 번호</label>
                <span>{{ item.carPosInfo }}</span>
              </p>
            </div>

            <button
              class="vehicle-delete-button"
              @click="handleVehicleItemDelete(item)"
            >
              <i class="fas fa-times" />
            </button>
          </div>
        </div>
        <div v-else>등록된 차량이 없습니다.</div>
      </div>
    </div>
  </article>
</template>

<script>
import { useInput } from "@/utils/string";
import useVehicle from "@/api/v1/admin/vehicle/useVehicle.js";

const { lengthIsInvalid, getValidText } = useInput(4);
const { list, create, remove } = useVehicle();

export default {
  name: "VehicleCreateAndList",
  data() {
    return {
      vehicleNumber: "",
      vehicleArea: "",
      vehicles: [],
    };
  },
  methods: {
    isVehicleNumberValid() {
      if (lengthIsInvalid(this.vehicleNumber)) {
        this.vehicleNumber = getValidText(this.vehicleNumber);
      }
    },
    /**
     * ### 컴포넌트 초기화 메소드.
     */
    init() {
      this.requests();
    },

    /**
     * ### 화면에 필요한 데이터 조회.
     */
    async requests() {
      this.getVehicles();
    },

    /**
     * ### 차량 정보 조회.
     */
    async getVehicles() {
      const {
        status,
        data: { carPosVOList },
      } = await list();

      if (status && status === "OK") {
        this.vehicles = [...carPosVOList];
      }
    },

    /**
     * ### 차량 정보 생성.
     */
    async createVehicle() {
      const { status } = await create(this.vehicleNumber, this.vehicleArea);
      if (status && status === "OK") this.getVehicles();
    },

    /**
     * ### 차량 정보 저장 메소드.
     */
    handleVehicleCreateSubmit() {
      // 차량 정보 생성 API 호출.
      this.createVehicle();

      // 텍스트 인풋 클리어.
      this.vehicleNumber = "";
      this.vehicleArea = "";
    },

    /**
     * ### 등록된 차량 삭제 메소드.
     */
    async handleVehicleItemDelete({ seqNo }) {
      const { status } = await remove(seqNo);
      if (status && status === "OK") this.getVehicles();
    },

    /**
     * ### 차량 데이터 새로고침 버튼 클릭 이벤트.
     */
    handleVehicleListRefreshClick() {
      const elem = this.$refs.refreshIcon;
      this.elementSpin(elem);

      this.requests();
    },

    /**
     * ### 엘리먼트를 회전시키는 메소드.
     */
    elementSpin(element) {
      element.classList.add("spin");
      setTimeout(() => {
        element.classList.remove("spin");
      }, 1000);
    },
  },

  // 라이프 사이클
  mounted() {
    this.init();
  },

  watch: {
    vehicleNumber(text) {
      if (lengthIsInvalid(text)) this.vehicleNumber = getValidText(text);
    },
  },
};
</script>

<style scoped>
#vehicle-create-and-list__container {
  height: 100%;
}

/* create form start */
.create-form__wrapper {
  display: flex;
  align-items: center;
  max-height: 80px;
  height: 100%;
}
.create-form {
  display: flex;
  align-items: center;
}
.create-form .inputs {
  display: flex;
  flex-direction: column;
}
.create-form .inputs input {
  width: 280px;
  font-size: 1.2rem;
  padding: 6px 9px;
}
.create-button {
  height: 100%;
  font-size: 1.2rem;
  padding: 28px;
}
/* create form end */

/* vehicle list start */
.vehicle-list__container {
  grid-column: 1/11;
  grid-row: 2/11;
}

/* header */
.vehicle-list__header {
  display: flex;
  align-items: center;
  height: 80px;
}
.vehicle-list-refresh-icon {
  margin-left: 20px;
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.3s ease;
}
.vehicle-list-refresh-icon.spin {
  animation: rotation 1s ease;
}
.vehicle-list-refresh-icon:hover {
  transform: scale(1.1);
}

.vehicle-list__body {
  height: calc(85vh - 160px);
  overflow-y: scroll;
}
.vehicle-list__wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 8px;
}

.vehicle-item__wrapper {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid var(--soft-green);
  border-radius: 5px;
  transition: all 0.3s ease;
}
.vehicle-item__wrapper:hover {
  background-color: var(--deep-green);
}
.vehicle-item__chunk {
  display: flex;
  align-items: center;
}
.vehicle-item__chunk label,
.vehicle-item__chunk span {
  white-space: nowrap;
}

.vehicle-item__chunk label {
  font-size: 0.8rem;
}
.vehicle-item__chunk span {
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 5px;
  font-weight: 600;
}

.vehicle-item {
}
.vehicle-delete-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-left: 15px;
  background-color: transparent;
  padding: 5px;
  border: 1px solid var(--primary);
  border-radius: 50%;
  transition: all 0.3s ease;
}
.vehicle-delete-button:hover {
  background-color: tomato;
  border: 1px solid transparent;
  width: 35px;
  height: 35px;
}
.vehicle-delete-button i {
  position: absolute;
  color: var(--secondary);
  font-size: 1.3rem;
}
/* vehicle list end */

/* media start */
@media screen and (min-width: 960px) {
  /* vehicle list start */
  .vehicle-list__wrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }

  .vehicle-item__chunk span {
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 8px;
  }
  /* vehicle list end */
}

@media screen and (min-width: 1400px) {
  /* vehicle list start */
  .vehicle-list__wrapper {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
  }

  .vehicle-item__chunk span {
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 8px;
  }
  /* vehicle list end */
}
@media screen and (min-width: 1900px) {
  /* vehicle list start */
  .vehicle-list__wrapper {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
  }

  .vehicle-item__chunk label {
    font-size: 1rem;
    opacity: 0.8;
  }
  .vehicle-item__chunk span {
    width: 230px;
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 8px;
  }
  /* vehicle list end */
}
/* media end */
</style>
