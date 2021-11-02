<template>
  <div
    class="new_caddie_icon__container no-drag"
    v-if="caddies.length"
    ref="containerRef"
  >
    <!-- caddie wrapper -->
    <div
      v-for="(group, groupIndex) in caddieGroups"
      :key="groupIndex"
      class="caddie__wrapper"
      :class="[
        isPositionFirst(group['position']) ? POSITION_1 : '',
        isPositionSecond(group['position']) ? POSITION_2 : '',
        isPositionThird(group['position']) ? POSITION_3 : '',
        isPositionFourth(group['position']) ? POSITION_4 : '',
        isPositionFifth(group['position']) ? POSITION_5 : '',
        isPositionSixth(group['position']) ? POSITION_6 : '',
        isPositionSeventh(group['position']) ? POSITION_7 : '',
        isPositionEighth(group['position']) ? POSITION_8 : '',
        isPositionNinth(group['position']) ? POSITION_9 : '',
        isPositionTenth(group['position']) ? POSITION_10 : '',
      ]"
      ref="caddies"
    >
      <div class="caddie" v-if="group['caddies'].length">
        <!-- mark -->
        <CaddieMark :caddie="findFirstCaddieByGroup(group)" />

        <!-- center icon -->
        <div
          class="caddie_icon__wrapper"
          @click.stop="handleCaddieGroupClick(group, groupIndex)"
          ref="caddieIconWrapper"
        >
          <img
            class="caddie_icon mb-1/2"
            :src="caddieIcon(findFirstCaddieByGroup(group))"
            ref="caddieIcons"
          />

          <!-- caddie player count number -->
          <span v-if="isValidPlayersCountByGroup(group)" class="player_count">{{
            findFirstCaddiePlayerCountByGroup(group)
          }}</span>
        </div>

        <!-- caddie name -->
        <div class="caddie_names__container" v-if="group['caddies'].length">
          <div
            class="caddie_name__box"
            v-for="(caddie, caddieIndex) in findGroupedCaddiesByGroup(group)"
            :key="caddieIndex"
          >
            <transition name="fade" mode="out-in" appear>
              <!-- 타이틀 텍스트 -->
              <span
                class="caddie_name pointer"
                :class="{
                  'second-round': isSecondRound(caddie),
                  selected: isSelected(caddie),
                  'i-am-here': isSearched(caddie.caddieName),
                }"
                @click="handleCaddieMouseOver(group, groupIndex, caddieIndex)"
                @mouseover="
                  handleCaddieMouseOver(group, groupIndex, caddieIndex)
                "
                @mouseleave="handleCaddieMouseLeave()"
              >
                {{ prettyCaddieViewType(caddie) }}
              </span>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CADDIE_VIEW_TYPE_CADDIE_NAME,
  CADDIE_VIEW_TYPE_BOOKG_TIME,
  CADDIE_VIEW_TYPE_PLAY_TIME,
  CADDIE_VIEW_TYPE_CART_NUMBER,
  POSITION_1,
  POSITION_2,
  POSITION_3,
  POSITION_4,
  POSITION_5,
  POSITION_6,
  POSITION_7,
  POSITION_8,
  POSITION_9,
  POSITION_10,
} from "@/utils/constants.js";
import CaddieMark from "@/components/control/dashboard/body/CaddieMark.vue";
import TimeUtil from "@/utils/datetime/TimeUtil";

