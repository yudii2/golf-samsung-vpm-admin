import state from "@/store/appSettings/appSettings.states";
import getters from "@/store/appSettings/appSettings.getters";
import mutations from "@/store/appSettings/appSettings.mutations";
import actions from "@/store/appSettings/appSettings.actions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
