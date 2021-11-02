import toastMutations from "@/store/common/toast/toast.mutations";
import modalMutations from "@/store/common/modal/modal.mutations";
import permissionMutations from "@/store/common/permission/permission.mutations";
import authMutations from "@/store/common/auth/auth.mutations";

export default {
  ...toastMutations,
  ...modalMutations,
  ...permissionMutations,
  ...authMutations,
};
