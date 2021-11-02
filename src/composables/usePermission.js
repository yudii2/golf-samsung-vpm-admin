import {
  PERMISSIONS_KEY,
  PERMISSION_KEY_DASHBOARD_ADMIN_PAGE,
  PERMISSION_KEY_DASHBOARD_DESKTOP,
  PERMISSION_KEY_DASHBOARD_MOBILE,
  PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE,
  PERMISSION_KEY_DASHBOARD_SETTING_PAGE,
} from "@/utils/constants";

/**
 * #### YYYYY 순서
 * - 대시보드 - 모바일
 * - 관리자 페이지
 * - 대시보드 - 데스크탑
 * - 설정 페이지
 * - 대시보드 - 식음관리자
 */
const usePermission = () => {
  /**
   * ### String 타입(YYYYY or NNNNN)의 권한을 받아 설정하는 애.
   * @param {Array} permissions
   * @returns 권한이 허용된 권한 목록.
   */
  const setPermissions = (permissions) => {
    try {
      const [
        hasDashboardMobile,
        hasAdminPage,
        hasDashboardDesktop,
        hasSettingPage,
        hasDashboardMobileOrderable,
      ] = permissions.split("");

      // 권한 초기화.
      setPermission(PERMISSION_KEY_DASHBOARD_DESKTOP, "N");
      setPermission(PERMISSION_KEY_DASHBOARD_MOBILE, "N");
      setPermission(PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE, "N");
      setPermission(PERMISSION_KEY_DASHBOARD_ADMIN_PAGE, "N");
      setPermission(PERMISSION_KEY_DASHBOARD_SETTING_PAGE, "N");

      if (hasDashboardDesktop === "Y") {
        setPermission(PERMISSION_KEY_DASHBOARD_DESKTOP, hasDashboardDesktop);
      }
      if (hasDashboardMobile === "Y") {
        setPermission(PERMISSION_KEY_DASHBOARD_MOBILE, hasDashboardMobile);
      }
      if (hasDashboardMobileOrderable === "Y") {
        setPermission(
          PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE,
          hasDashboardMobileOrderable
        );
      }
      if (hasAdminPage === "Y") {
        setPermission(PERMISSION_KEY_DASHBOARD_ADMIN_PAGE, hasAdminPage);
      }
      if (hasSettingPage === "Y") {
        setPermission(PERMISSION_KEY_DASHBOARD_SETTING_PAGE, hasSettingPage);
      }

      return {
        ok: true,
        data: getGrantedPermission(),
      };
    } catch (e) {
      return {
        ok: false,
        error: "[Set Permissions] 권한 설정에 실패했습니다.",
      };
    }
  };

  /**
   * ### Key/Value로 권한을 설정하는 애.
   * @param {String} key > 권한의 Key.
   * @param {String} value > 권한의 Value.
   * @returns
   */
  const setPermission = (key, value) => {
    try {
      const permissions = getPermissions();
      if (!permissions) {
        sessionStorage.setItem(
          PERMISSIONS_KEY,
          JSON.stringify([{ [key]: value }])
        );
        return;
      }

      const foundPermission = permissions.find((permission) =>
        Object.prototype.hasOwnProperty.call(permission, key)
      );
      if (foundPermission) {
        foundPermission[key] = value;
      } else {
        permissions.push({ [key]: value });
      }

      sessionStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: "[Set Permission] 권한 설정에 실패했습니다.",
      };
    }
  };

  /**
   * ### 단순한 권한 목록을 가져옴.
   * @returns Key/Value 형식의 권한 목록.
   */
  const getPermissions = () =>
    JSON.parse(sessionStorage.getItem(PERMISSIONS_KEY)) || [];

  /**
   * ### 순번을 바탕으로 정렬된 목록을 가져옴.
   * @returns order 필드의 값에 따라 정렬된 목록.
   */
  const getSortedPermissions = () =>
    getParsedPermissions().sort((a, b) => a.order - b.order) || [];

  /**
   * ### 순번이 추가된 권한 목록을 가져옴.
   * @returns order 필드가 추가된 목록.
   */
  const getParsedPermissions = () => {
    const permissions = getPermissions();

    const parsedPermissions = permissions.map((permission, index) => {
      const [permissionKey] = Object.keys(permission);
      const modifiedPermission = { ...permission };
      switch (permissionKey) {
        case PERMISSION_KEY_DASHBOARD_ADMIN_PAGE:
          return {
            permission: modifiedPermission,
            order: 4,
          };
        case PERMISSION_KEY_DASHBOARD_DESKTOP:
          return {
            permission: modifiedPermission,
            order: 1,
          };
        case PERMISSION_KEY_DASHBOARD_MOBILE:
          return {
            permission: modifiedPermission,
            order: 3,
          };
        case PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE:
          return {
            permission: modifiedPermission,
            order: 2,
          };
        case PERMISSION_KEY_DASHBOARD_SETTING_PAGE:
          return {
            permission: modifiedPermission,
            order: 5,
          };
      }
    });

    return parsedPermissions || [];
  };

  /**
   * ### 허용된 권한(value : Y)의 목록을 가져옴.
   * @returns 허용된 권한 목록.
   */
  const getGrantedPermission = () => {
    const permissions = getSortedPermissions();
    return permissions.filter((permissionObject) => {
      const [first] = Object.values(permissionObject.permission);
      return first === "Y" ? true : false;
    });
  };

  return {
    setPermission,
    setPermissions,
    getPermissions,
    getGrantedPermission,
  };
};

export default usePermission;
