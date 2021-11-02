import toastActions from "@/store/common/toast/toast.actions";
import modalActions from "@/store/common/modal/modal.actions";
import permissionActions from "@/store/common/permission/permission.actions";
import authActions from "@/store/common/auth/auth.actions";

export default {
  ...toastActions,
  ...modalActions,
  ...permissionActions,
  ...authActions,
};
