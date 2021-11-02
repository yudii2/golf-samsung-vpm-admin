import roundGetters from "@/store/admin/roundAll/roundAll.getters";
import groupGetters from "@/store/admin/roundGroup/roundGroup.getters";
import certificationGetters from "@/store/admin/certification/certification.getters";
import roundRuleSettingsGetters from "./roundRuleSettings/roundRuleSettings.getters";
import progressTimeStandardGetters from "./monitor/progressTimeStandard/progressTimeStandard.getters";

export default {
  ...roundGetters,
  ...groupGetters,
  ...certificationGetters,
  ...roundRuleSettingsGetters,
  ...progressTimeStandardGetters,
};
