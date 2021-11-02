import competitionStates from "./competition/competition.states";
import coordinateStates from "./coordinate/coordinate.states";
import tabletStates from "./tablet/tablet.states";

export default {
  ...competitionStates,
  ...coordinateStates,
  ...tabletStates,
};
