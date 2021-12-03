import moment from "moment";
import {
  DATE_FORMAT_YYYY,
  DATE_FORMAT_YYYY_MM,
  DATE_FORMAT_YYYY_MM_DD,
  validateDate,
  validateMonth,
  validateYear,
} from "@/utils/date";
import {
  TIME_FORMAT_hh_mm,
  TIME_FORMAT_hh_mm_ss,
  validateHours,
  validateMinute,
  validateSeconds,
} from "@/utils/time";

// 아이폰에서 화면 안떠서 일단 주석 해봣음.
// const emailRegExp = new RegExp("^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$");
// const mobilePhoneRegExp = new RegExp("^((01[016789])([0-9]{3,4})([0-9]{4})|)$");

export function isDate(string) {
  return string?.length === 10 && isDateFormatString(string);
}

/**
 * YYYY, YYYY-MM, YYYY-MM-DD 포멧의 날짜 형식에 맞는 문자열인지 검사한다.
 * @param string {string}
 * @returns {boolean}
 */
export function isDateFormatString(string) {
  // deny not string
  if (typeof string !== "string") {
    return false;
  }

  // [start to check hyphen]
  const split = string.split("-");

  // allows split.length is 1 or 2 or 3
  if (split.length !== 1 && split.length !== 2 && split.length !== 3) {
    return false;
  }

  // check year, month, date
  if (
    0 < split.length &&
    (split[0].length !== 4 ||
      isNaN(Number(split[0])) ||
      !validateYear(Number(split[0])))
  ) {
    // year
    return false;
  }

  if (
    1 < split.length &&
    (split[1].length !== 2 ||
      isNaN(Number(split[1])) ||
      !validateMonth(Number(split[1])))
  ) {
    // month
    return false;
  }
  if (
    2 < split.length &&
    (split[2].length !== 2 ||
      isNaN(Number(split[2])) ||
      !validateDate(Number(split[2]), Number(split[0]), Number(split[1])))
  ) {
    // date
    return false;
  }

  switch (split.length) {
    case 1:
      return moment(string, DATE_FORMAT_YYYY).isValid();
    case 2:
      return moment(string, DATE_FORMAT_YYYY_MM).isValid();
    case 3:
      return moment(string, DATE_FORMAT_YYYY_MM_DD).isValid();
  }

  return false;
}

/**
 * hh:mm, hh:mm:ss 포멧의 시간 형식에 맞는 문자열인지 검사한다.
 * @param string {string}
 * @returns {boolean}
 */
export function isTimeFormatString(string) {
  // deny not string
  if (typeof string !== "string") {
    return false;
  }

  // [start to check hyphen]
  const split = string.split(":");

  // allows split.length is 1 or 2 or 3
  if (split.length !== 2 && split.length !== 3) {
    return false;
  }

  // check year, month, date
  if (
    0 < split.length &&
    (split[0].length !== 2 ||
      isNaN(Number(split[0])) ||
      !validateHours(Number(split[0])))
  ) {
    // hours
    return false;
  }

  if (
    1 < split.length &&
    (split[1].length !== 2 ||
      isNaN(Number(split[1])) ||
      !validateMinute(Number(split[1])))
  ) {
    // minutes
    return false;
  }
  if (
    2 < split.length &&
    (split[2].length !== 2 ||
      isNaN(Number(split[2])) ||
      !validateSeconds(Number(split[2])))
  ) {
    // seconds
    return false;
  }

  switch (split.length) {
    case 2:
      return moment(string, TIME_FORMAT_hh_mm).isValid();
    case 3:
      return moment(string, TIME_FORMAT_hh_mm_ss).isValid();
  }

  return false;
}

/**
 * - 가 없는 핸드폰 번호를 - 가 있는 핸드폰 번호로 변환
 * 예) 기존 : 01055554444
 *    변경 : 010-5555-4444
 * @param {string} phoneNumber
 * @returns {string}
 */
export function getFormattedPhoneNumber(phoneNumber) {
  if (phoneNumber) {
    if (phoneNumber.length > 3 && phoneNumber.length < 8) {
      phoneNumber =
        phoneNumber.substring(0, 3) + "-" + phoneNumber.substring(3);
    } else if (phoneNumber.length >= 8) {
      if (phoneNumber.length === 10) {
        phoneNumber =
          phoneNumber.substring(0, 3) +
          "-" +
          phoneNumber.substring(3, 6) +
          "-" +
          phoneNumber.substring(6);
      } else {
        phoneNumber =
          phoneNumber.substring(0, 3) +
          "-" +
          phoneNumber.substring(3, 7) +
          "-" +
          phoneNumber.substring(7);
      }
    }
  } else {
    phoneNumber = "";
  }
  return phoneNumber;
}

