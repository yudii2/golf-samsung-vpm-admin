const useCopy = () => {
  /**
   * ### 클립보드에 텍스트 복사.
   * @param {string} text > 복사 당할 텍스트.
   */
  const clipboard = (text) => {
    if (!text) return;

    let mutableText = text.replaceAll('"', "");
    const input = document.createElement("textarea");
    input.value = mutableText;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  };

  const objectCopier = (object) => {
    return JSON.parse(JSON.stringify(object));
  };
  return {clipboard, objectCopier};
};

export default useCopy;
