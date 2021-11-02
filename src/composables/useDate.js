const useDate = () => {
  /**
   * ### 파라미터의 데이터 자릿수가 유효한지 확인하는 메소드.
   * @param {(string|number)} fourDigitTime > 4자리의 시간 형식의 데이터.
   * @returns
   */
  const _isValidFourDigit = (fourDigitTime) => {
    return String(fourDigitTime).length === 4;
  };

  const changeDateFormatByChar = (date, char) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join(char);
  };

  const fourDigitTimeToDate = (fourDigitTime) => {
    if (!_isValidFourDigit(fourDigitTime)) {
      return {
        ok: false,
        error: "Time argument must be four digit.",
      };
    }

    const hours = fourDigitTime.substring(0, 2);
    const minutes = fourDigitTime.substring(2);

    return {
      ok: true,
      hours,
      minutes,
    };
  };

  const toDate = (stringDate) => {
    try {
      const [date, time] = String(stringDate).split(" ");
      const {
        ok: dateOk,
        data: { year, month, day },
      } = _dateDivideWithChar(date, "-");
      const {
        ok: timeOk,
        data: { hours, minutes, seconds },
      } = _timeDivideWithChar(time, ":");

      if (dateOk && timeOk) {
        const data = new Date();
        data.setFullYear(year);
        data.setMonth(month - 1);
        data.setDate(day);
        data.setHours(hours);
        data.setMinutes(minutes);
        data.setSeconds(seconds);
        return {
          ok: true,
          data,
        };
      }
    } catch (e) {
      return {
        ok: false,
        error: "Date convert failed.",
      };
    }
  };

  const _dateDivideWithChar = (textDate, char) => {
    try {
      const [year, month, day] = textDate.split(char);
      return {
        ok: true,
        data: {
          year,
          month,
          day,
        },
      };
    } catch (e) {
      return {
        ok: false,
        error: "Date divide failed.",
      };
    }
  };

  const _timeDivideWithChar = (textTime, char) => {
    try {
      const [hours, minutes, seconds] = textTime.split(char);
      return {
        ok: true,
        data: {
          hours,
          minutes,
          seconds,
        },
      };
    } catch (e) {
      return {
        ok: false,
        error: "Time divide failed.",
      };
    }
  };

  const _clearDateWithChar = (stringDate, char) => {
    return String(stringDate).replaceAll(char, "");
  };

  return {
    changeDateFormatByChar,
    fourDigitTimeToDate,
    toDate,
  };
};

export default useDate;
