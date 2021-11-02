export default {
  // Hole coordinate.
  getSelectedOption: (state) => state.selectedOption,
  getSelectedCourse: (state) => state.selectedCourse,
  getSelectedHole: (state) => state.selectedHole,

  // Other coordinate.
  getOtherCoordinates: (state) => state.otherCoordinates,
  getIsOtherCoordinateUpdated: (state) => state.isOtherCoordinateUpdated,
  getUpdatedOtherCoordinate: (state) => state.updatedOtherCoordinate,
  getUpdatedOtherCoordinateIndex: (state) => state.updatedOtherCoordinateIndex,
};
