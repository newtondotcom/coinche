import winston from "winston";

// Create a logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    // Uncomment if you want to log to files
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Add console transport in non-production environments
if (process.env.NODE_ENV == "NODE_ENV") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// Export the logger
export default logger;
