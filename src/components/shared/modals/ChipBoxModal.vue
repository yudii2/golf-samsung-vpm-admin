<template>
  <div class="backdrop" @click.self="handleCloseClick">
    <main id="chip_box__container">
      <CloseButton @onClose="handleCloseClick" />

      <header>
        <h2>{{ chipBoxTitle }}</h2>
      </header>

      <section class="chips__container mt" v-if="chips.length">
        <Chip
          v-for="chip in chips"
          :key="chip.index"
          :content="chip.title"
          @onClick="handleClickChip"
          ref="chipRef"
        />
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CloseButton from "@/components/shared/CloseButton.vue";
import Chip from "@/components/shared/Chip.vue";

export default {
  name: "ChipBox",

  components: {
    CloseButton,
    Chip,
  },

  data() {
    return {
      chips: [],
    };
  },

  computed: {
    ...mapGetters("control/", {
      findCaddieByCaddieName: "findCaddieByCaddieName",
    }),
    ...mapGetters({
      currentChipBoxItems: "getChipBoxItems",
      chipBoxTitle: "getChipBoxTitle",
      chipBoxItemClickable: "getChipBoxItemClickable",
      chipBoxFrom: "getChipBoxFrom",
    }),
  },

  methods: {
    init() {
      this.initOptions();
    },

    initOptions() {
      this.checkFrom();
    },

    async handleClickChip(title) {
      if (!this.chipBoxItemClickable) return;

      switch (this.chipBoxFrom) {
        case "NewCaddieIcon":
          const foundChip = this.chips.find((chip) => chip.title === title);
          if (foundChip) {
            const foundCaddie = this.findCaddieByCaddieName(foundChip.title);

            // 캐디 선택 (await 필수).
            await this.setCaddieByChip(foundCaddie);

            // 모달 종료.
            this.handleCloseClick();
          }
          break;

        case "PlayDone":
          const foundChip_ = this.chips.find((chip) => chip.title === title);
          if (foundChip_) {
            const foundCaddie = this.findCaddieByCaddieName(foundChip_.title);

            // 메시지 보내기를 위해 캐디 선택.
            this.setIsShowingMessengerSendModal(true);
            this.selectCaddie(foundCaddie);

            // 모달 종료.
            this.handleCloseClick();
          }

          break;
      }
    },

    clearStore() {
      this.setCaddieByChip();
      // 이전 컴포넌트 정보 지움.
      this.setChipBoxFrom();
      // 클릭 기능 끔.
      this.setChipBoxClickable(false);
      // clear hover caddie
      this.caddieInfoModalPowerOff();
    },

    makeChips() {
      this.currentChipBoxItems.forEach((chip) =>
        // this.chips.push(new ChipType(chip.index, chip.title))
        this.chips.push({
          index: chip.index,
          title: chip.title,
        })
      );
    },

    handleCloseClick() {
      this.updateIsShowingChipBoxModal(false);
    },

    // ######################## PlayDone Start ########################
    // From 컴포넌트가 PlayDone 일 경우에만 해당하는 메소드 목록.
    checkFrom() {
      this.$nextTick(() => {
        switch (this.chipBoxFrom) {
          case "PlayDone":
            this.addCaddieInfoMouseOverEvent();
            break;
        }
      });
    },

    /**
     * ### From 컴포넌트가 PlayDone 일 경우 캐디 정보 모달 이벤트 설정.
     */
    addCaddieInfoMouseOverEvent() {
      this.$refs.chipRef.forEach((chip) => {
        const element = chip.$el;
        element.addEventListener(
          "mouseover",
          this.handleCaddieNameMouseOver,
          true
        );
        element.addEventListener(
          "mouseleave",
          this.handleCaddieNameMouseLeave,
          true
        );
      });
    },

    /**
     * ### From 컴포넌트가 PlayDone 일 경우 캐디 정보 모달 이벤트 해제.
     */
    removeCaddieInfoMouseOverEvent() {
      this.$refs.chipRef.forEach((chip) => {
        const element = chip.$el;
        element.removeEventListener(
          "mouseover",
          this.handleCaddieNameMouseOver,
          true
        );
        element.removeEventListener(
          "mouseleave",
          this.handleCaddieNameMouseLeave,
          true
        );
      });
    },

    /**
     * ### 캐디 이름위에 마우스가 떠있으면 캐디 정보 모달 창 킴.
     */
    handleCaddieNameMouseOver(e) {
      // 캐디 정보 찾기.
      const caddieName = e.target.innerText;
      const foundCaddie = this.findCaddieByCaddieName(caddieName);
      // 캐디 정보 모달 창 킴.
      this.caddieInfoModalPowerOn(foundCaddie);
    },

    /**
     * ### 캐디 이름에서 마우스가 떠나면 캐디 정보 모달 창 끔.
     */
    handleCaddieNameMouseLeave() {
      // 캐디 정보 모달 창 끔.
      this.caddieInfoModalPowerOff();
    },

    /**
     * ### 실제 캐디 정보 모달창 파워 온 로직 실행하는 메소드.
     */
    caddieInfoModalPowerOn(caddie) {
      this.setIsShowingPlayingCaddieInfoModal(true); // 모달창 킴.
      this.setHoveredCaddie(caddie); // 모달창에 띄울 캐디 정보 설정.
    },

    /**
     * ### 실제 캐디 정보 모달창 파워 오프 로직 실행하는 메소드.
     */
    caddieInfoModalPowerOff() {
      this.setIsShowingPlayingCaddieInfoModal(false); // 모달창 끔.
      this.setHoveredCaddie(); // 모달창에 띄울 캐디 정보 해제.
    },
    // ######################## PlayDone End ########################

    ...mapActions("control/", {
      setCaddieByChip: "updateCaddieByChip",
      setHoveredCaddie: "updateHoveredCaddie",
      selectCaddie: "addSelectedCaddie",
    }),
    ...mapActions({
      updateIsShowingChipBoxModal: "updateIsShowingChipBoxModal",
      setChipBoxClickable: "updateChipBoxClickable",
      setChipBoxFrom: "updateChipBoxFrom",
      setIsShowingPlayingCaddieInfoModal:
        "updateIsShowingPlayingCaddieInfoModal",
      setIsShowingMessengerSendModal: "updateIsShowingMessengerSendModal",
    }),
  },

  mounted() {
    this.makeChips();
    this.init();
  },

  beforeDestroy() {
    // clear events
    this.removeCaddieInfoMouseOverEvent();
  },

  destroyed() {
    this.clearStore();
  },
};
</script>

<style scoped>
#chip_box__container {
  position: absolute;
  max-width: 500px;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 15px;
  border: 2px solid var(--primary);
  border-radius: 10px;
  background-color: var(--dark);
}

/* chips start */
#chip_box__container .chips__container {
}
/* chips end */
</style>
