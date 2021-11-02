import store from "@/store";

export default {
  getCompany: (state) => {
    return state.company;
  },

  getCompanyName: (state) => state.company.name,

  getCompanyNameEnglish: (state) => state.companyNameEnglish,

  getCompanyCourses: (state) => {
    return state.company.courses;
  },
  getCompanyCode: (state) => state.company.code,
  /**
   * ### 데이터 리프레시 중에도 존재하는 코스 목록.
   */
  getAlwaysHasCourses: (state) => {
    const isRefreshing = store.getters["control/getIsRefreshing"];
    return isRefreshing ? state.tempCourses : state.company.courses;
  },

  /**
   * Company state 에서 현재 선택된 캐디로 캐디 찾기.
   * - 본 함수는 currentSelectedCaddie 데이터를 기반으로 작용함 (베이스 데이터).
   * - 그렇기 때문에 따로 캐디를 매개변수/전달인자로 찾을 필요가 없음.
   * - 만약 매개변수/전달인자로 찾고 싶은 경우 새로운 함수를 생성 하시길.
   */
  getCompanyCaddies: (state) => {
    return state.selectedCaddieInCompany;
  },
  currentTempCourses: (state) => {
    return state.tempCourses;
  },
  findCourseNameByCourseCode: (state) => (courseCode) => {
    const foundCourse = state.company.courses.find(
      (c) => c.courseCd == courseCode
    );
    return foundCourse.courseNm;
  },

  /**
   * ### 코스 코드로 코스 정보를 가져오는 메소드.
   * @param {(string|number)} courseCode > 코스 코드 (ex. 1, 2, 3, 4)..
   * @returns {Object} 오브젝트 형식의 코스 정보.
   */
  getCourseByCourseCode: (_, getters) => (courseCode) => {
    const { getCompanyCourses } = getters;
    return getCompanyCourses.find((course) => course.courseCd == courseCode);
  },

  /**
   * ### 코스 코드로 해당 코스의 홀 정보를 가져오는 메소드.
   * @param {(string|number)} courseCode > 코스 코드 (ex. 1, 2, 3, 4)..
   * @returns {Array} 리스트 형식의 홀 정보.
   */
  getCourseHolesByCourseCode: (_, getters) => (courseCode) => {
    try {
      const { getCourseByCourseCode } = getters;
      const { holes } = getCourseByCourseCode(courseCode);
      return holes;
    } catch (e) {
      return null;
    }
  },

  /**
   * ### 코스 코드로 해당 코스 홀의 파 정보를 가져오는 메소드.
   * @param {(string|number)} courseCode > 코스 코드 (ex. 1, 2, 3, 4).
   * @returns {Array} 리스트 형식의 홀의 파 정보.
   */
  getCourseParInfoByCourseCode: (_, getters) => (courseCode) => {
    try {
      const { getCourseHolesByCourseCode } = getters;
      const holes = getCourseHolesByCourseCode(courseCode);
      if (holes && holes.length) {
        return holes.map((hole) => ({
          holeCd: hole.holeCd,
          par: hole.par,
        }));
      }
    } catch (e) {
      return null;
    }
  },
};
