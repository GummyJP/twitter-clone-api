import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Tweet from "../models/Tweet";

/**
 * Defines routes related to fetching the public feed.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {any} options - Options passed to the route.
 * @param {Function} done - Callback function to signal completion of route registration.
 */
const publicFeedRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
  /**
   * Route handler for fetching the public feed.
   * @param {FastifyRequest} request - The request object.
   * @param {FastifyReply} reply - The reply object to send the response.
   */
  fastify.get('/public-feed', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Fetch public feed tweets
      const publicFeedTweets = await Tweet.findAll({
        order: [['createdAt', 'DESC']] // Order tweets by creation date in descending order
      });

      // Send the public feed tweets as the response
      reply.send(publicFeedTweets);
    } catch (error) {
      // Handle errors
      reply.code(400).send(error);
    }
  });

  // Signal completion of route registration
  done();
};

export default publicFeedRoutes;
