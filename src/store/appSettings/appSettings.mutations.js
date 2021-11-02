import competitionMutations from "./competition/competition.mutations";
import coordinateMutations from "./coordinate/coordinate.mutations";
import tabletMutations from "./tablet/tablet.mutations";

export default {
  ...competitionMutations,
  ...coordinateMutations,
  ...tabletMutations,
};
