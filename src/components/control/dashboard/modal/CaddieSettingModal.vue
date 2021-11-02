<template>
  <transition name="fade" appear>
    <div
      id="modal"
      ref="modal"
      v-if="isShowingCaddieSettingModal && selectedCaddie"
      @click.stop
    >
      <!-- 마크 -->
      <section>
        <SecondModalItem
          v-for="(mark, idx) in markItems"
          :key="idx"
          :mark="mark"
        />
      </section>

      <!-- 단체 -->
      <section>
        <FirstModalItem
          v-for="(group, idx) in groups"
          :key="idx"
          :group="group"
          @onClick="handleGroupIconClick"
        />

        <FirstModalItem
          :group="{ groupName: '단체 생성' }"
          @onClick="handleGroupCreateClick"
        />
        <FirstModalItem
          :group="{ groupName: '단체 해제' }"
          @onClick="handleGroupReleaseClick"
        />
      </section>

      <section>
        <!-- 메시지 -->
        <div class="modal_message modal_item" @click="handleClickModalMessage">
          <img
            :src="require('@/assets/images/control/dashboard/ico_msg.png')"
            alt="message icon"
            ref="modalMessageIcon"
          />
          <span class="mt-1/2">메시지</span>
        </div>

        <!-- 경기 출발 시간 -->
        <div
          class="modal_time_start modal_item"
          @click="setShowPlayTimeModal(true)"
        >
          <!-- 경기 출발 시간 이미지 박스 -->
          <img
            :src="require('@/assets/images/control/dashboard/ico_gametime.png')"
            alt=""
          />
          <span class="mt-1/2">경기 출발시간</span>
        </div>
        <!-- <div class="modal_close modal_item" @click="modalClose"></div> -->
      </section>
      <div class="indicator" ref="indicator"></div>
      <transition name="fade">
        <GroupColorBox
          ref="groupColorBox"
          v-if="selectedGroup"
          :isMiniMode="isMiniMode"
        />
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GroupColorBox from "@/components/control/dashboard/modal/groups/GroupColorBox.vue";
import SecondModalItem from "@/components/control/dashboard/modal/SecondModalItem.vue";
import FirstModalItem from "@/components/control/dashboard/modal/FirstModalItem.vue";
import { windowManager } from "@/utils/windowUtils";
import useCaddie from "@/api/v1/monitor/useCaddie";
import useGroup from "@/api/v1/monitor/useGroup";

const { clearCurrentSelectedCaddieWithTimer } = windowManager();
const { updateCaddieGroup } = useCaddie();
const { updateGroupColor } = useGroup();

