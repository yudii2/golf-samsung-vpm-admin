import store from "@/store";

/**
 * Resize 이벤트 관련 로직 담당.
 */
export const windowManager = () => {
  let isMiniModeTimer;
  /**
   * ### 현재 브라우저 화면(풀화면/축소형) 상태 구분 후 업데이트.
   * - Resize 이벤트가 종료되면 해당 로직 진행.
   */
  const checkIsMiniModeWithTimer = () => {
    if (isMiniModeTimer) clearTimeout(isMiniModeTimer);

    isMiniModeTimer = setTimeout(() => {
      const { innerWidth: width, innerHeight: height } = window;

      const isMiniModeWidth = width >= 1080 && width < 1920;
      const isMiniModeHeight = height >= 720 && height < 1080;

      isMiniModeWidth && isMiniModeHeight
        ? store.dispatch("control/updateIsMiniModeStatus", true)
        : store.dispatch("control/updateIsMiniModeStatus", false);
    }, 100);
  };

  let clearCaddieTimer;
  /**
   * ### 캐디 스토어 데이터 초기화.
   * - Resize 이벤트가 종료되면 해당 로직 실행.
   */
  const clearCurrentSelectedCaddieWithTimer = () => {
    if (clearCaddieTimer) clearTimeout(clearCaddieTimer);

    clearCaddieTimer = setTimeout(() => {
      store.dispatch("control/clearSelectedCaddie");
    }, 100);
  };

  return {
    checkIsMiniModeWithTimer,
    clearCurrentSelectedCaddieWithTimer,
  };
};
