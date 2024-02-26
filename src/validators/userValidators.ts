/**
 * Represents the data structure for signing up a user.
 */
interface SignupData {
  /**
   * The username of the user.
   */
  username: string;
  /**
   * The email of the user.
   */
  email: string;
  /**
   * The password of the user.
   */
  password: string;
}

/**
 * Represents the data structure for logging in a user.
 */
interface LoginData {
  /**
   * The email of the user.
   */
  email: string;
  /**
   * The password of the user.
   */
  password: string;
}

/**
 * Validates signup data to ensure it meets required criteria.
 * @param {SignupData} data - The signup data to be validated.
 * @returns {Promise<void>} - A Promise that resolves if validation succeeds, otherwise throws an error.
 */
export async function validateSignup(data: SignupData): Promise<void> {
  // Check if data or required fields are missing
  if (!data || !data.username || !data.email || !data.password) {
    throw new Error('Username, email, and password are required');
  }
  // Check password length
  if (data.password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
}

/**
 * Validates login data to ensure it meets required criteria.
 * @param {LoginData} data - The login data to be validated.
 * @returns {Promise<void>} - A Promise that resolves if validation succeeds, otherwise throws an error.
 */
export async function validateLogin(data: LoginData): Promise<void> {
  // Check if data or required fields are missing
  if (!data || !data.email || !data.password) {
    throw new Error('Email and password are required');
  }
}
