export default {
  UPDATE_COMPETITIONS(state, competitions) {
    state.competitions = competitions;
  },
  CLEAR_COMPETITIONS(state) {
    state.competitions = [];
  },

  UPDATE_COMPETITIONS_UPDATED(state) {
    state.competitionsUpdated = true;
  },
  CLEAR_COMPETITIONS_UPDATED(state) {
    state.competitionsUpdated = false;
  },

  UPDATE_PARTICIPANTS(state, participants) {
    state.participants = participants;
  },
  CLEAR_PARTICIPANTS(state) {
    state.participants = [];
  },

  UPDATE_COMPETITION_TITLE(state, title) {
    state.competitionTitle = title;
  },
  CLEAR_COMPETITION_TITLE(state) {
    state.competitionTitle = null;
  },
};
