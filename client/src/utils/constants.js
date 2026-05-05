/**
 * Application Constants
 */

export const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:3001";

export const CHAT_CONFIG = {
  MAX_TITLE_LENGTH: 40,
  RETRY_ATTEMPTS: 5,
  RETRY_DELAY_MS: 2000,
};

export const ROLES = {
  USER: "user",
  MODEL: "model",
};
