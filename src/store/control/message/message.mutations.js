import useCopy from "@/composables/useCopy.js";
import store from "@/store";

const { objectCopier } = useCopy();
const defaultHoles = [
  "전체",
  "1홀",
  "2홀",
  "3홀",
  "4홀",
  "5홀",
  "6홀",
  "7홀",
  "8홀",
  "9홀",
];

const defaultCourseObject = {
  courseCode: "0",
  courseName: "코스 전체",
};

export default {
  /**
   * ### 메신저에서 특정 캐디를 선택 했을 경우 업데이트.
   */
  UPDATE_MESSENGER_SELECTED_CADDIE_INFO(state, caddie) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);

    const isExists = newInfo.caddies.find(
      (c) => c.caddieUniqNo === caddie.caddieUniqNo
    );
    if (isExists) {
      newInfo.caddies = newInfo.caddies.filter(
        (c) => c.caddieUniqNo !== caddie.caddieUniqNo
      );
    } else {
      newInfo.caddies.push(caddie);
    }
    state.messengerSelectedHoleInfo = newInfo;
  },
  updateMessengerSelectedHolesByCaddie(state, caddie) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);

    newInfo.holes = [];
    newInfo.caddies = [];
    if (caddie) {
      for (const h of defaultHoles) {
        if (caddie.currHoleIndex === h[0]) {
          newInfo.holes.push(h);
          // 검색 후 바로 추가하고 싶은 경우 하기 코드 주석 해제.
          // newInfo.caddies.push({
          //   caddieName: caddie.caddieName,
          //   caddieUniqNo: caddie.caddieUniqNo,
          //   groupNm: caddie.groupNm,
          // });
          break;
        }
      }
    }
    state.messengerSelectedHoleInfo = newInfo;
  },
  updateMessengerSelectedCaddiesByGroup(state) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);
    newInfo.holes = [];
    newInfo.caddies = [];
    for (const c of state.selectedCaddies) {
      for (const h of defaultHoles) {
        if (c.currHoleIndex === h[0]) {
          newInfo.holes.push(h);
          newInfo.caddies.push({
            caddieName: c.caddieName,
            caddieUniqNo: c.caddieUniqNo,
            groupNm: c.groupNm,
          });
          break;
        }
      }
    }
    state.messengerSelectedHoleInfo = newInfo;
  },

  // new
  // messages start
  UPDATE_MESSAGES(state, messages) {
    state.messages = messages;
  },
  // messages end

  // messengerSelectedHoleInfo start
  UPDATE_MESSENGER_SELECTED_CADDIES_BY_CADDIES(state, caddies) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);
    newInfo.caddies = [];
    for (const caddie of caddies) {
      newInfo.caddies.push({
        caddieName: caddie.caddieName,
        caddieUniqNo: caddie.caddieUniqNo,
        groupNm: caddie.groupNm,
      });
    }
    state.messengerSelectedHoleInfo = newInfo;
  },

  // course
  UPDATE_MESSENGER_SELECTED_COURSE(state, course) {
    state.messengerSelectedHoleInfo.course = course;
    state.messengerSelectedHoleInfo = objectCopier(
      state.messengerSelectedHoleInfo
    );
  },
  UPDATE_MESSENGER_SELECTED_COURSE_BY_ALL(state) {
    state.messengerSelectedHoleInfo.course = defaultCourseObject;
    state.messengerSelectedHoleInfo = objectCopier(
      state.messengerSelectedHoleInfo
    );
  },
  UPDATE_MESSENGER_SELECTED_COURSE_BY_CADDIE(state, caddie) {
    const courseCode = caddie.currCourseCd;
    const courseName = store.getters["control/findCourseNameByCourseCode"](
      courseCode
    );
    state.messengerSelectedHoleInfo.course = {
      courseCode,
      courseName,
    };
    state.messengerSelectedHoleInfo = objectCopier(
      state.messengerSelectedHoleInfo
    );
  },

  // holes
  UPDATE_MESSENGER_SELECTED_HOLES_BY_ALL(state) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);
    newInfo.holes = defaultHoles;
    state.messengerSelectedHoleInfo = newInfo;
  },
  UPDATE_MESSENGER_SELECTED_HOLES(state, holes) {
    state.messengerSelectedHoleInfo.holes = holes;
    state.messengerSelectedHoleInfo = objectCopier(
      state.messengerSelectedHoleInfo
    );
  },
  UPDATE_MESSENGER_SELECTED_HOLES_BY_CADDIES(state, caddies) {
    const holes = caddies.map((caddie) => `${caddie.currHoleIndex}홀`);
    const notDuplicateHoles = Array.from(new Set(holes));
    state.messengerSelectedHoleInfo.holes = notDuplicateHoles;
    state.messengerSelectedHoleInfo = objectCopier(
      state.messengerSelectedHoleInfo
    );
  },
  CLEAR_MESSENGER_SELECTED_HOLES_INFO(state) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);
    newInfo.holes = [];
    state.messengerSelectedHoleInfo = newInfo;
  },

  // caddie
  UPDATE_MESSENGER_SELECTED_CADDIE_BY_ALL(state) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);
    newInfo.caddies = [];
    state.caddies.forEach((c) => {
      newInfo.caddies.push({
        caddieName: c.caddieName,
        caddieUniqNo: c.caddieUniqNo,
        groupNm: c.groupNm,
      });
    });
    state.messengerSelectedHoleInfo = newInfo;
  },
  UPDATE_MESSENGER_SELECTED_CADDIES_BY_HOLE(state) {
    const newInfo = objectCopier(state.messengerSelectedHoleInfo);
    newInfo.caddies = [];
    this.getters["control/findMatchedCaddies"].forEach((c) => {
      newInfo.caddies.push({
        caddieName: c.caddieName,
        caddieUniqNo: c.caddieUniqNo,
        groupNm: c.groupNm,
      });
    });
    state.messengerSelectedHoleInfo = newInfo;
  },
  CLEAR_MESSENGER_SELECTED_CADDIES_INFO(state) {
    state.messengerSelectedHoleInfo.caddies = [];
    state.messengerSelectedHoleInfo = objectCopier(
      state.messengerSelectedHoleInfo
    );
  },

  // messengerSelectedHoleInfo end
  // searchCaddieName start
  CLEAR_SEARCH_CADDIE_INPUT(state) {
    state.searchCaddieName = "";
  },
  // searchCaddieName end

  // selectedMessageTag start
  UPDATE_SELECTED_MESSAGE_TAG(state, tag) {
    state.selectedMessageTag = tag;
  },
  CLEAR_SELECTED_MESSAGE_TAG(state) {
    state.selectedMessageTag = "";
  },
  // selectedMessageTag end

  // messengerTags start
  UPDATE_MESSENGER_TAGS(state, tags) {
    state.messengerTags = tags;
  },
  CLEAR_MESSENGER_TAGS(state) {
    state.messengerTags = [];
  },
  // messengerTags end

  /**
   * ### 캐디명으로 캐디 검색.
   */
  UPDATE_SEARCH_CADDIE_NAME(state, caddieName) {
    state.searchCaddieName = caddieName;
  },

  // messageListener
  ENABLE_MESSAGE_LISTENER(state) {
    state.messageListener = true;
  },
  DISABLE_MESSAGE_LISTENER(state) {
    state.messageListener = false;
  },
};
