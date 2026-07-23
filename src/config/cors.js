export const allowedOrigins = [
  process.env.CLIENT_URL?.replace(/\/$/, ""),
  ...(process.env.NODE_ENV !== "production" ? ["http://localhost:5173"] : []),
].filter(Boolean);
