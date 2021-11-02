export const LOCALSTORAGE_KEY_LOGIN_EMAIL = "___les___";
export const LOCALSTORAGE_KEY_SESSION_SHARING_MODE = "___ims___";
export const LOCALSTORAGE_KEY_ACCESS_TOKEN = "___act___";
export const LOCALSTORAGE_KEY_HAS_CIPHER_DATA_GET = "___cipherget___";

export const SESSION_SHARING_MODES = {
  STAND_ALONE: "___stand_alone___",
  BETWEEN_WINDOWS: "___between_windows___",
};

const DEFAULT_SESSION_SHARING_MODE = SESSION_SHARING_MODES.STAND_ALONE;

export function saveLoginEmail(email) {
  localStorage.setItem(LOCALSTORAGE_KEY_LOGIN_EMAIL, email);
}

export function getLoginEmail() {
  return localStorage.getItem(LOCALSTORAGE_KEY_LOGIN_EMAIL);
}

export function clearLoginEmail() {
  localStorage.removeItem(LOCALSTORAGE_KEY_LOGIN_EMAIL);
}

export function setSessionSharingMode(
  sessionSharingMode = DEFAULT_SESSION_SHARING_MODE
) {
  let contains = false;
  for (let sessionSharingModesKey in SESSION_SHARING_MODES) {
    contains =
      contains ||
      SESSION_SHARING_MODES[sessionSharingModesKey] === sessionSharingMode;
  }

  if (contains) {
    localStorage.setItem(
      LOCALSTORAGE_KEY_SESSION_SHARING_MODE,
      sessionSharingMode
    );
  } else {
    throw Error(
      `Couldn't change session sharing mode: '${sessionSharingMode}'`
    );
  }
}

export function saveAccessToken(accessToken, sessionSharingMode) {
  if (sessionSharingMode === SESSION_SHARING_MODES.STAND_ALONE) {
    sessionStorage.setItem(LOCALSTORAGE_KEY_ACCESS_TOKEN, accessToken);
    localStorage.removeItem(LOCALSTORAGE_KEY_ACCESS_TOKEN);
    setSessionSharingMode(SESSION_SHARING_MODES.STAND_ALONE);
  } else if (sessionSharingMode === SESSION_SHARING_MODES.BETWEEN_WINDOWS) {
    sessionStorage.removeItem(LOCALSTORAGE_KEY_ACCESS_TOKEN);
    localStorage.setItem(LOCALSTORAGE_KEY_ACCESS_TOKEN, accessToken);
    setSessionSharingMode(SESSION_SHARING_MODES.BETWEEN_WINDOWS);
  } else {
    throw Error(`Not allow session sharing mode: '${sessionSharingMode}'`);
  }
}

export function setHasCipherDataGet(auth) {
  sessionStorage.setItem(LOCALSTORAGE_KEY_HAS_CIPHER_DATA_GET, auth);
}

export function getHasCipherDataGet() {
  return (
    sessionStorage.getItem(LOCALSTORAGE_KEY_HAS_CIPHER_DATA_GET) === "true"
  );
}

export function getSessionSharingMode() {
  let sessionSharingMode = localStorage.getItem(
    LOCALSTORAGE_KEY_SESSION_SHARING_MODE
  );
  if (!sessionSharingMode) {
    setSessionSharingMode(DEFAULT_SESSION_SHARING_MODE);
    sessionSharingMode = DEFAULT_SESSION_SHARING_MODE;
  }

  return sessionSharingMode;
}

export function getAccessToken() {
  const sessionSharingMode =
    getSessionSharingMode() || DEFAULT_SESSION_SHARING_MODE;
  if (sessionSharingMode === SESSION_SHARING_MODES.STAND_ALONE) {
    return sessionStorage.getItem(LOCALSTORAGE_KEY_ACCESS_TOKEN);
  } else if (sessionSharingMode === SESSION_SHARING_MODES.BETWEEN_WINDOWS) {
    return localStorage.getItem(LOCALSTORAGE_KEY_ACCESS_TOKEN);
  } else {
    throw Error(`Occur session sharing mode. ${sessionSharingMode}`);
  }
}

export function removeAccessToken() {
  localStorage.removeItem(LOCALSTORAGE_KEY_ACCESS_TOKEN);
  sessionStorage.removeItem(LOCALSTORAGE_KEY_ACCESS_TOKEN);
}
