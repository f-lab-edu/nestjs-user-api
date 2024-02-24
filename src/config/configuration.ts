const getDatabaseHost = () => {
  return process.env.IS_DOCKER === 'true'
    ? process.env.DATABASE_LOCAL_DOCKER_HOST
    : process.env.DATABASE_LOCAL_HOST;
};

export default () => ({
  databaseUser: process.env.DATABASE_USER,
  databasePort: process.env.DATABASE_PORT,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseDb: process.env.DATABASE_DB,
  databaseHost: getDatabaseHost(),
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
});
