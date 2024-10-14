interface ENV {
  SECRET_KEY: string | undefined;
  SOLANA_ENDPOINT: string | undefined;
  METIS_ENDPOINT: string | undefined;
}

const getConfig = (): ENV => {
  return {
    SOLANA_ENDPOINT: process.env.SOLANA_ENDPOINT,
    SECRET_KEY: process.env.SECRET_KEY,
    METIS_ENDPOINT: process.env.METIS_ENDPOINT
  };
};

export { ENV, getConfig };