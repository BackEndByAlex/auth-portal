import { describe, it, expect, vi } from 'vitest'
import { RegisterController } from '../src/controller/registerController.js'
import { LoginController } from '../src/controller/loginController.js'
import { LogoutController } from '../src/controller/logoutController.js'
import { AuthMiddleware } from '../src/middleware/authMiddleware.js'
import { RegisterService } from '../src/services/registerService.js'
import { LoginService } from '../src/services/loginService.js'
import { LogoutService } from '../src/services/logoutService.js'
import { UserRepository } from '../src/models/UserRepository.js'
import { User } from '../src/models/User.js'

vi.mock('token-auth-edu', () => ({
  issueToken: vi.fn(() => 'fake-token-123'),
  verifyToken: vi.fn(() => ({ valid: true, payload: { username: 'testuser' } })),
  decodeToken: vi.fn(() => ({ jti: 'token-id-123' })),
  revokeToken: vi.fn()
}))

describe('Controllers', () => {
  
  it('RegisterController - should register user successfully', () => {
    const mockService = { registerUser: vi.fn(() => 'token') }
    const controller = new RegisterController(mockService)
    const req = { body: { username: 'user', password: '123456Aa', confirmPassword: '123456Aa' } }
    const res = { cookie: vi.fn(), redirect: vi.fn() }

    controller.handleRegister(req, res)

    expect(mockService.registerUser).toHaveBeenCalled()
    expect(res.redirect).toHaveBeenCalledWith('/login')
  })

  it('LoginController - should login user successfully', () => {
    const mockService = { loginUser: vi.fn(() => 'token') }
    const controller = new LoginController(mockService)
    const req = { body: { username: 'user', password: '123456Aa' } }
    const res = { cookie: vi.fn(), redirect: vi.fn() }

    controller.handleLogin(req, res)

    expect(mockService.loginUser).toHaveBeenCalled()
    expect(res.redirect).toHaveBeenCalledWith('/index')
  })

  it('LogoutController - should logout user successfully', () => {
    const mockService = { logoutUser: vi.fn() }
    const controller = new LogoutController(mockService)
    const req = { cookies: { authToken: 'token' } }
    const res = { clearCookie: vi.fn(), redirect: vi.fn() }

    controller.handleLogout(req, res)

    expect(mockService.logoutUser).toHaveBeenCalled()
    expect(res.clearCookie).toHaveBeenCalledWith('authToken')
    expect(res.redirect).toHaveBeenCalled()
  })
})