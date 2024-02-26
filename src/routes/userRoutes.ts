import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { validateSignup, validateLogin } from "../validators/userValidators";

// Define the shape of the request body for the signup route
interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

// Define the shape of the request body for the login route
interface LoginRequestBody {
  email: string;
  password: string;
}

/**
 * Defines routes related to user authentication and authorization.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {Function} done - Callback function to signal completion of route registration.
 */

const userRoutes = (
  fastify: FastifyInstance,
  options: any,
  done: () => void
) => {
  /**
   * Route handler for user signup.
   * @param {FastifyRequest<{ Body: SignupRequestBody }>} request - The request object containing signup data.
   * @param {FastifyReply} reply - The reply object to send the response.
   */
  fastify.post(
    "/signup",
    async (
      request: FastifyRequest<{ Body: SignupRequestBody }>,
      reply: FastifyReply
    ) => {
      try {
        const { username, email, password } = request.body || {};

        // Validate signup data
        await validateSignup({ username, email, password });

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error("User already exists");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT secret key not found in environment variables');
        }

        // Generate JWT token for the new user
        const token = jwt.sign({ id: user.id }, secretKey);

        // Send the token as the response
        reply.send({ token });
      } catch (error) {
        // Handle errors
        reply.code(400).send(error);
      }
    }
  );

  /**
   * Route handler for user login.
   * @param {FastifyRequest<{ Body: LoginRequestBody }>} request - The request object containing login data.
   * @param {FastifyReply} reply - The reply object to send the response.
   */
  fastify.post(
    "/login",
    async (
      request: FastifyRequest<{ Body: LoginRequestBody }>,
      reply: FastifyReply
    ) => {
      try {
        const { email, password } = request.body || {};

        // Validate login data
        await validateLogin({ email, password });

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("User not found");

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Invalid password");

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT secret key not found in environment variables');
        }

        // Generate JWT token for the authenticated user
        const token = jwt.sign({ id: user.id }, secretKey);

        // Send the token as the response
        reply.send({ token });
      } catch (error) {
        // Handle errors
        reply.code(400).send(error);
      }
    }
  );

  // Signal completion of route registration
  done();
};

export default userRoutes;
