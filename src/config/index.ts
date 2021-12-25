const path = require("path");

require("dotenv").config({path: path.resolve(__dirname, "../../.env")});

export default {
    MONGO_USERNAME: process.env?.MONGO_USERNAME,
    MONGO_PASSWORD: process.env?.MONGO_PASSWORD,
    MONGO_HOST: process.env?.MONGO_HOST,
    MONGO_DATABASE: process.env?.MONGO_DATABASE,
    MONGO_PORT: parseInt(process.env?.MONGO_PORT ?? '0')
}