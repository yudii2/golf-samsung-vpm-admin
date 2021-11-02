import competitionActions from "./competition/competition.actions";
import coordinateActions from "./coordinate/coordinate.actions";
import tabletActions from "./tablet/tablet.actions";

export default {
  ...competitionActions,
  ...coordinateActions,
  ...tabletActions,
};
