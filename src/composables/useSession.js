const useSession = () => {
  /**
   * ### 세션 스토리지에 Key & Value 저장.
   * @param {String} key > 저장할 키.
   * @param {*} value > 저장할 값.
   * @param {Boolean} override > 덮어쓰기 여부.
   */
  const writeItemByKeyValue = (key, value, override) => {
    if (override) {
      sessionStorage.setItem(key, value);
    } else {
      const item = sessionStorage.getItem(key);
      // 값이 존재하지 않으면 저장, 존재하면 아무것도 안함.
      if (!item) sessionStorage.setItem(key, value);
    }
  };

  const readItemByKey = (key) => sessionStorage.getItem(key);

  return {
    writeItemByKeyValue,
    readItemByKey,
  };
};

export default useSession;
