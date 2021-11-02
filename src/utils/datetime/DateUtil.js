class DateUtil {
  static dateDivider(date) {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return { year, month, day };
  }

  static replaceDateFormatByCharacter(date, char) {
    const { year, month, day } = this.dateDivider(date);
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
    const { year, month, day } = this.dateDivider(date);
    return {
      ok: true,
      data: `${year}년 ${month}월 ${day}일`,
    };
  }
}

export default DateUtil;
