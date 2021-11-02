import store from "@/store";

export default {
  getCurrentMessages: (state) => {
    return state.messages;
  },
  getReceivedMessages: (state) => {
    return state.messages.filter((message) => message.gubun == 2);
  },
  getFirstReceivedMessage: (_) => {
    const receivedMessages = store.getters["control/getReceivedMessages"];
    return receivedMessages.length ? receivedMessages[0] : null;
  },
  getMessengerSelectedHoleInfo: (state) => {
    return state.messengerSelectedHoleInfo;
  },
  getMessengerSelectedCourse: (state) => {
    return state.messengerSelectedHoleInfo.course;
  },
  getMessengerSelectedHoles: (state) => {
    return state.messengerSelectedHoleInfo.holes;
  },
  getMessengerSelectedCaddies: (state) => {
    return state.messengerSelectedHoleInfo.caddies;
  },
  getCurrentMessengerTags: (state) => {
    return state.messengerTags;
  },
  getCurrentSelectedMessageTag: (state) => {
    return state.selectedMessageTag;
  },
  getCurrentSearchCaddieName: (state) => {
    return state.searchCaddieName;
  },
  findMatchedCaddies: (state, getter) => {
    const selectedCourse = getter.getMessengerSelectedHoleInfo.course;
    const selectedHoles = getter.getMessengerSelectedHoleInfo.holes;
    const selectedHolesByIndex = selectedHoles.map((h) => h[0]);
    return state.caddies.filter((c) => {
      const isAllCourse = selectedCourse.courseCode == 0;
      if (!isAllCourse) {
        const isNotMatchedCourse = c.bookgCourseCd != selectedCourse.courseCode;
        if (isNotMatchedCourse) {
          return false;
        }
      }

      const holeIndex = getter.parseHoleIndex(c.currHoleIndex);
      const isMatchedHole = selectedHolesByIndex.includes(holeIndex);
      if (!isMatchedHole) {
        return false;
      }
      return c;
    });
  },

  parseHoleIndex: () => (holeIndex) => {
    if (holeIndex <= 9) {
      return holeIndex;
    } else {
      return holeIndex - 9;
    }
  },

  getMessageListener: (state) => state.messageListener,
};
