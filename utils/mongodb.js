import { MongoClient } from 'mongodb';

// Define the MongoDB URI with parameters appropriate for your application
//const uri = process.env.MONGODB_URI || "mongodb+srv://mariyashaji41:SV8B2H8mugpOTMIK@cluster0.unffopv.mongodb.net/";
const uri = process.env.MONGODB_URI ||"mongodb+srv://mariyashaji41:SV8B2H8mugpOTMIK@cluster0.unffopv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a new MongoClient instance without deprecated options
//const uri="mongodb+srv://mariyashaji41:SV8B2H8mugpOTMIKcluster0.unffopv.mongodb.net/";
//const uri =  "mongodb+srv://mariyashaji41:SV8B2H8mugpOTMIK@cluster0.unffopv.mongodb.net/kraftykitchen";

const client = new MongoClient(uri);

let dbConnection;

export async function connectToDatabase() {
  if (!dbConnection) {
    await client.connect();
    dbConnection = client.db('kraftykitchen'); // Specify the database name here
    console.log("connected to mongodb")
  }
  return dbConnection;
}

export default client;