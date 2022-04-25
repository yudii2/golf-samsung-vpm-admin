export default {
  UPDATE_COMPANY(state, companyInfo) {
    state.company.code = companyInfo.companyCd;
    state.company.name = companyInfo.companyName;
    state.companyNameEnglish = companyInfo.companyNameEng
    state.company.courses = companyInfo.courseList.map((c) => {
      c["holes"] = companyInfo.holeList.filter(
        (h) => c.courseCd === h.courseCd
      );
      return c;
    });
  },

  UPDATE_COMPANY_CODE(state, companyCode) {
    state.company.code = companyCode;
  },

  UPDATE_COMPANY_NAME(state, companyName) {
    state.company.name = companyName;
  },

  // tempCourses
  UPDATE_TEMP_CADDIES(state) {
    state.tempCourses = state.company.courses;
  },

  /**
   * Company state 안에 있는 caddie 데이터 변경.
   * - 간단 로직 설명.
   *   1. 매칭되는 코스 찾기 => '코스' 있으면 다음 로직 진행, 없으면 Null 반환.
   *   2. 매칭되는 홀 찾기 => '홀' 있으면 다음 로직 진행, 없으면 Null 반환.
   *   3. 매칭된 홀 객체에 'caddies' property 존재 여부 확인. 마찬가지 없으면 Null, 있으면 다음 진행.
   *   4. 매칭되는 캐디 찾기 => 있으면 '데이터 변경', 없으면 아무것도 안함.
   */
  UPDATE_CADDIE_IN_COMPANY(state, newCaddieData) {
    const selectedCaddie = state.currentSelectedCaddie.data;
    // find matched course.
    const matchedCourse = state.company.courses.find(
      (course) => course.courseCd === selectedCaddie.currCourseCd
    );
    if (!matchedCourse) {
      return null;
    }

    // find matched hole.
    const matchedHole = matchedCourse.holes.find(
      (hole) => hole.holeCd === selectedCaddie.currHoleCd
    );
    if (!matchedHole) {
      return null;
    }

    // check has caddies property.
    const hasCaddies = Object.prototype.hasOwnProperty.call(
      matchedHole,
      "caddies"
    );
    if (!hasCaddies) {
      return null;
    }

    // find matched caddie and mutate.
    matchedHole.caddies.map((caddie) => {
      if (caddie.caddieUniqNo === selectedCaddie.caddieUniqNo) {
        for (const key of Object.keys(caddie)) {
          caddie[key] = newCaddieData[key];
        }
      }
      return caddie;
    });
  },
};
