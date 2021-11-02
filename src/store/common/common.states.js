import toastStates from "@/store/common/toast/toast.states";
import modalStates from "@/store/common/modal/modal.states";
import permissionStates from "@/store/common/permission/permission.states";
import developmentStates from "@/store/common/development/development.states";
import authStates from "@/store/common/auth/auth.states";

export default {
  ...toastStates,
  ...modalStates,
  ...permissionStates,
  ...developmentStates,
  ...authStates,
};
