import competitionGetters from "./competition/competition.getters";
import coordinateGetters from "./coordinate/coordinate.getters";
import tabletGetters from "./tablet/tablet.getters";

export default {
  ...competitionGetters,
  ...coordinateGetters,
  ...tabletGetters,
};
