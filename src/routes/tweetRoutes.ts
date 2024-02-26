import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import Tweet from '../models/Tweet';
import { validateTweet } from "../validators/tweetValidators";
import { authenticateUser } from '../middleware/authentication';

// Define the shape of the request body for the tweet route
interface TweetRequestBody {
  content: string;
}

/**
 * Defines routes related to tweeting functionality.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {any} options - Options passed to the route.
 * @param {Function} done - Callback function to signal completion of route registration.
 */
const tweetRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
  /**
   * Route handler for creating a new tweet.
   * @param {FastifyRequest} request - The request object containing tweet data.
   * @param {FastifyReply} reply - The reply object to send the response.
   */
  fastify.post('/tweets', { preHandler: authenticateUser }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as { content: string };
      const { content } = body;

      // Validate tweet content
      await validateTweet({ content });

      // Extract the user ID from the authenticated user
      const userId: number = request.user.id;

      // Find tagged users in the tweet content
      const taggedUsersRegex: RegExp = /@(\w+)/g;
      const taggedUsers: RegExpMatchArray | null = content.match(taggedUsersRegex);
      const taggedUsernames: string[] = taggedUsers ? taggedUsers.map((taggedUser: string) => taggedUser.substring(1)) : [];

      // Create a new tweet
      const tweet = await Tweet.create({ userId, content, taggedUsers: JSON.stringify(taggedUsernames) });

      // Send the newly created tweet as the response
      reply.send(tweet);
    } catch (error) {
      // Handle errors
      reply.code(400).send(error);
    }
  });

  // Signal completion of route registration
  done();
};

export default tweetRoutes;
