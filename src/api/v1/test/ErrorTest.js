export const INVALID_PATH = `/asdf/sdffff/dsff`;

export function fetchInvalidUrl() {
  return this.http.get(INVALID_PATH);
}
