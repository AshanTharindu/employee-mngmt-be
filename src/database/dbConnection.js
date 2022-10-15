import { MongoClient, ServerApiVersion } from 'mongodb';
import { password, username, database } from '../configs/dbConfig';
// Using atlas server for MongoDB.
const uri = `mongodb+srv://${username}:${password}@ashan-mongodb-cluster.zzpevxn.mongodb.net/?retryWrites=true&w=majority`;

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
