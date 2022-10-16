import mongoose from 'mongoose';
// Using atlas server for MongoDB.
const uri = `mongodb+srv://${process.env.DB_USERNMAE}:${process.env.DB_PASSWORD}@ashan-mongodb-cluster.zzpevxn.mongodb.net/?retryWrites=true&w=majority`;

/**
 * Connects to the MongoDB instance.
 * Returns client and database connection.
 * @returns
 */
export const connectDatabase = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
