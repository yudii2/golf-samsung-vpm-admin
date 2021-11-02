/**
 * 정수인지 확인한다.
 * @param value {number}
 * @returns {boolean}
 */
export function isInteger(value) {
  if (typeof value !== "number") {
    return false;
  }

  if (!(`${value}`.indexOf(".") < 0)) {
    return false;
  }

  return true;
}

/**
 * 천원 단위로 콤마
 * @param value
 * @returns {string}
 */
export function numberWithCommas(value = "") {
  const number = Number(`${value}`.replace(/,/gi, ""));

  if (!value || isNaN(number) || number === 0) {
    return "0";
  }

  const direction = number < 0 ? "-" : "";
  return `${direction}${Math.abs(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
