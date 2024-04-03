# Viaggiare - Social Login Integration API

### Teck Stack
Here we'll list all the tech, libs, services the project will be built upon.
- NodeJS + ExpressJS

#### Additional Libraries
- Passport
- JasonWebToken
- Morgan
- Lodash
- Helmet
- {...other}

### How to run

1. Clone the repo `git clone git@github.com:zedy/social-login-integration-api.git` or download the Zip and extract somewhere localy.
2. Download the `.env` file [^1] or create a file called `.env` from the `.env.sample` and populate it yourself. 
3. Make sure you have `mysql` installed and setup or just use any hosting service like PlanetScale, Aivan, Aws RDS, etc.
4. Install dependacies: `npm i`. Make sure you have **NodeJS** installed (recommended version is 20 LTS)
5. Run the server `npm run dev` 
6. Server should be running on `localhost:5000`

#### Misc
- The server is only accessible by the client app (`CLIENT_APP_URL`) if the ENV variable is set to **PROD**. If the 
variable is set to **DEV** it can be accessed via other servers or apps for API testing (like Postman).
- It has a rate limiter set to a default value of 15 requests/min.

[^1]: You will have to contact me for the env
