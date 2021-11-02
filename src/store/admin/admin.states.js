import roundStates from "@/store/admin/roundAll/roundAll.states";
import GroupStates from "@/store/admin/roundGroup/roundGroup.states";
import CertificationStates from "@/store/admin/certification/certification.states";
import roundRuleSettingsStates from "./roundRuleSettings/roundRuleSettings.states";
import progressTimeStandardStates from "./monitor/progressTimeStandard/progressTimeStandard.states";

export default {
  ...roundStates,
  ...GroupStates,
  ...CertificationStates,
  ...roundRuleSettingsStates,
  ...progressTimeStandardStates,
};
