export const getNextHoleCode = (currHoleCd, startTeeYn) => {
  if (startTeeYn === "Y") return currHoleCd;
  switch (currHoleCd) {
    case "5":
      return "6";
    case "6":
      return "7";
    case "7":
      return "8";
    case "8":
      return "9";
    case "9":
      return "a";
    case "a":
      return "b";
    case "b":
      return "c";
    case "c":
      return "1";
    case "1":
      return "5";
  }
};
