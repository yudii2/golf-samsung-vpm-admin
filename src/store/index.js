import Vue from "vue";
import Vuex from "vuex";

// Control
import control from "@/store/control/control.store.js";
// Admin
import admin from "@/store/admin/admin.store.js";
// Common
import common from "@/store/common/common.store.js";
// App settings
import appSettings from "@/store/appSettings/appSettings.store.js";
// import defaultStore from "@/store/default/default.store.js";


// others
// import ProjectService from "@/service/ProjectService";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    common,
    admin,
    control,
    appSettings,
  },
});
