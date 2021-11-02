export default {
  // Hole coordinate.
  /**
   * ### 홀/그린 좌표 목록에서 선택된 구분 값 설정하는 넘.
   * @param {Object} option > 선택된 옵션.
   */
  updateSelectedOption({ commit }, option) {
    option
      ? commit("UPDATE_SELECTED_OPTION", option)
      : commit("CLEAR_SELECTED_OPTION");
  },

  /**
   * ### 홀/그린 좌표 목록에서 선택된 코스 설정하는 넘.
   * @param {Object} option > 선택된 옵션.
   */
  updateSelectedCourse({ commit }, course) {
    course
      ? commit("UPDATE_SELECTED_COURSE", course)
      : commit("CLEAR_SELECTED_COURSE");
  },

  /**
   * ### 홀/그린 좌표 목록에서 선택된 홀 설정하는 넘.
   * @param {Object} option > 선택된 옵션.
   */
  updateSelectedHole({ commit }, hole) {
    hole ? commit("UPDATE_SELECTED_HOLE", hole) : commit("CLEAR_SELECTED_HOLE");
  },

  // Other coordinate.
  updateOtherCoordinates({ commit }, coordinates) {
    coordinates
      ? commit("UPDATE_OTHER_COORDINATES", coordinates)
      : commit("CLEAR_OTHER_COORDINATES");
  },
  updateIsOtherCoordinateUpdated({ commit }, status) {
    status
      ? commit("UPDATE_IS_OTHER_COORDINATE_UPDATED")
      : commit("CLEAR_IS_OTHER_COORDINATE_UPDATED");
  },
  updateUpdatedOtherCoordinate({ commit }, coordinateInfo) {
    coordinateInfo
      ? commit("UPDATE_UPDATED_OTHER_COORDINATE", coordinateInfo)
      : commit("CLEAR_UPDATED_OTHER_COORDINATE");
  },
  updateUpdatedOtherCoordinateIndex({ commit }, coordinateIndex) {
    coordinateIndex !== null
      ? commit("UPDATE_UPDATED_OTHER_COORDINATE_INDEX", coordinateIndex)
      : commit("CLEAR_UPDATED_OTHER_COORDINATE_INDEX");
  },
};
