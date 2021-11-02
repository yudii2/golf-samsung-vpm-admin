export default class APIError extends Error {
  #isInfoLog;
  #statusCode;

  constructor(message, isInfoLog = false, statusCode = null) {
    super(message);

    this.#isInfoLog = isInfoLog;
    this.#statusCode = statusCode;
  }

  isInfoLog() {
    return this.#isInfoLog;
  }

  statusCode() {
    return this.#statusCode;
  }
}
