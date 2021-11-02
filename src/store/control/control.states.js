import companyState from "@/store/control/company/company.states.js";
import caddieState from "@/store/control/caddie/caddie.states.js";
import weatherState from "@/store/control/weather/weather.states.js";
import messageState from "@/store/control/message/message.states.js";
import groupState from "@/store/control/group/group.states.js";
import otherState from "@/store/control/other/other.state.js";
import orderState from "@/store/control/order/order.states.js";

export default {
  ...companyState,
  ...caddieState,
  ...weatherState,
  ...messageState,
  ...groupState,
  ...otherState,
  ...orderState,
};
