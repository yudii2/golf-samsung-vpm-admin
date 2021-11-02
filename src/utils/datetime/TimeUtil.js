import moment from "moment";

class TimeUtil {
  static toTimeByString(timeAsString) {
    const isString = typeof timeAsString === "string";
    if (!isString) {
      return {
        ok: false,
        error: `toTime arguments must be a String type.`,
      };
    }

    const date = this.parse(timeAsString);

    return {
      ok: true,
      data: {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      },
    };
  }

  static toDate(timeAsString) {
    const isString = typeof timeAsString === "string";
    if (!isString) {
      return {
        ok: false,
        error: `toTime arguments must be a String type data.`,
      };
    }

    const date = this.parse(timeAsString);

    return {
      ok: true,
      data: date,
    };
  }

  static parse(timeAsString) {
    let raw = timeAsString.replaceAll(":", "");
    if (raw.length === 2) {
      raw += "0000";
    } else if (raw.length === 4) {
      raw += "00";
    }

    const time = new Date();
    time.setHours(raw.substring(0, 2));
    time.setMinutes(raw.substring(2, 4));
    time.setSeconds(raw.substring(4));

    return time;
  }

  /**
   * Convert type like millisecond to time(hour, minute, second).
   */
  static milliToTime(millisecond) {
    const isNumber = typeof millisecond === "number";
    if (!isNumber) {
      return {
        ok: false,
        error: "Argument must be a number type.",
      };
    }

    let second = this.timePadStart(this.makeSecondByMillisecond(millisecond));
    let minute = this.timePadStart(this.makeMinuteByMillisecond(millisecond));
    let hour = this.timePadStart(this.makeHourByMillisecond(millisecond));

    return {
      ok: true,
      data: {
        second,
        minute,
        hour,
      },
    };
  }

  // seconds.
  static makeSecondByMillisecond(millisecond) {
    return this.formattedSecond(this.milliToSecond(millisecond));
  }

  static milliToSecond(millisecond) {
    return millisecond / 1000;
  }

  static formattedSecond(second) {
    return second > 60 ? second % 60 : second;
  }

  // minutes.
  static makeMinuteByMillisecond(millisecond) {
    return this.formattedMinute(this.milliToMinute(millisecond));
  }

  static milliToMinute(millisecond) {
    return Math.floor(this.milliToSecond(millisecond) / 60);
  }

  static formattedMinute(minute) {
    return minute > 60 ? minute % 60 : minute;
  }

  // hours.
  static makeHourByMillisecond(millisecond) {
    return this.formattedHour(this.milliToHour(millisecond));
  }

  static milliToHour(millisecond) {
    return this.milliToMinute(millisecond) / 60;
  }

  static formattedHour(hour) {
    return hour > 24 ? Math.floor(hour % 24) : Math.floor(hour);
  }

  // pad start
  static timePadStart(time) {
    return String(time).padStart(2, 0);
  }

  // Add time
  static addTime(start, end) {
    try {
      const date = new Date();
      date.setHours(start.getHours() + end.getHours());
      date.setMinutes(start.getMinutes() + end.getMinutes());
      date.setSeconds(start.getSeconds() + end.getSeconds());
      return {
        ok: true,
        data: {
          hour: this.timePadStart(date.getHours()),
          minute: this.timePadStart(date.getMinutes()),
          second: this.timePadStart(date.getSeconds()),
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  /**
   * 문자열 -> 시간 포맷팅
   * input : 0600
   * output : 06:00
   * @param {string} stringDate > 4자리의 HHmm 포맷의 스트링 타입의 데이터.
   * @returns {string} > 시간 데이터 사이에 ':' 구분자가 추가되어짐.
   */
  static time(stringDate) {
    return moment(stringDate, "HHmm").format("HH:mm");
    // return val.replace(/^([\d]{2})([\d]{2})$/, "$1:$2")
  }

  /**
   * 문자열 시간 형태의 데이터를 구분자와 함께 포맷팅 해주는 함수.
   * input : stringTime = 0600, char = ":"
   * output : 06:00
   * @param {string} stringDate > 4자리의 HHmm 포맷의 스트링 타입의 데이터.
   * @param {string} char > 4자리의 HH mm 포맷의 사이에 구분자를 설정.
   * @returns {string} > 입력 데이터 사이에 특정 구분자가 추가되어짐.
   */
  static timeFormatWithChar(stringTime, char = ":") {
    if (stringTime?.length !== 4) {
      console.error("[timeFormatWithChar] stringTime is must be 4 digits.");
      return null;
    } else if (typeof stringTime !== "string") {
      console.error("[timeFormatWithChar] stringTime is must be string type.");
      return null;
    }
    return moment(stringTime, "HHmm").format(`HH${char}mm`);
  }
}

export default TimeUtil;
