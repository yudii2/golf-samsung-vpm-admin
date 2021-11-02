import companyGetters from "@/store/control/company/company.getters.js";
import caddieGetters from "@/store/control/caddie/caddie.getters.js";
import weatherGetters from "@/store/control/weather/weather.getters.js";
import messageGetters from "@/store/control/message/message.getters.js";
import groupGetters from "@/store/control/group/group.getters.js";
import otherGetters from "@/store/control/other/other.getters.js";
import orderGetters from "@/store/control/order/order.getters.js";

export default {
  ...companyGetters,
  ...caddieGetters,
  ...weatherGetters,
  ...messageGetters,
  ...groupGetters,
  ...otherGetters,
  ...orderGetters,
};
