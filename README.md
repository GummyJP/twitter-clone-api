Twitter Clone Backend
This project is a backend implementation of a Twitter clone written in TypeScript using the Fastify framework, Sequelize ORM, and MySQL database. It provides functionalities for user authentication, tweeting, tagging users in tweets, and timeline/feed generation.

Features
User Authentication:
Users can sign up with a unique username, email, and password.
Passwords are securely hashed and stored in the database.
Token-based authentication is implemented to secure API endpoints.

Tweeting Functionality:
Authenticated users can create tweets with a maximum character limit (e.g., 280 characters).
Tweets store information about the user who created them, the tweet content, and the timestamp.

Tagging Functionality:
Users can tag other users in their tweets by mentioning their usernames preceded by '@' (e.g., @example_user).
Tagged users can retrieve tweets they are mentioned in.

Timeline and Feed:
Users have a timeline that displays their tweets and the tweets they were tagged in.
A public feed displays tweets from all users.
Tweets in the timeline and feed are displayed chronologically.

Installation
Clone the repository:
git clone 

Install dependencies:
cd twitter-clone-backend
npm install

Set up MySQL database:
Create a MySQL database and configure the connection details in the .env file.

Run Sequelize migrations to create database tables:
npx sequelize-cli db:migrate

Start the server:
node dist/server.js

Usage
Sign Up: Register a new user by providing a unique username, email, and password.
Log In: Log in with your username/email and password to authenticate.
Create Tweet: Authenticated users can create new tweets with the provided content.
Tag Users: Tag other users in tweets by mentioning their usernames preceded by '@'.
View Timeline: Access your timeline to see your tweets and the tweets you were tagged in.
View Public Feed: Explore the public feed to see tweets from all users.

Testing
Unit tests are provided for critical functionalities such as authentication, tweet creation, and timeline/feed generation. Run the tests using the following command:

npx jest

Technologies Used
TypeScript
Fastify
Sequelize
MySQL
Jest
Supertest
License
This project is licensed under the MIT License.
