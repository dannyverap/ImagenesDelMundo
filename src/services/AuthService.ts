class AuthService {
  async Signup(
    phone: string,
    email: string,
    password: string
  ): Promise<{ data?: string; message?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (phone && email && password) {
          resolve({ data: 'dummy_token' })
        } else {
          resolve({ message: 'Signup failed' })
        }
      }, 1000)
    })
  }

  async Login(email: string, password: string): Promise<{ data?: string; message?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          resolve({ data: 'dummy_token' })
        } else {
          resolve({ message: 'Login failed' })
        }
      }, 1000)
    })
  }

  async ValidateToken(token: string): Promise<{ data?: boolean; message?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (token === 'dummy_token') {
          resolve({ data: true })
        } else {
          resolve({ message: 'Token validation failed' })
        }
      }, 1000)
    })
  }
}

export const AuthServiceInstance = new AuthService()
