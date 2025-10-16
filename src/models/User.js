export class User {
  #username
  #passwordHash

  constructor(username, passwordHash) {
    this.#username = username
    this.#passwordHash = passwordHash
  }

  getUsername() {
    return this.#username
  }

  getPasswordHash() {
    return this.#passwordHash
  }

  verifyPassword(password) {
    return this.#passwordHash === password
  }
}