export default {
  /**
   * ### 우측 상단 토스트 메시지를 띄움.
   * @param {string} title > 토스트 상단 헤더 부분에 보일 텍스트.
   * @param {string} message > 토스트 본문 부분에 보일 텍스트.
   */
  toast(
    { commit },
    { title, message, duration = 3000, autoClear = true, animation = null }
  ) {
    commit("TOAST", { title, message, animation });

    if (autoClear) {
      setTimeout(() => {
        commit("CLEAR_TOAST");
      }, duration);
    }
  },
  /**
   * ### Toast.vue 컴포넌트의 엘리먼트를 toast state 에 업데이트.
   * @param {Element} toastElement > Toast.vue 컴포넌트의 엘리먼트.
   */
  updateToastElement({ commit }, toastElement) {
    toastElement
      ? commit("UPDATE_TOAST_ELEMENT", toastElement)
      : commit("CLEAR_TOAST_ELEMENT");
  },
  /**
   * ### 현재 띄워져 있는 토스트를 숨김.
   */
  clearToast({ commit }) {
    commit("CLEAR_TOAST");
  },
  /**
   * ### 서비스 준비중인 경우 사용하는 토스트 메시지.
   * - 메시지 하나하나 타이핑 하기 귀찮아서 그냥 만들어 둔 메소드.
   * @param {string} title > 토스트 상단 헤더 부분에 보일 텍스트.
   */
  toastPreparing({ dispatch }, { title = "Title" }) {
    dispatch("toast", { title, message: "서비스 준비중입니다." });
  },
  /**
   * ### 토스트 메시지 잠깐 옆으로 밀어 접기.
   */
  foldToast({ commit }, status) {
    status ? commit("FOLD_TOAST") : commit("UNFOLD_TOAST");
  },
  updateToastAnimation({ commit }, animationName) {
    animationName
      ? commit("ADD_TOAST_ANIMATION", animationName)
      : commit("CLEAR_TOAST_ANIMATION");
  },
};
