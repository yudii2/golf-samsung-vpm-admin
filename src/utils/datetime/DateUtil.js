class DateUtil {
  static dateDivider(date) {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return {year, month, day};
  }

  static replaceDateFormatByCharacter(date, char) {
    const {year, month, day} = this.dateDivider(date);
    return [year, month, day].join(char);
  }

  static eightToDate(stringDate) {
    const isValid = this.isValidEightDigit(stringDate);
    if (!isValid.ok) {
      throw new Error(isValid.error);
    }

    const year = stringDate.substring(0, 4);
    const month = stringDate.substring(4, 6);
    const day = stringDate.substring(6);

    const date = new Date(`${year}-${month}-${day}`);
    date.setHours(0, 0, 0);

    return date;
  }

  static isValidEightDigit(stringDate) {
    const isString = typeof stringDate === "string";
    if (!isString) {
      return {
        ok: false,
        error: "Argument must be string.",
      };
    }

    const isValidLength = stringDate.length === 8;
    if (!isValidLength) {
      return {
        ok: false,
        error: "Argument length must be 8 digits.",
      };
    }

    return {
      ok: true,
    };
  }

  static stringDateToFormattedByYearMonthDay(date) {
    const {year, month, day} = this.dateDivider(date);
    return {
      ok: true,
      data: `${year}년 ${month}월 ${day}일`,
    };
  }


  /**
   * input : 20210914
   * output : 2021-09-14
   * @param date
   * @returns {string}
   */
  static stringDateToFormattedByYearMonthDayWithChar(date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const resultDate = `${year}-${month}-${day}`

    return resultDate;
  }

  static calculateElapsedDate(visitDt) {
    const now = new Date();

    if (!this.isValidEightDigit(visitDt).ok) return;

    const visitYear = visitDt.substring(0, 4);
    const visitMonth = visitDt.substring(4, 6) - 1;
    const visitDay = visitDt.substring(6, 8);

    const calculatedVisitDt = new Date(visitYear, visitMonth, visitDay);
    const elapsedMSec = now.getTime() - calculatedVisitDt.getTime();
    const elapsedDay = Math.floor(elapsedMSec / 1000 / 60 / 60 / 24);
    return elapsedDay
  }
}

export default DateUtil;
