import caddieActions from "@/store/control/caddie/caddie.actions.js";
import groupActions from "@/store/control/group/group.actions.js";
import companyActions from "@/store/control/company/company.actions.js";
import otherActions from "@/store/control/other/other.actions.js";
import messageActions from "@/store/control/message/message.actions.js";
import orderActions from "@/store/control/order/order.actions.js";

export default {
  ...caddieActions,
  ...groupActions,
  ...companyActions,
  ...otherActions,
  ...messageActions,
  ...orderActions,
};
