require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const logrotate = require("logrotate-stream");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./src/config/swagger/index");
const ApiResponse = require("./src/utils/apiResponse");
const { connectToDatabase } = require("./src/config/connection/index");

const { MONGODB_URI, NODE_ENV, JWT_SECRET } = process.env;
const PORT = process.env.PORT || 5000;

if (!MONGODB_URI || !NODE_ENV || !PORT || !JWT_SECRET) {
  console.error(
    "Missing required environment variables: MONGODB_URI, NODE_ENV, PORT, JWT_SECRET",
    {
      MONGODB_URI: Boolean(MONGODB_URI),
      NODE_ENV,
      PORT,
      JWT_SECRET: Boolean(JWT_SECRET),
    }
  );

  process.exit(1);
}

const app = express();

// CORS
app.use(cors());

// Body Parser
app.use(
  express.json({
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json(
          new ApiResponse(
            400,
            null,
            "Invalid JSON format. Please check your request body."
          )
        );

        throw new Error("Invalid JSON");
      }
    },
  })
);

app.use(express.urlencoded({ extended: true }));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Logging setup
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  const logDir = path.join(__dirname, "logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const accessLogStream = logrotate({
    file: path.join(logDir, "access.log"),
    size: "10M",
    keep: 3,
    compress: true,
  });

  app.use(morgan("combined", { stream: accessLogStream }));
}

// Routes
app.get("/url", (req, res) => {
  res.send("Welcome to the url-shortener API");
});

app.use("/api/auth", require("./src/routes/auth/index"));
app.use("/", require("./src/routes/link/index"));

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("ERROR =>", err);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    err.statusCode || (err.name === "ValidationError" ? 400 : 500);
  const message =
    err.code === 11000
      ? "Duplicate value already exists"
      : err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
});

// 404 Route
app.use((req, res, next) => {
  return res.status(404).json(
    new ApiResponse(
      404,
      null,
      `Route ${req.originalUrl} not found`,
      null
    )
  );
});

// MongoDB Connection
connectToDatabase(MONGODB_URI);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
