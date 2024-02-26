import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import Tweet from '../models/Tweet';
import { authenticateUser } from '../middleware/authentication';
import { Op } from 'sequelize';

/**
 * Defines routes related to fetching mentioned tweets.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {any} options - Options passed to the route.
 * @param {Function} done - Callback function to signal completion of route registration.
 */
const mentionedTweetsRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
  /**
   * Route handler for fetching mentioned tweets.
   * @param {FastifyRequest} request - The request object containing user ID.
   * @param {FastifyReply} reply - The reply object to send the response.
   */
  fastify.get('/mentioned-tweets', { preHandler: authenticateUser }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Extract user ID from the authenticated user
      const userId = request.user.id;

      // Fetch mentioned tweets for the user
      const mentionedTweets = await Tweet.findAll({ where: { taggedUsers: { [Op.like]: `%${userId}%` } } });

      // Send the mentioned tweets as the response
      reply.send(mentionedTweets);
    } catch (error) {
      // Handle errors
      reply.code(400).send(error);
    }
  });

  // Signal completion of route registration
  done();
};

export default mentionedTweetsRoutes;
