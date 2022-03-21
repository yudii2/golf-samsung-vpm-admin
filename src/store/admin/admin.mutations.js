import adminRoundMutations from "@/store/admin/roundAll/roundAll.mutations";
import adminGroupMutations from "@/store/admin/roundGroup/roundGroup.mutations";
import adminCertificationMutations from "@/store/admin/certification/certification.mutations";
import roundRuleSettingsMutations from "./roundRuleSettings/roundRuleSettings.mutations";
import progressTimeStandardMutations from "./monitor/progressTimeStandard/progressTimeStandard.mutations";
import caddieMutations from '@/store/admin/caddie/caddie.mutations'
export default {
  ...adminRoundMutations,
  ...adminGroupMutations,
  ...adminCertificationMutations,
  ...roundRuleSettingsMutations,
  ...progressTimeStandardMutations,
  ...caddieMutations
};
