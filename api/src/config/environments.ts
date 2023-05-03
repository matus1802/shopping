export const getEnv = () => {
  if (process.env.NODE_ENV === undefined) return 'development';
  return process.env.NODE_ENV;
};

export const getEnvFilePath = () => `.env.${getEnv()}`;
