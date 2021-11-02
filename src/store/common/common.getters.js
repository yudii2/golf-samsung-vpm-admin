import toastGetters from "@/store/common/toast/toast.getters";
import modalGetters from "@/store/common/modal/modal.getters";
import permissionGetters from "@/store/common/permission/permission.getters";
import developmentGetters from "@/store/common/development/development.getters";
import authGetters from "@/store/common/auth/auth.getters";

export default {
  ...toastGetters,
  ...modalGetters,
  ...permissionGetters,
  ...developmentGetters,
  ...authGetters,
};
