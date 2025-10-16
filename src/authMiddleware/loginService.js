import { issueToken, verifyToken, decodeToken, revokeToken, refreshToken, rotateKey  } from "token-auth-edu"
import { User } from "../models/user.js"

export class LoginService {
  #userRepository
  #tokenTtlSeconds

  constructor(userRepository) {
    this.#userRepository = userRepository
    this.#tokenTtlSeconds = 3600
  }
}