import { MongoClient } from 'mongodb';

// Define the MongoDB URI with parameters appropriate for your application
const uri = process.env.MONGODB_URI ||"mongodb://127.0.0.1:27017/kraftykitchen?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.1"

// Create a new MongoClient instance without deprecated options
const client = new MongoClient(uri);

let dbConnection;

export async function connectToDatabase() {
  if (!dbConnection) {
    await client.connect();
    dbConnection = client.db('kraftykitchen'); // Specify the database name here
  }
  return dbConnection;
}

export default client;
