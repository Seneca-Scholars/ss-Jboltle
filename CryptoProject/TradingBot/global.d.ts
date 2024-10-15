declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SECRET_KEY: string;
        SOLANA_ENDPOINT: string;
        METIS_ENDPOINT: string;

      }
    }
  }