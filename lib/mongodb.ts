import {Db, MongoClient} from "mongodb";

let uri = process.env["MONGODB_URI"] as string;
let dbName = process.env["MONGODB_DB"] as string;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
    throw new Error('Please define MONGODB_URI to .env.local');
}

if (!dbName) {
    throw new Error('Please define MONGODB_DB to .env.local');
}

export async function connectToDatabase() {

    if (cachedClient && cachedDb) {
        return {client: cachedClient, db: cachedDb}
    }

    const client = await MongoClient.connect(uri, {
        maxPoolSize: 100,
        maxIdleTimeMS: 3000
    });
    const db = await client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return {client, db}
}
