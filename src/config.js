module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABSE_URL
    || 'postgresql://dunder-mifflin@localhost/spaced-repetition',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL
  || 'postgresql://dunder-mifflin@localhost/spaced-repetition',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