export default {
  name: "NewCaddieIcon",
  components: {
    CaddieMark,
  },
  props: {
    caddies: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      useCartNumber: false,
      selectedCaddieInfo: null,
      selectedGroup: {
        group: null,
        element: null,
      },
      POSITION_1,
      POSITION_2,
      POSITION_3,
      POSITION_4,
      POSITION_5,
      POSITION_6,
      POSITION_7,
      POSITION_8,
      POSITION_9,
      POSITION_10,
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    this.setCaddiesPosition();
  },
  watch: {
    /**
     * 그룹핑된 캐디의 경우 클릭 시, 추가적으로 캐디를 선택.
     */
    currentSelectedCaddieByChip(caddie) {
      if (this.caddies.length && caddie) {
        const caddies = this.selectedGroup?.group?.caddies;
        if (caddies) {
          for (const c of caddies) {
            if (c.caddieUniqNo === caddie.caddieUniqNo) {
              this.handleCaddieIconClick(caddie);
              break;
            }
          }
        }
      }
    },
  },
  methods: {
    init() {
      this.setCaddiesPosition();

      window.addEventListener("resize", () => {
        this.setCaddiesPosition();
      });

      this.initSelectedCaddieInfo();
    },

    /**
     * ### 마우스 오버 시 표현할 초기 데이터 설정.
     * #### 본 메소드 실행하지 않으면 첫 시도 시 NullPointException 뜸.
     * #### 로직 설명.
     * - 각각의 그룹을 탐색.
     * - 각각의 포지션의 첫 번째 캐디를 가져옴.
     * - selectedCaddieInfo 에 값을 넣어줌.
     * - playCaddieInfo v-if 방지.
     */
    initSelectedCaddieInfo() {
      if (!this.selectedCaddieInfo && this.caddieGroups.length) {
        // 각각의 그룹을 탐색.
        this.caddieGroups?.forEach((group) => {
          // 각각의 포지션의 첫 번째 캐디를 가져옴.
          this.selectedCaddieInfo = group.caddies[0];
        });
      }
    },

    handleCaddieMouseOver(group, groupIndex, caddieIndex) {
      this.setCaddieIconContainerZIndex(groupIndex);

      this.selectedCaddieInfo = group.caddies[caddieIndex];
      this.setIsShowingPlayingCaddieInfoModal(true);
      this.updateHoveredCaddie(this.selectedCaddieInfo);
    },
    handleCaddieMouseLeave() {
      this.setIsShowingPlayingCaddieInfoModal(false);
      this.updateHoveredCaddie();
    },
    /**
     * ### 캐디 그룹 아이콘 클릭 이벤트 핸들링 메소드.
     * @param {Object} group > 캐디 목록을 담은 그룹 객체.
     * @param {Number} groupIconIndex > 캐디 목록 그룹의 순서 값.
     */
    async handleCaddieGroupClick(group, groupIconIndex) {
      // 캐디 아이콘 컨테이너 z-index 설정.
      // this.setCaddieIconContainerZIndex(groupIconIndex);

      // 미니모드인 경우 아무것도 하지 않을래.
      if (this.isMobileMode) return;

      // 현재 선택된 그룹 데이터 설정.
      this.selectedGroup.group = group;
      this.selectedGroup.element = this.$refs.caddieIcons[groupIconIndex];

      if (group?.caddies?.length > 1) {
        await this.setChipBoxTitle("캐디 선택");
        const chips = group?.caddies?.map((caddie, caddieIndex) => {
          return {
            id: caddie.caddieUniqNo,
            index: caddieIndex,
            title: caddie.caddieName,
          };
        });

        await this.setChipBoxItems(chips);
        await this.setChipBoxClickable(true);
        await this.setChipBoxFrom("NewCaddieIcon");

        await this.setIsShowingChipBoxModal(true);
      } else {
        // 첫 번째 캐디 선택.
        this.handleCaddieIconClick(this.findFirstCaddieByGroup(group));
      }
    },

    /**
     * ### 선택한 캐디 아이콘 컨테이너의 Z-index를 가장 위로 설정.
     * @param {Number} groupIconIndex > 현재 선택한 캐디 아이콘의 인덱스 값.
     */
    setCaddieIconContainerZIndex(groupIconIndex) {
      const hasCaddies = Object.prototype.hasOwnProperty.call(
        this.$refs,
        "caddies"
      );
      if (hasCaddies) {
        const caddies = this.$refs.caddies;
        caddies.map((caddieElement) => (caddieElement.style.zIndex = 0));
        const caddieContainer = caddies[groupIconIndex];
        caddieContainer.style.zIndex++;
      }
    },

    /**
     * ### 캐디를 선택하는 메소드.
     * @param {Object} caddie > 캐디 객체.
     */
    handleCaddieIconClick(caddie) {
      switch (this.isMultiSelectMode) {
        case true:
          this.addSelectedCaddie(caddie);
          break;

        case false:
          this.caddieClickSingle(caddie);
          break;
      }
    },

    /**
     * ### 단일 캐디를 선택하는 메소드.
     * @param {Object} caddie > 캐디 객체.
     */
    caddieClickSingle(caddie) {
      const element = this.selectedGroup.element;

      if (element) {
        let rect = element.getBoundingClientRect();

        this.selectCaddie({
          data: caddie,
          position: {
            iconX: rect.x,
            iconY: rect.y,
          },
        });

        this.setIsShowingCaddieSettingModal(true);
      }
    },

    /**
     * ### 캐디 아이콘의 위치를 설정하는 메소드.
     * #### 현재 본 로직이 실행되는 상황.
     * - onMounted,
     * - onUpdated.
     * - onResized.
     */
    setCaddiesPosition() {
      if (this.caddies.length) {
        const hasCaddies = Object.prototype.hasOwnProperty.call(
          this.$refs,
          "caddies"
        );

        if (hasCaddies && this.$refs.caddies.length) {
          for (const element of this.$refs.caddies) {
            const isFirst = element.classList.contains(this.POSITION_1);
            const isSecond = element.classList.contains(this.POSITION_2);
            const isThird = element.classList.contains(this.POSITION_3);
            const isFourth = element.classList.contains(this.POSITION_4);
            const isFifth = element.classList.contains(this.POSITION_5);
            const isSixth = element.classList.contains(this.POSITION_6);
            const isSeventh = element.classList.contains(this.POSITION_7);
            const isEighth = element.classList.contains(this.POSITION_8);
            const isNinth = element.classList.contains(this.POSITION_9);
            const isTenth = element.classList.contains(this.POSITION_10);

            const container = this.$refs.containerRef;
            const refValue = container.clientWidth / 10;

            let value = 0;

            if (isFirst) {
              value = -(refValue * 4);
            } else if (isSecond) {
              value = -(refValue * 3);
            } else if (isThird) {
              value = -(refValue * 2);
            } else if (isFourth) {
              value = -(refValue * 1);
            } else if (isFifth) {
              value = -(refValue * 0.5);
            } else if (isSixth) {
              value = refValue * 0.5;
            } else if (isSeventh) {
              value = refValue * 1;
            } else if (isEighth) {
              value = refValue * 2;
            } else if (isNinth) {
              value = refValue * 3;
            } else if (isTenth) {
              value = refValue * 4;
            }

            element.style.transform = `translateX(${value}px)`;
          }
        }
      }
    },

    ...mapActions({
      setIsShowingChipBoxModal: "updateIsShowingChipBoxModal",
      setChipBoxTitle: "updateChipBoxTitle",
      setChipBoxItems: "updateChipBoxItems",
      setChipBoxClickable: "updateChipBoxClickable",
      setChipBoxFrom: "updateChipBoxFrom",
      setIsShowingPlayingCaddieInfoModal:
        "updateIsShowingPlayingCaddieInfoModal",
      setIsShowingCaddieSettingModal: "updateIsShowingCaddieSettingModal",
    }),
    ...mapActions("control/", {
      //  caddies
      selectCaddie: "updateCurrentSelectedCaddie",
      addSelectedCaddie: "addSelectedCaddie",
      updateHoveredCaddie: "updateHoveredCaddie",
    }),
  },
  computed: {
    /**
     * ### 현재 캐디 보기 설정에 따라 옵션 타이틀 설정.
     * @param {string} caddie.caddieName > 캐디 명.
     * @param {string} caddie.bookgTime > 예약 시간.
     * @param {string} caddie.cartNo > 카트 번호.
     * @param {string} caddie.lastReceivedTerm > 경과 시간.
     */
    prettyCaddieViewType() {
      return (caddie) => {
        switch (this.caddieViewType) {
          case CADDIE_VIEW_TYPE_BOOKG_TIME:
            return caddie.bookgTime
              ? this.parsedCaddieTime(caddie.bookgTime)
              : this.parsedCaddieName(caddie.caddieName);
          case CADDIE_VIEW_TYPE_CADDIE_NAME:
            return this.parsedCaddieName(caddie.caddieName);
          case CADDIE_VIEW_TYPE_CART_NUMBER:
            return caddie.cartNo
              ? caddie.cartNo
              : this.parsedCaddieName(caddie.caddieName);
          case CADDIE_VIEW_TYPE_PLAY_TIME:
            return caddie.lastReceivedTerm
              ? this.parsedCaddieTime(caddie.lastReceivedTerm)
              : this.parsedCaddieName(caddie.caddieName);
          default:
            return this.parsedCaddieName(caddie.caddieName);
        }
      };
    },

    /**
     * ### 캐디 정보를 표시할 방향을 계산.
     * @param {string} currHoleCd > 5 > 6 > 7 > 8 > 9 > a > b > c > 1
     */
    caddieInfoDirection() {
      return (caddie) => {
        if (caddie) {
          const { currHoleCd } = caddie;
          switch (currHoleCd) {
            case "c":
            case "1":
            case 1:
              return "left";

            default:
              return "right";
          }
        }
      };
    },
    /**
     * ### 캐디 이름을 파싱해서 표현.
     * - 이름의 성 부분 빼고 이름 부분만 표현.
     * @param {string} caddieName > 캐디의 원래 이름.
     */
    parsedCaddieName() {
      return (caddieName) => {
        return caddieName.slice(1);
      };
    },

    /**
     * ### 모바일 모드인지 확인.
     */
    isMobileMode() {
      const componentName = this.$route.name;
      const isMini =
        componentName === "DashboardMobileCommon" ||
        componentName === "DashboardMobileOrderable";
      return isMini;
    },
    /**
     * 그룹핑된 캐디 목록 반환.
     */
    findGroupedCaddiesByGroup() {
      return (group) => {
        return group?.caddies || [];
      };
    },
    /**
     * 그룹핑된 캐디들의 이름을 목록화 하여 반환.
     */
    caddieNamesByGroup() {
      return (group) => {
        const caddies = group?.caddies;
        if (!caddies) {
          return "정보 없음";
        }

        if (caddies.length == 1) {
          // 그룹핑된 캐디 항목 수가 하나인 경우.
          return caddies[0].caddieName;
        } else if (caddies.length > 1) {
          // 그룹핑된 캐디 항목 수가 하나 이상인 경우.
        }
      };
    },
    /**
     * 그룹핑된 캐디 중 첫 번째 항목의 캐디 반환.
     */
    findFirstCaddieByGroup() {
      return (group) => {
        return group?.caddies[0];
      };
    },

    /**
     * ### 플레이어 숫자 반환 여부 확인.
     */
    isValidPlayersCountByGroup() {
      return (group) => {
        const playersCount = this.findFirstCaddiePlayerCountByGroup(group);
        return playersCount === 2 || playersCount === 3;
      };
    },

    /**
     * ### 그룹의 첫 번째 캐디의 플레이어 숫자를 반환.
     */
    findFirstCaddiePlayerCountByGroup() {
      return (group) => {
        try {
          // 그룹의 캐디 리스트 크기가 0이면 null 반환.
          if (!group.caddies.length) return null;

          // 그룹에서 첫 번째 캐디를 가져옴.
          const firstCaddieInGroup = this.findFirstCaddieByGroup(group);

          // 캐디에 배치된 플레이어 숫자.
          return firstCaddieInGroup?.playerNameVOList?.length;
        } catch (e) {
          console.error(e.message);
          return null;
        }
      };
    },

    /**
     * 캐디를 각각의 좌표 위치에 따라 그룹핑.
     */
    caddieGroups() {
      // v1
      // 캐디가 화면 하단 홀에 표시가 된 상태인 경우 필터링.
      const filteredCaddies = this.caddies?.filter((caddie) => {
        return this.roundStatus(caddie);
      });
      const result = []; // ex: [ ]
      // 각각의 캐디 포지션(caddiePositionRate10Per)을 추출.
      const extractedPositions = filteredCaddies.map(
        (caddie) => caddie.caddiePositionRate10Per
      ); // ex: [1, 2, 10]
      const uniquePositions = [...new Set(extractedPositions)];

      if (uniquePositions.length) {
        uniquePositions.forEach((position) => {
          // ex: caddies: [Caddie]
          const caddies = filteredCaddies.filter(
            (caddie) => caddie.caddiePositionRate10Per === position
          );

          const caddiesWithPosition = {
            position,
            caddies,
          };

          result.push(caddiesWithPosition); // ex: [ { position: Int, caddies: [Caddie] } ]
        });
      }

      return result;
    },

    /**
     * 캐디가 현재 후반 라운드 진행 중인지 확인.
     */
    isSecondRound() {
      return (caddie) => {
        return caddie.currCourseCd === caddie.secondCourseCd;
      };
    },

    /**
     * 현재 캐디가 탐색되었는 지 확인.
     * - 캐디 검색 시.
     */
    isSearched() {
      return (caddieName) => {
        return this.currentLookUpCaddies.some(
          (caddie) => caddie.caddieName === caddieName
        );
      };
    },

    /**
     * 현재 캐디가 선택되어 있는지 확인.
     * - 다중 선택 모드일 경우.
     */
    isSelected() {
      return (caddie) => {
        const isGroupSelected =
          caddie.groupCd === this.currentLookUpGroup?.groupCd;

        const foundCaddies = this.currentSelectedCaddies.filter(
          (c) => c.caddieUniqNo === caddie.caddieUniqNo
        );

        return isGroupSelected || foundCaddies.length;
      };
    },

    /**
     * 캐디 예약 시간
     * - 구문 분석 후 포맷 변경하여 반환.
     * - 캐디 텍스트를 시간으로 보는 경우.
     */
    parsedCaddieTime() {
      return (bookgTime) => {
        const pos = String(bookgTime).lastIndexOf(":");
        return bookgTime.substring(0, pos);
      };
    },

    /**
     * 캐디 라운드 상태.
     * - true : 아이콘 보이도록 설정.
     * - false : 아이콘 안보이도록 설정.
     * - 조건 필터의 순서는 중요합니다.
     */
    roundStatus() {
      return (caddie) => {
        // v2
        return caddie.playStep == 0;

        // v1
        // 캐디가 현재 플레이 중이라면 표시.
        const isPlaying = caddie.startTeeYn === "N";
        if (isPlaying) return true;

        // 대기중이지만, 첫 번째 홀(전/후반)이 아니면 표시.
        const isNotFirstHole = caddie.currHoleIndex != 1;
        const isNotSecondHole = caddie.currHoleIndex != 10;
        if (isNotFirstHole && isNotSecondHole) {
          return true;
        }

        return false;
      };
    },

    /**
     * 캐디 아이콘을 설정함.
     * 조건 1: 첫/막팀 이 설정된 경우.
     * 조건 2: 단체가 설정된 경우.
     * 조건 3: 아무 조건에도 해당되지 않는 경우.
     */
    caddieIcon() {
      return (caddie) => {
        // 첫/막팀이 설정된 경우 우선적으로 아이콘 설정.
        if (caddie.mark1 && caddie.mark1 != 0) {
          return require(`@/assets/images/control/dashboard/state_${
            caddie.mark1 == 1 ? "first" : "last"
          }.png`);
        }

        // 캐디가 단체가 존재하는 경우.
        if (caddie.groupCd) {
          const foundGroup = this.currentGroups.find(
            (group) => group.groupCd === caddie.groupCd
          );
          // 캐디가 단체가 존재하고, 현재 단체들 중 하나와 일치하는 경우.
          if (foundGroup) {
            // 아이콘을 해당 색상에 맞게 설정함.
            return require(`@/assets/images/control/dashboard/state_team${foundGroup.groupColor}.png`);
          }
        }

        // 이도 저도 아닌 경우 걍 일반 아이콘으로 설정함.
        return require("@/assets/images/control/dashboard/state_people.png");
      };
    },

    ...mapGetters("control/", {
      // groups
      getGroupColorByCode: "getGroupColorByCode",
      currentLookUpGroup: "currentLookUpGroup",
      currentGroups: "getCurrentGroups",
      // caddies
      caddieViewType: "currentCaddieViewType",
      currentLookUpCaddies: "getLookUpCaddies",
      currentSelectedCaddies: "getSelectedCaddies",
      currentSelectedCaddie: "getSelectedCaddie",
      currentSelectedCaddieByChip: "getSelectedCaddieByChip",
      // others
      isMultiSelectMode: "getIsMultiSelectMode",
    }),

    isPositionFirst() {
      return (position) => {
        return position == 0;
      };
    },
    isPositionSecond() {
      return (position) => {
        return position == 1;
      };
    },
    isPositionThird() {
      return (position) => {
        return position == 2;
      };
    },
    isPositionFourth() {
      return (position) => {
        return position == 3;
      };
    },
    isPositionFifth() {
      return (position) => {
        return position == 4;
      };
    },
    isPositionSixth() {
      return (position) => {
        return position == 5;
      };
    },
    isPositionSeventh() {
      return (position) => {
        return position == 6;
      };
    },
    isPositionEighth() {
      return (position) => {
        return position == 7;
      };
    },
    isPositionNinth() {
      return (position) => {
        return position == 8;
      };
    },
    isPositionTenth() {
      return (position) => {
        return position == 9 || position == 10;
      };
    },
  },
  filters: {
    /**
     * ### 파싱된 예약시간.
     * @param {string} value > 'hh:mm:ss' 형식의 데이터.
     * @returns {string} 'hh:mm' 형식의 데이터.
     */
    filteredBookgTime(value) {
      const removeColon = value.replaceAll(":", "");
      const parsedTime = TimeUtil.parse(removeColon);
      const hours = String(parsedTime.getHours()).padStart(2, "0");
      const minutes = String(parsedTime.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.new_caddie_icon__container {
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.new_caddie_icon__container .caddie__wrapper {
  position: absolute;
  top: -20px;
  z-index: -100;
}

.new_caddie_icon__container .caddie {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.caddie_icon__wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.caddie_icon__wrapper:hover {
  transform: scale(1.1);
}
.new_caddie_icon__container .caddie .caddie_icon {
  width: 28px;
  height: 28px;
}
.new_caddie_icon__container .player_count {
  position: absolute;
  color: var(--dark);
  font-size: 0.7rem;
  font-weight: 600;
  top: 6px;
  z-index: 2;
}

.new_caddie_icon__container .caddie_names__container {
  position: absolute;
  white-space: nowrap;
  top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.new_caddie_icon__container .caddie_name__box {
  transform: translateY(-10px);
}
.new_caddie_icon__container .caddie .caddie_name {
  display: inline-block;
  width: 100%;
  font-size: 0.7rem;
  transition: all 0.3s ease;
  text-align: center;
}
.new_caddie_icon__container .caddie .caddie_name:hover {
  color: gold;
}

/* others start */
.selected {
  color: gold;
}
/* others end */

/* media start */
/* laptops */
@media screen and (min-width: 720px) {
  .new_caddie_icon__container .caddie .caddie_icon {
    width: 29px;
    height: 29px;
  }
  .new_caddie_icon__container .player_count {
    font-size: 0.8rem;
  }
  .new_caddie_icon__container .caddie_name__box {
    transform: translateY(-8px);
  }
  .new_caddie_icon__container .caddie .caddie_name {
    font-size: 0.75rem;
  }
}
/* laptops */
@media screen and (min-width: 900px) {
  .new_caddie_icon__container .caddie .caddie_icon {
    width: 32px;
    height: 32px;
  }
  .new_caddie_icon__container .player_count {
    font-size: 0.8rem;
  }
  .new_caddie_icon__container .caddie_name__box {
    transform: translateY(-6px);
  }
  .new_caddie_icon__container .caddie .caddie_name {
    font-size: 0.8rem;
  }
}
/* desktop */
@media screen and (min-width: 1080px) {
  .new_caddie_icon__container .caddie .caddie_icon {
    width: 33px;
    height: 33px;
  }
  .new_caddie_icon__container .player_count {
    font-size: 0.85rem;
  }
  .new_caddie_icon__container .caddie_name__box {
    transform: translateY(-3px);
  }
  .new_caddie_icon__container .caddie .caddie_name {
    font-size: 0.8rem;
  }
}
/* desktop large */
@media screen and (min-width: 1920px) {
  .new_caddie_icon__container .caddie__wrapper {
    top: -25px;
  }
  .new_caddie_icon__container .caddie .caddie_icon {
    width: 45px;
    height: 45px;
  }
  .new_caddie_icon__container .player_count {
    font-size: 1.2rem;
  }
  .new_caddie_icon__container .caddie_name__box {
    transform: translateY(10px);
  }
  .new_caddie_icon__container .caddie .caddie_name {
    font-size: 1.2rem;
  }
}
/* media end */
</style>
