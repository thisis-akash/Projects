import express from "express";
import dotenvFlow from "dotenv-flow";
import helmet from "helmet";
import cors from "cors";

import v1DrugRoutes from "./routes/v1/drugRoutes.mjs"
import v1TableConfigRoutes from "./routes/v1/tableConfigRoutes.mjs"
import logger from "./config/logger.mjs";

dotenvFlow.config();

const app = express();
const WEB_SERVER_PORT = process.env.WEB_SERVER_PORT;

// Third party middlewares
app.use(express.json());
app.use(helmet());
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use("/api/v1", v1DrugRoutes);
app.use("/api/v1", v1TableConfigRoutes);

// Start server
app.listen(WEB_SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${WEB_SERVER_PORT}`);
});
