import { connectDatabase } from './database/mongoose';

/**
 * This function runs before app is starting
 * Create connection to the database.
 */
export default async function initializer() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
