<template>
  <div
    class="group-color-box__container"
    v-if="getCurrentSelectedGroup"
    ref="groupColorBox"
  >
    <!-- 색상 박스 -->
    <div class="colors__container p">
      <div v-for="(color, idx) in colors" :key="color">
        <ColorCircle
          :color="color"
          :index="idx + 1"
          :isSelectedColor="selectedGroupColor"
          @onSelectColor="handleSelectColor"
        />
      </div>
    </div>

    <!-- 옵션 박스 -->
    <div class="options__container p">
      <div
        class="group-name-update__wrapper p-1/2 pointer"
        @click="handleGroupNameUpdateClick"
      >
        <div class="update-icon__wrapper">
          <i class="fas fa-pen fa-lg update-icon"></i>
        </div>
        <span class="mt-1/2">단체명 변경</span>
      </div>
    </div>

    <!-- 닫기 버튼 -->
    <CloseButton class="modal-close" @onClose="handleClickClose" />

    <!-- 단체 화살표 -->
    <div class="indicator bottom" ref="indicator"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useGroup from "@/api/v1/monitor/useGroup.js";
import useCaddie from "@/api/v1/monitor/useCaddie.js";
import colors from "@/utils/colors.js";
import ColorCircle from "@/components/shared/ColorCircle.vue";
import CloseButton from "@/components/shared/CloseButton.vue";

const { updateGroupColor } = useGroup();

export default {
  name: "CaddieSettingModalTwo",

  components: {
    ColorCircle,
    CloseButton,
  },

  props: {
    isMiniMode: {
      type: Boolean,
      require: true,
    },
  },

  data() {
    return {
      colors,
    };
  },

  computed: {
    selectedGroupColor() {
      return this.getCurrentSelectedGroup?.data?.groupColor;
    },

    ...mapGetters("control/", {
      getCurrentSelectedGroup: "getCurrentSelectedGroup",
      getSelectedCaddie: "getSelectedCaddie",
    }),
  },

  methods: {
    setContainerPosition() {
      if (this.getCurrentSelectedGroup) {
        const { iconX, iconY } = this.getCurrentSelectedGroup.position;

        // 현재 모달 화면.
        const modal = this.$refs.groupColorBox;
        let modalPos = {
          x: 0,
          y: 0,
        };

        // 그룹 인디케이터.
        const indicator = this.$refs.indicator;
        let indicatorPos = {
          x: 0,
          y: 0,
        };

        switch (this.isMiniMode) {
          // 축소화면
          case true:
            modalPos.x = Math.round(iconX - 162);
            modalPos.y = 53;
            indicatorPos.x = 136;
            indicatorPos.y = 110;
            break;

          // 풀화면
          case false:
            modalPos.x = Math.round(iconX - 284);
            modalPos.y = -22;
            indicatorPos.x = 240;
            indicatorPos.y = 176;
            break;
        }
        // 엘리먼트 위치 설정.
        modal.style.transform = `translate(${modalPos.x}px, ${modalPos.y}px)`;
        indicator.style.transform = `translate(${indicatorPos.x}px, ${indicatorPos.y}px)`;
      }
    },

    /**
     * 색상 박스 모달 종료.
     */
    handleClickClose() {
      this.clearCurrentSelectedGroup();
    },

    /**
     * ### 색상 선택 시 이벤트 핸들러.
     */
    handleSelectColor(groupColor) {
      const { groupCd, groupName } = this.getCurrentSelectedGroup.data;

      this.modifyGroupWithCaddie({
        roundId: this.getSelectedCaddie.data.roundId,
        groupCd,
        groupColor,
        groupName,
      });
    },

    /**
     * ### 단체 이름 변경 버튼 클릭 이벤트 핸들러.
     */
    handleGroupNameUpdateClick() {
      this.setIsShowingGroupNameUpdateModal(true);
    },

    ...mapActions({
      setIsShowingGroupNameUpdateModal: "updateIsShowingGroupNameUpdateModal",
    }),
    ...mapActions("control/", {
      clearCurrentSelectedGroup: "clearCurrentSelectedGroup",
      modifyGroupWithCaddie: "modifyGroupWithCaddie",
    }),
  },

  mounted() {
    this.setContainerPosition();
  },

  updated() {
    this.setContainerPosition();
  },
};
</script>

<style scoped>
.group-color-box__container {
  top: -190px;
  display: flex;
  align-items: center;
  position: absolute;
  transition: all 0.3s ease-in-out;
  background-color: rgba(1, 1, 1, 0.7);
  border: 2px solid var(--primary);
  border-radius: 15px;
}

.colors__container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border-right: 1px solid var(--primary);
}

/* modal close start */
.modal-close {
  right: -20px;
  top: -20px;
}

/* modal close end */

.options__container {
}

.group-name-update__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  transition: all 0.3s ease;
}
.group-name-update__wrapper:hover {
  background-color: var(--primary);
  border-radius: 10px;
}
.update-icon__wrapper {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
}
.update-icon__wrapper .update-icon {
  color: var(--dark-green);
}
.group-name-update__wrapper span {
  font-size: 0.9rem;
}
</style>
