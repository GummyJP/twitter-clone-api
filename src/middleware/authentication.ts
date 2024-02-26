import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

/**
 * Represents the data structure for user authentication.
 */
interface UserData {
  /**
   * The ID of the user.
   */
  id: number;
}

/**
 * Augments the FastifyRequest interface to include user authentication data.
 */
declare module 'fastify' {
  interface FastifyRequest {
    /**
     * The authenticated user data.
     */
    user: UserData;
  }
}

/**
 * Middleware function to authenticate users based on JWT token.
 * @param {FastifyRequest} request - The request object.
 * @param {FastifyReply} reply - The reply object.
 */
export const authenticateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Extract JWT token from request headers
    const token = request.headers['authorization'];
    if (!token) {
      throw new Error('Authorization token not provided');
    }
    
    // Retrieve JWT secret key from environment variables
    const secretKey = process.env.JWT_SECRET; 
    if (!secretKey) {
      throw new Error('JWT secret key not found in environment variables');
    }
    
    // Verify and decode JWT token
    const decoded = jwt.verify(token, secretKey) as UserData;
    // Attach user data to request object
    request.user = decoded;
  } catch (error) {
    // Handle authentication errors
    reply.code(401).send('Unauthorized');
  }
};
