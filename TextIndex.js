const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/kraftykitchen";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function createTextIndex() {
  try {
    await client.connect();
    const database = client.db('kraftykitchen');
    const recipes = database.collection('recipe');

    const result = await recipes.createIndex({ title: "text", description: "text" });
    console.log('Text index created:', result);
  } catch (e) {
    console.error('Error creating text index:', e);
  } finally {
    await client.close();
  }
}

createTextIndex();
