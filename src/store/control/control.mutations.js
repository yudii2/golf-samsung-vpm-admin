import companyMutations from "@/store/control/company/company.mutations.js";
import caddieMutations from "@/store/control/caddie/caddie.mutations.js";
import weatherMutations from "@/store/control/weather/weather.mutations.js";
import messageMutations from "@/store/control/message/message.mutations.js";
import groupMutations from "@/store/control/group/group.mutations.js";
import otherMutations from "@/store/control/other/other.mutations.js";
import orderMutations from "@/store/control/order/order.mutations.js";

export default {
  ...companyMutations,
  ...caddieMutations,
  ...weatherMutations,
  ...messageMutations,
  ...groupMutations,
  ...otherMutations,
  ...orderMutations,
};
