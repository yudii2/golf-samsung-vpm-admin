export default class BaseError extends Error {
  #data;

  constructor(data) {
    let message = data && data.status ? data.status : "error";
    super(message);

    this.#data = data;
  }

  getData() {
    if (this.#data && this.#data.data) {
      return this.#data.data;
    } else {
      return "Error";
    }
  }

  getOriginData() {
    return this.#data;
  }
}
