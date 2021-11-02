import { isInteger } from "@/utils/number";
import moment from "moment";

export const TIME_FORMAT_hh_mm_ss = "HH:mm:ss";
export const TIME_FORMAT_hh_mm = "HH:mm";

/**
 * 유효한 시인지 확인한다.
 * @param hours {number}
 * @returns {boolean}
 */
export function validateHours(hours) {
  if (!isInteger(hours)) {
    return false;
  }

  return 0 <= hours && hours < 24;
}

/**
 * 유효한 분인지 확인한다.
 * @param minutes {number}
 * @returns {boolean}
 */
export function validateMinute(minutes) {
  if (!isInteger(minutes)) {
    return false;
  }

  return 0 <= minutes && minutes < 60;
}

/**
 * 유효한 초인지 확인한다.
 * @param seconds {number}
 * @returns {boolean}
 */
export function validateSeconds(seconds) {
  if (!isInteger(seconds)) {
    return false;
  }

  return 0 <= seconds && seconds < 60;
}

/**
 * 시간 비교
 * @param t1 {Date}
 * @param t2 {Date}
 * @returns {number}
 */
export function compareTime(t1, t2) {
  const t1Moment = moment(t1);
  const t2Moment = moment(t2);

  const t1hour = t1Moment.get("hour");
  const t2hour = t2Moment.get("hour");
  if (t1hour !== t2hour) {
    return t1hour - t2hour < 0 ? -1 : 1;
  }

  const t1minute = t1Moment.get("minute");
  const t2minute = t2Moment.get("minute");
  if (t1minute !== t2minute) {
    return t1minute - t2minute < 0 ? -1 : 1;
  }

  const t1second = t1Moment.get("second");
  const t2second = t2Moment.get("second");
  if (t1second !== t2second) {
    return t1second - t2second < 0 ? -1 : 1;
  }

  return 0;
}
