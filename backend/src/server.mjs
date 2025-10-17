import express from "express";
import dotenvFlow from "dotenv-flow";
import helmet from "helmet";
import cors from "cors";

import v1DrugRoutes from "./routes/v1/drugRoutes.mjs"

dotenvFlow.config();

const app = express();
const WEB_SERVER_PORT = process.env.WEB_SERVER_PORT;

app.use(express.json());

app.use(helmet());

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
};

app.use(cors(corsOptions));

app.use("/api/v1", v1DrugRoutes);

// Start server
app.listen(WEB_SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${WEB_SERVER_PORT}`);
});
