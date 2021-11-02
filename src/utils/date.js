import moment from "moment";
import { isInteger } from "@/utils/number";

moment.locale("ko");

export const DATE_FORMAT_YYYY_MM_DD = "YYYY-MM-DD";
export const DATE_FORMAT_YYYY_MM = "YYYY-MM";
export const DATE_FORMAT_YYYY_M = "YYYY-M";
export const DATE_FORMAT_YYYY = "YYYY";
export const DATE_FORMAT_M = "M";

// eslint-disable-next-line no-unused-vars
const baseDayOfWeekCaptionData = ["일", "월", "화", "수", "목", "금", "토"];

export function getTodayDate() {
  const momentObj = moment();
  return momentObj.format("YYYY-MM-DD");
}

export function getTodayDateTime() {
  const momentObj = moment();
  return momentObj.format("YYYY-MM-DD HH:mm:ss");
}

export function getFormattedDate(date, format = "YYYY-MM-DD") {
  if (date) {
    const momentObj = moment(date);
    return momentObj.format(format);
  } else {
    return null;
  }
}

// 특정 날짜의 다음 날짜를 가져옴
export function getDateOfNext(date) {
  const momentObj = moment(date);

  momentObj.add("day", 1).calendar();

  return momentObj.format("YYYY-MM-DD");
}

// 특정 날짜의 이전 날짜를 가져옴
export function getDateOfPrevious(date) {
  const momentObj = moment(date);

  momentObj.add("day", -1).calendar();

  return momentObj.format("YYYY-MM-DD");
}

/**
 * 해당 년월의 마지막 일 수를 구한다.
 * @param year {number}
 * @param month {number}
 * @returns {number}
 */
export function getEndOfMonth(year, month) {
  if (!validateYear(year)) {
    throw new Error(`Invalid year value. input: ${year}`);
  }

  if (!validateMonth(month)) {
    throw new Error(`Invalid month value. input: ${month}`);
  }

  const yearNumberPad = `${year}`.padStart(4, "0");
  const monthNumberPad = `${month}`.padStart(2, "0");

  return moment(`${yearNumberPad}-${monthNumberPad}-01`, "YYYY-MM-DD")
    .endOf("month")
    .get("date");
}

/**
 * 유효한 년도인지 확인한다.
 * @param year {number}
 * @returns {boolean}
 */
export function validateYear(year) {
  if (!isInteger(year)) {
    return false;
  }

  return 1 <= year && year <= 9999;
}

/**
 * 유효한 월인지 확인한다.
 * @param month {number}
 * @returns {boolean}
 */
export function validateMonth(month) {
  if (!isInteger(month)) {
    return false;
  }

  return 1 <= month && month <= 12;
}

/**
 * 유효한 일자인지 확인한다.
 * @param date {number}
 * @param currentYear {number}
 * @param currentMonth {number}
 * @returns {boolean}
 */
export function validateDate(date, currentYear, currentMonth) {
  if (!isInteger(date)) {
    return false;
  }

  if (!validateYear(currentYear) || !validateMonth(currentMonth)) {
    return false;
  }

  return 1 <= date && date <= getEndOfMonth(currentYear, currentMonth);
}

/**
 * 날짜 비교
 * @param d1 {Date}
 * @param d2 {Date}
 * @returns {number}
 */
export function compareDate(d1, d2) {
  const d1Moment = moment(d1);
  const d2Moment = moment(d2);

  const d1Year = d1Moment.get("year");
  const d2Year = d2Moment.get("year");
  if (d1Year !== d2Year) {
    return d1Year - d2Year < 0 ? -1 : 1;
  }

  const d1month = d1Moment.get("month");
  const d2month = d2Moment.get("month");
  if (d1month !== d2month) {
    return d1month - d2month < 0 ? -1 : 1;
  }

  const d1date = d1Moment.get("date");
  const d2date = d2Moment.get("date");
  if (d1date !== d2date) {
    return d1date - d2date < 0 ? -1 : 1;
  }

  return 0;
}

/**
 * DateTimePicker에서 키보드 방향키로 이동 시 현재 선택한 날짜 정보를 가져온다
 * @param datePickerInstance ejs-datepicker의 ej2instance
 * @returns {moment.Moment} 현재 선택한 날짜. moment 객체로 생성하여 return
 */
export function getCurrentSelectedDateMomentInDateTimePicker(
  datePickerInstance
) {
  let currentElement = datePickerInstance.popupObj.element.querySelector(
    ".e-focused-date"
  );
  if (!currentElement) {
    currentElement = datePickerInstance.popupObj.element.querySelector(
      ".e-selected"
    );
  }
  const focusedDate = new Date(parseInt(currentElement.getAttribute("id"), 10));
  return moment(focusedDate);
}

/**
 * DatePicker의 각 날짜를 표시하는 span 태그에 ID를 붙임
 * ID 형식 : D[YYYY-MM-DD] ex) D2020-07-30
 * @param date renderDayCell 이벤트의 파라미터로 넘어오는, 현재 그리고 있는 cell의 날짜. ex) "2020-07-30"
 * @param spanElement 현재 그리고 있는 cell의 span element
 */
export function setIdInDatePickerSpan(date, spanElement) {
  spanElement.setAttribute("id", "D" + date);
}

/**
 * DatePicker, DateRangePicker의 rendreCell 이벤트에서, 각 날짜의 영업구분(주중/주말/휴장)에 따른 css class를 설정하여 날짜 색깔을 설정함
 * @param date renderDayCell 이벤트에서 넘어오는 날짜
 * @param tdElement 현재 그리고 있는 cell의 td element
 * @param calendarListMap 로딩한 calender 값을 가지고 있는 map
 */
export function setDateElementCssClassOnRenderCell(
  date,
  tdElement,
  calendarListMap
) {
  const dateYYYYM = new moment(date).format(DATE_FORMAT_YYYY_M);
  const dateYYYYMMDD = moment(date).format(DATE_FORMAT_YYYY_MM_DD);
  const currentCalendarListStr = calendarListMap.get(dateYYYYM);
  if (currentCalendarListStr) {
    const currentCalendarList = JSON.parse(currentCalendarListStr);
    const calendarInfoOfDayArray = currentCalendarList.filter(
      (day) => day.bsnDate === dateYYYYMMDD
    );
    if (calendarInfoOfDayArray.length === 1) {
      const bsnCode = calendarInfoOfDayArray[0].bsnCode;
      if (bsnCode === "CLOSE") {
        tdElement.classList.add("dev-calendar-close"); // 휴장(연한 회색)
      } else if (bsnCode === "WEEKEND") {
        const dayOfWeek = moment(date).day();
        if (dayOfWeek === 6) {
          tdElement.classList.add("dev-calendar-weekend-saturday"); // 주말 토요일(파랑)
        } else {
          tdElement.classList.add("dev-calendar-weekend-not-saturday"); // 토요일이 아닌 주말(빨강)
        }
      }
    }
  }
}
