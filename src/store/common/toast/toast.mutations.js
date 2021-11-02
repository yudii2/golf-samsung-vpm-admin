export default {
  TOAST(state, { title, message }) {
    state.toast = {
      title,
      message,
    };
    state.toastIsShowing = true;
  },
  CLEAR_TOAST(state) {
    state.toast = {
      title: "",
      message: "",
      element: null,
      animation: null,
    };
    state.toastIsShowing = false;
  },
  /**
   * Element.
   * 1. Set element information.
   * 2. Clear element information.
   */
  UPDATE_TOAST_ELEMENT(state, toastElement) {
    state.toast.element = toastElement;
  },
  CLEAR_TOAST_ELEMENT(state) {
    state.toast.element = null;
  },
  /**
   * Fold.
   * 1. Fold method.
   * 2. Un-fold method.
   */
  FOLD_TOAST(state) {
    const toast = state.toast.element;
    if (toast) toast.style.right = "-290px";
  },
  UNFOLD_TOAST(state) {
    const toast = state.toast.element;
    if (toast) toast.style.right = "20px";
  },
  /**
   * Animations.
   * 1. Add method.
   * 2. Clear method.
   */
  ADD_TOAST_ANIMATION(state, animationName) {
    state.toast = {
      ...state.toast,
      animation: animationName,
    };
  },
  CLEAR_TOAST_ANIMATION(state) {
    state.toast = {
      ...state.toast,
      animation: null,
    };
  },
};
