"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const getConfig = () => {
    return {
        SOLANA_ENDPOINT: process.env.SOLANA_ENDPOINT,
        SECRET_KEY: process.env.SECRET_KEY,
        METIS_ENDPOINT: process.env.METIS_ENDPOINT
    };
};
exports.getConfig = getConfig;
