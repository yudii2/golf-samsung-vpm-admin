import useCopy from "@/composables/useCopy";
import store from "@/store";

const { objectCopier } = useCopy();

export default {
  COMBINE_COMPANY_AND_CADDIES(state) {
    const hasCourses = Object.prototype.hasOwnProperty.call(
      state.company,
      "courses"
    );
    if (hasCourses) {
      if (state.company.courses) {
        // version 3
        state.company.courses = state.company.courses.map((course) => {
          // caddies loop
          state.caddies.forEach((caddie) => {
            const isCourseMatched = course.courseCd === caddie.currCourseCd;
            // 코스 코드 값과 캐디의 현재 코스 코드값이 같으면, 홀 탐색 진행.
            if (isCourseMatched) {
              // holes loop
              course.holes = course.holes.map((hole) => {
                const isHoleMatched = hole.holeCd === caddie.currHoleCd;
                // 홀 코드 값과 캐디의 현재 홀 코드값이 같으면, 해당 홀 객체에 현재 캐디 추가.
                if (isHoleMatched) {
                  !Object.prototype.hasOwnProperty.call(hole, "caddies")
                    ? (hole["caddies"] = [{ ...caddie }])
                    : hole.caddies.push(caddie);
                }
                return hole;
              });
            }
          });
          return course;
        });

        // version 2
        // let tempCaddies = [];
        // for (const caddie of state.caddies) {
        //   for (const course of state.company.courses) {
        //     for (const hole of course.holes) {
        //       const isCourseMatched = caddie.currCourseCd == course.courseCd;
        //       const isHoleMatched = caddie.currHoleCd == hole.holeCd;
        //       if (isCourseMatched && isHoleMatched) {
        //         Object.prototype.hasOwnProperty.call(hole, "caddies")
        //           ? hole.caddies.push({ ...caddie })
        //           : (hole["caddies"] = [{ ...caddie }]);

        //         tempCaddies.push(caddie);
        //         break;
        //       }
        //     }
        //   }
        // }

        // version 1
        // for (const [courseIndex, course] of state.company.courses.entries()) {
        //   for (const [holeIndex, hole] of course.holes.entries()) {
        //     for (const [caddieIndex, caddie] of state.caddies.entries()) {
        //       const isCourseMatched = caddie.currCourseCd == course.courseCd;
        //       const isHoleMatched = caddie.currHoleCd == hole.holeCd;
        //       if (isCourseMatched && isHoleMatched) {
        //         Object.prototype.hasOwnProperty.call(hole, "caddies")
        //           ? hole.caddies.push({ ...caddie })
        //           : (hole["caddies"] = [{ ...caddie }]);
        //         break;
        //       }
        //     }
        //   }
        // }

        // origin code
        // state.caddies.forEach((caddie) => {
        //   const foundCourse = state.company.courses.find((course) => {
        //     return course.courseCd === caddie.currCourseCd;
        //   });
        //   if (foundCourse) {
        //     const foundHole = foundCourse.holes.find((hole) => {
        //       return hole.holeCd === caddie.currHoleCd;
        //     });

        //     foundHole["caddie"] = caddie;
        //   }
        // });

        // update company newer company.
        state.company = objectCopier(state.company);

        // copy into temp courses.
        // store.dispatch("control/updateTempCaddies");
      }
    }
  },
  toggleShowMarkInfo(state) {
    state.showMarkInfo = !state.showMarkInfo;
  },

  // new
  // viewType
  UPDATE_VIEW_TYPE(state, viewType) {
    state.viewType = viewType;
  },
  // isMultiSelectMode
  TOGGLE_MULTI_SELECT_MODE(state) {
    state.isMultiSelectMode = !state.isMultiSelectMode;
    if (state.isMultiSelectMode) {
      state.currentSelectedCaddie = null;
    } else {
      state.selectedCaddies = [];
    }
  },
  /**
   * 자동 새로고침 모드 변경.
   */
  TOGGLE_AUTO_REFRESH_MODE(state) {
    state.autoRefreshMode = !state.autoRefreshMode;
  },
  /**
   * 자동 새로고침 모드 종료.
   */
  CLEAR_AUTO_REFRESH_MODE(state) {
    state.autoRefreshMode = false;
  },
  /**
   * 현재 데이터 새로고침 진행 여부 업데이트.
   */
  UPDATE_IS_REFRESHING(state, status) {
    state.isRefreshing = status;
  },
  /**
   * 현재 윈도우 모드(풀화면/축소형) 업데이트.
   */
  UPDATE_IS_MINI_MODE_STATUS(state, status) {
    state.isMiniMode = status;
  },
};
