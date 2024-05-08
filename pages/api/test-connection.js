// pages/api/test-connection.js
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('krafty_kitchen'); // Explicitly specify the database again for clarity

    // Perform a simple database operation like listing collections
    const collections = await db.listCollections().toArray();

    res.status(200).json({ message: 'Connected to krafty_kitchen successfully!', collections });
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e);
    res.status(500).json({ error: 'Failed to connect to krafty_kitchen' });
  }
}


// // pages/api/test-connection.js
// import clientPromise from '../../utils/mongodb';

// export default async function handler(req, res) {
//   try {
//     const client = await clientPromise;
//     // Assuming the connection is handled globally, there's no need to connect again
//     // You can perform a simple operation here, like listing databases, to test the connection

//     res.status(200).json({ message: 'Connected to MongoDB successfully!' });
//   } catch (e) {
//     res.status(500).json({ message: 'Failed to connect to MongoDB', error: e.message });
//   }
//   // Remove the finally block if you're maintaining a persistent connection
// }
