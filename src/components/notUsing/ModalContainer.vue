<template>
  <article class="template-modal">
    <AlertModal />
    <ConfirmModal />
    <RealCancelModal />
    <WaitCancelModal />
    <WeekendCancelModal />
  </article>
</template>

<script>
import AlertModal from "./modal/AlertModal";
import ConfirmModal from "./modal/ConfirmModal";
import RealCancelModal from "./modal/RealCancelModal";
import WaitCancelModal from "./modal/WaitCancelModal";
import WeekendCancelModal from "./modal/WeekendCancelModal";

export default {
  name: "Modal",
  components: {
    AlertModal,
    ConfirmModal,
    RealCancelModal,
    WaitCancelModal,
    WeekendCancelModal,
  },
  // mounted() {
  //   this.$on('onModal', (modalNm) => {
  //     this[modalNm] = true;
  //   });
  //   this.$on('offModal', (modalNm) => {
  //     this[modalNm] = false;
  //   });
  // },
  // beforeDestroy() {
  //   this.$off('onModal');
  //   this.$off('offModal');
  // },
  // data() {
  //   return {
  //     onAlert: false,
  //     onConfirm: false,
  //     onRealCancel: false,
  //     onWaitCancel: false,
  //     onWeekendCancel: false,
  //   };
  // },
};
</script>