export default {
  name: "CaddieSettingModal",

  components: { GroupColorBox, SecondModalItem, FirstModalItem },

  props: {
    isMiniMode: {
      type: Boolean,
      require: true,
    },
  },

  data() {
    return {
      timer: null,
      markItems: [
        {
          type: "second",
          code: 1,
          label: "VIP",
          fileName: "state_vip.png",
        },
        {
          type: "second",
          code: 2,
          label: "교육",
          fileName: "state_edu.png",
        },
        {
          type: "second",
          code: 3,
          label: "주의",
          fileName: "state_caution.png",
        },
        {
          type: "second",
          code: 4,
          label: "업무",
          fileName: "state_work.png",
        },
        {
          type: "second",
          code: 5,
          label: "9홀",
          fileName: "state_holeadd.png",
        },
        {
          type: "second",
          code: 6,
          label: "신입",
          fileName: "state_newcomer.png",
        },
        {
          type: "second",
          code: 7,
          label: "셀프",
          fileName: "state_self.png",
        },
        {
          type: "second",
          code: 8,
          label: "배토",
          fileName: "state_beto.png",
        },
        {
          type: "second",
          code: 9,
          label: "식사주문",
          fileName: "state_food.png",
        },
        {
          type: "first",
          code: 1,
          label: "첫팀",
          fileName: "state_first.png",
        },
        {
          type: "first",
          code: 2,
          label: "막팀",
          fileName: "state_last.png",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      isShowingCaddieSettingModal: "getIsShowingCaddieSettingModal",
    }),
    ...mapGetters("control/", {
      courses: "getCompanyCourses",
      selectedCaddie: "getSelectedCaddie",
      selectedGroup: "getCurrentSelectedGroup",
      groups: "getCurrentGroups",
    }),
  },

  methods: {
    /**
     * ### 단체 해제 메소드.
     */
    async handleGroupReleaseClick() {
      await this.clearCaddieGroup();
      await this.clearSelectedGroup();
    },

    /**
     * ### 현재 선택된 캐디 그룹 해제.
     */
    clearCaddieGroup() {
      const { roundId } = this.selectedCaddie.data;
      updateCaddieGroup({
        groupCd: "null",
        groupName: "null",
        roundId,
      });
    },

    /**
     * ### 단체 생성 메소드.
     */
    handleGroupCreateClick() {
      this.setIsShowingGroupCreateModal(true);
    },

    /**
     * ### 단체 컬러 색상 핸들러.
     */
    async handleGroupIconClick({ data, position }) {
      if (!this.selectedGroup) {
        this.setSelectedGroup({
          data,
          position,
        });

        this.modifyGroupWithCaddie({
          ...data,
          roundId: this.selectedCaddie.data.roundId,
        });

        return;
      }

      const isSameGroup = this.selectedGroup.data.groupCd === data.groupCd;

      if (isSameGroup) {
        this.setSelectedGroup(null);
      } else {
        this.setSelectedGroup({
          data,
          position,
        });

        this.modifyGroupWithCaddie({
          ...data,
          roundId: this.selectedCaddie.data.roundId,
        });
      }
    },

    handleClickModalMessage() {
      const { data } = this.selectedCaddie;
      this.selectCaddie(data);
      this.setIsShowingMessengerSendModal(true);
    },

    setModalPosition() {
      if (this.selectedCaddie) {
        const modal = this.$refs.modal;
        const indicator = this.$refs.indicator;

        const { modalPos, indicatorPos } = this.getModalPositions();

        // 모달 컨데이터 설정.
        modal.style.top = `${modalPos.y}px`;

        // 인디케이터 설정.
        indicator.classList.add("bottom");
        indicator.style.left = `${indicatorPos.x}px`;
        indicator.style.transform = `translateY(${indicatorPos.y}px)`;
      }
    },

    /**
     * ### 캐디 설정 모달 창 및 인디케이터의 포지션 값을 도출.
     */
    getModalPositions() {
      let modalPos = { x: 0, y: 0 };
      let indicatorPos = { x: 0, y: 0 };

      if (this.isMiniMode) {
        modalPos.y = this.selectedCaddie.position?.iconY - 185;
        indicatorPos.x = this.selectedCaddie.position?.iconX - 21;
        indicatorPos.y = 87;
      } else {
        modalPos.y = this.selectedCaddie.position?.iconY - 260;
        indicatorPos.x = this.selectedCaddie.position?.iconX - 43;
        indicatorPos.y = 117;
      }

      return {
        modalPos,
        indicatorPos,
      };
    },

    // 현재 모달 창 종료 메소드.
    modalClose() {
      this.clearSelectedCaddie();
    },

    ...mapActions({
      setIsShowingMessengerSendModal: "updateIsShowingMessengerSendModal",
      setShowPlayTimeModal: "updateIsShowingPlayTimeModal",
      setIsShowingGroupCreateModal: "updateIsShowingGroupCreateModal",
    }),
    ...mapActions("control/", {
      clearSelectedCaddie: "clearSelectedCaddie",
      selectCaddie: "addSelectedCaddie",
      clearSelectedGroup: "clearCurrentSelectedGroup",
      setSelectedGroup: "updateCurrentSelectedGroup",
      modifyGroupWithCaddie: "modifyGroupWithCaddie",
    }),
  },

  mounted() {
    // initialize modal position.
    this.setModalPosition();

    window.addEventListener("resize", () => {
      clearCurrentSelectedCaddieWithTimer();
    });
  },

  updated() {
    this.setModalPosition();
  },

  destroyed() {
    this.setIsShowingGroupCreateModal(false);
  },
};
</script>

<style scoped>
#modal {
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  height: 90px;
  align-self: center;
  display: grid;
  grid-template-columns: 0.4fr 0.4fr 0.2fr;
  background-color: rgba(1, 1, 1, 0.7);
  border: 2px solid var(--primary);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}
#modal > section {
  display: flex;
}
#modal > section:first-child {
  justify-content: space-around;
  align-items: center;
}
#modal > section:nth-child(2) {
  justify-content: space-around;
  align-items: center;
  border-left: 2px solid var(--primary);
  border-right: 2px solid var(--primary);
}
#modal > section:nth-child(3) {
  justify-content: space-around;
  align-items: center;
}
.modal_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 10px;
}
.modal_item:hover {
  background-color: var(--primary);
}
/* modal message start */
.modal_message {
  position: relative;
}
.modal_message > img {
  width: 30px;
  height: 30px;
}
.modal_message > span {
  font-size: 0.7rem;
}
.modal_time_start {
}
.modal_message:hover {
  background-color: var(--primary);
}
/* modal message end */

/* modal tim start start */
.modal_time_start > img {
  width: 30px;
  height: 30px;
}
.modal_time_start > span {
  font-size: 0.7rem;
}
.modal_time_start:hover {
  background-color: var(--primary);
}
.modal_close {
  background: url("../../../../assets/images/control/dashboard/ico_close.png");
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--deep-green);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #fff;
  transition: all 0.3s ease;
}

.no_group {
  font-size: 0.8rem;
}

/* media start */
@media screen and (min-width: 1600px) {
  #modal {
    height: 120px;
  }

  #modal .modal_time_start > img {
    width: 45px;
    height: 45px;
  }
  #modal .modal_time_start > span {
    font-size: 0.9rem;
  }

  #modal .modal_message > img {
    width: 45px;
    height: 45px;
  }
  #modal .modal_message > span {
    font-size: 0.9rem;
  }
}
/* media end */
</style>
