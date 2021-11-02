export default {
  // Hole coordinate.
  UPDATE_SELECTED_OPTION(state, option) {
    state.selectedOption = option;
  },
  CLEAR_SELECTED_OPTION(state) {
    state.selectedOption = null;
  },

  UPDATE_SELECTED_COURSE(state, course) {
    state.selectedCourse = course;
  },
  CLEAR_SELECTED_COURSE(state) {
    state.selectedCourse = null;
  },

  UPDATE_SELECTED_HOLE(state, hole) {
    state.selectedHole = hole;
  },
  CLEAR_SELECTED_HOLE(state) {
    state.selectedHole = null;
  },

  // Other coordinate.
  UPDATE_OTHER_COORDINATES(state, coordinates) {
    state.otherCoordinates = coordinates;
  },
  CLEAR_OTHER_COORDINATES(state, coordinates) {
    state.otherCoordinates = [];
  },

  MODIFY_OTHER_COORDINATE(
    state,
    {
      companyCd,
      courseCd,
      holeCd,
      positionCd,
      latitude,
      longitude,
      modifiedLatitude,
      modifiedLongitude,
    }
  ) {
    const foundCoordinates = state.otherCoordinates.map((c) => {
      if (
        c.companyCd === companyCd &&
        c.courseCd === courseCd &&
        c.holeCd === holeCd &&
        c.positionCd === positionCd &&
        c.latitude === latitude &&
        c.longitude === longitude
      ) {
        c.latitude = modifiedLatitude;
        c.longitude = modifiedLongitude;
      }
      return c;
    });

    state.otherCoordinates = [...foundCoordinates];
  },

  UPDATE_IS_OTHER_COORDINATE_UPDATED(state) {
    state.isOtherCoordinateUpdated = true;
  },
  CLEAR_IS_OTHER_COORDINATE_UPDATED(state) {
    state.isOtherCoordinateUpdated = false;
  },

  UPDATE_UPDATED_OTHER_COORDINATE(state, coordinateInfo) {
    state.updatedOtherCoordinate = coordinateInfo;
  },
  CLEAR_UPDATED_OTHER_COORDINATE(state) {
    state.updatedOtherCoordinate = null;
  },

  UPDATE_UPDATED_OTHER_COORDINATE_INDEX(state, index) {
    state.updatedOtherCoordinateIndex = index;
  },
  CLEAR_UPDATED_OTHER_COORDINATE_INDEX(state) {
    state.updatedOtherCoordinateIndex = null;
  },
};
