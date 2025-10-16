
/**
 * In-memory repository for user entities.
 * 
 * Warning: This saves data in-memory and will be lost when the server restarts.
 * This is for demonstration purposes for token-auth-edu package.
 */
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