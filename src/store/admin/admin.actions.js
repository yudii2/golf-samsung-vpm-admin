import adminRoundActions from "@/store/admin/roundAll/roundAll.actions";
import adminGroupActions from "@/store/admin/roundGroup/roundGroup.actions";
import adminCertificationActions from "@/store/admin/certification/certification.actions";
import roundRuleSettingsActions from "./roundRuleSettings/roundRuleSettings.actions";
import progressTimeStandardActions from "./monitor/progressTimeStandard/progressTimeStandard.actions";
import caddieActions from'@/store/admin/caddie/caddie.actions'
export default {
  ...adminRoundActions,
  ...adminGroupActions,
  ...adminCertificationActions,
  ...roundRuleSettingsActions,
  ...progressTimeStandardActions,
  ...caddieActions
};
