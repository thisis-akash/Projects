import fs from "fs";
import mysql from "mysql2/promise";
import dotenvFlow from "dotenv-flow";

import { formatDateToUTC } from "../helpers/utils.mjs";

dotenvFlow.config();

const BATCH_SIZE = 100;

async function importData() {

    const filePath = "./scripts/drugData.json";
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log(`Found ${data.length} records to import.`);

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    try {
        console.log("Starting batch import...");

        for (let i = 0; i < data.length; i += BATCH_SIZE) {
            const batch = data.slice(i, i + BATCH_SIZE);

            const values = batch.map((drug) => [
                drug.code,
                drug.genericName,
                drug.brandName,
                drug.company,
                formatDateToUTC(drug.launchDate),
            ]);

            await connection.query(
                `INSERT INTO drugs (code, generic_name, brand_name, company, launch_date)
                 VALUES ?`,
                [values]
            );

            console.log(`Inserted batch ${i / BATCH_SIZE + 1} (${batch.length} records)`);
        }

        console.log("All batches inserted successfully!");

    } catch (err) {
        console.error("Import failed:", err.message);
    } finally {

        await connection.end();
        console.log("Connection closed.");

    }
}

importData();