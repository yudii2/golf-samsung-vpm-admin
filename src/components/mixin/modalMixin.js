export default {
  methods: {
    openAlertModal(content) {
      return new Promise((resolve) => {
        this.$EventBus.$emit("openAlert", content, resolve);
      });
    },
    openConfirmModal(content) {
      return new Promise((resolve) => {
        this.$EventBus.$emit("openConfirm", content, resolve);
      });
    },
    openRealCancelModal(info) {
      return new Promise((resolve) => {
        this.$EventBus.$emit("openRealCancel", info, resolve);
      });
    },
    openWaitCancelModal(info) {
      return new Promise((resolve) => {
        this.$EventBus.$emit("openWaitCancel", info, resolve);
      });
    },
    openWeekendCancelModal(info) {
      return new Promise((resolve) => {
        this.$EventBus.$emit("openWeekendCancel", info, resolve);
      });
    },
  },
};
