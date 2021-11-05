const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGO_DB_URL = process.env.DB_URL;
const MONGO_DB_NAME = process.env.DB_NAME;

let db = null;

const getConnection = () => {
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
    db = conn.db(MONGO_DB_NAME);
    return db;
    })
};

module.exports = { getConnection };