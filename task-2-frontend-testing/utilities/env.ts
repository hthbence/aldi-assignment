// This file is used to load environment variables from a .env file and provide them in a type-safe manner.
function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required environment variable "${name}" is not set.`);
  }
  return value;
}

export const env = {
  baseUrl: getRequiredEnv('BASE_URL'),
  Email: getRequiredEnv('EMAIL'),
  Password: getRequiredEnv('PASSWORD'),
  WrongPassword: getRequiredEnv('WRONG_PASSWORD'),
};