export class UserRepository {
  #users

  constructor() {
    this.#users = new Map()
  }

  save (user) {
    this.#users.set(user.getUsername(), user)
  }

  findByUsername (username) {
    return this.#users.get(username)
  }

  exists (username) {
    return this.#users.has(username)
  }
}