/**
 * - 가 없는 전화번호를 - 가 있는 전화번호로 변환
 * 예) 기존 : 021234567
 *    변경 : 02-123-4567
 * @param {string} telNumber 전화번호
 * @param {string} firstFormat 지역번호 다음 포맷
 * @return {string}
 */
export function getFormattedTelNumber(telNumber, firstFormat = "-") {
  if (telNumber) {
    if (telNumber.length > 3 && telNumber.length < 9) {
      if (telNumber.length === 7) {
        telNumber = telNumber.substring(0, 3) + "-" + telNumber.substring(3);
      } else {
        telNumber = telNumber.substring(0, 4) + "-" + telNumber.substring(4);
      }
    } else {
      if (telNumber.substring(0, 2) === "02") {
        if (telNumber.length === 9) {
          telNumber =
            telNumber.substring(0, 2) +
            firstFormat +
            telNumber.substring(2, 5) +
            "-" +
            telNumber.substring(5);
        } else {
          telNumber =
            telNumber.substring(0, 2) +
            firstFormat +
            telNumber.substring(2, 6) +
            "-" +
            telNumber.substring(6);
        }
      } else {
        if (telNumber.length === 10) {
          telNumber =
            telNumber.substring(0, 3) +
            firstFormat +
            telNumber.substring(3, 6) +
            "-" +
            telNumber.substring(6);
        } else {
          telNumber =
            telNumber.substring(0, 3) +
            firstFormat +
            telNumber.substring(3, 7) +
            "-" +
            telNumber.substring(7);
        }
      }
    }
  } else {
    telNumber = "";
  }

  return telNumber;
}

/**
 * 글자 Byte 수 가져오기.
 * @param str : 글자 Byte 수 구할 데이터
 * @returns {number}
 */
export function getByteLength(str) {
  let b, i, c;
  for (b = i = 0; (c = str.charCodeAt(i++)); b += c >> 7 ? 2 : 1) ;
  return b;
}

/**
 * 이메일 포맷 체크
 * @param email
 * @returns {boolean}
 */
// export function isEmail(email) {
//   return emailRegExp.test(email);
// }

/**
 * 휴대폰 번호 체크
 * @param hp
 * @returns {boolean}
 */
// export function isMobilePhoneNumber(hp) {
//   return mobilePhoneRegExp.test(hp);
// }

/**
 * 내장객 이름 마스킹 처리
 * @param {string}
 * input : 유정 / 최유정 / 최유정이
 * output : 유* / 최** / 최***
 * @returns {string} 입력데이터 특정문자를 *로 처리해줌.
 */
export function nameToMasking(name) {
  let originStr = name;
  let maskingStr;
  let strLength;

  if (typeof name == "undefined" || name == null || name == "")
    return originStr;
  strLength = originStr.length;
  if (strLength < 2) {
    maskingStr = originStr.replace(/(?<=.{0})./gi, "*");
  } else {
    maskingStr = originStr.replace(/(?<=.{1})./gi, "*");
  }
  return maskingStr;
}

/**
 * 전체라운드 내장객 이름 마스킹 처리
 * 기준일(오늘날짜) 로부터 3일 이상 -> 풀네임 마스킹처리.
 * @param name
 * @returns {*}
 */
export function fullNameToMasking(name) {
  if (name !== "" || name !== null) {
    const maskingStr = name?.replace(/(?<=.{0})./gi, "*");
    return maskingStr;
  }
}

/**
 * 날짜 포맷팅.
 * input : 2021-09-14
 * output : 20210914
 *
 * input : 2021.09.14
 * output : 20210914
 * @param visitDt
 * @param char
 * @returns {*|string}
 */
export function parsedVisitDtIncludesChar(visitDt, char) {
  return visitDt.replaceAll(char, "");
}


/**
 * ### 인풋 태그 관련 훅.
 */
export const useInput = (maxLength = 10) => {
  const _maxLength = maxLength;

  // 설정한 maxLength 와의 유효성 검사.
  const lengthIsInvalid = (text) => {
    return text.length > _maxLength;
  };

  // 설정한 maxLength 에 맞는 text를 자릿수를 맞춰 반환.
  const getValidText = (text) => {
    return text.substring(0, _maxLength);
  };

  return {
    lengthIsInvalid,
    getValidText,
  };
};
