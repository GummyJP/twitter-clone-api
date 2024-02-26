import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import Tweet from '../models/Tweet';
import { authenticateUser } from '../middleware/authentication';
import { Op } from 'sequelize';

/**
 * Defines routes related to fetching user timeline.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {any} options - Options passed to the route.
 * @param {Function} done - Callback function to signal completion of route registration.
 */
const timelineRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
  /**
   * Route handler for fetching user timeline.
   * @param {FastifyRequest} request - The request object containing user ID.
   * @param {FastifyReply} reply - The reply object to send the response.
   */
  fastify.get('/timeline', { preHandler: authenticateUser }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Extract user ID from the authenticated user
      const userId = request.user.id;

      // Fetch timeline tweets for the user
      const timelineTweets = await Tweet.findAll({
        where: {
          [Op.or]: [
            { userId }, // Tweets created by the user
            { taggedUsers: { [Op.like]: `%${userId}%` } } // Tweets where the user is tagged
          ]
        },
        order: [['createdAt', 'DESC']] // Order tweets by creation date in descending order
      });

      // Send the timeline tweets as the response
      reply.send(timelineTweets);
    } catch (error) {
      // Handle errors
      reply.code(400).send(error);
    }
  });

  // Signal completion of route registration
  done();
};

export default timelineRoutes;
