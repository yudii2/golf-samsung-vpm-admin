export const PATH_AUTH = "/auth";
export const PATH_AUTH_ISSUE = `${PATH_AUTH}/issue`;
export const PATH_AUTH_WITHDRAW = `${PATH_AUTH}/withdraw`;

export function issueAuthorization(email, password) {
  return this.http.post(PATH_AUTH_ISSUE, { email, password });
}

export function removeAuthorization() {
  // not implemented
  return this.http.delete(PATH_AUTH_WITHDRAW);
}
