import config from "../../config";

const conn = require('mongoose');

conn.connect(`mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DATABASE}?authSource=admin&readPreference=primary&ssl=false`)
.then(() => {
    console.log('Mongoose connected');
})
.catch(e => {
    console.log('Mongoose Error!', e)
});

export = conn;