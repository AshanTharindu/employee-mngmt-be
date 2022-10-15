import { MongoClient, ServerApiVersion } from 'mongodb';
// Using atlas server for MongoDB.
const uri = `mongodb+srv://${process.env.DB_USERNMAE}:${process.env.DB_PASSWORD}@ashan-mongodb-cluster.zzpevxn.mongodb.net/?retryWrites=true&w=majority`;
const database = process.env.DATABASE;
/**
 * MongoDB client configurations.
 */
export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/**
 * Connects to the MongoDB instance.
 * Returns client and database connection.
 * @returns
 */
export const getDatabaseConnection = async () => {
  try {
    await client.connect();
    const dbConnection = client.db(database);

    return { client, dbConnection };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
