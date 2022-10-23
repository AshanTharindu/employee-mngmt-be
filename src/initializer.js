import { connectDatabase } from './database/mongoose';

export default async function initializer() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
