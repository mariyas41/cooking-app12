// pages/api/detailedRecipes/[id].js
import clientPromise from '../../../utils/mongodb';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const numericId = parseInt(id, 10); // Convert the ID from the URL to an integer
    const client = await clientPromise;
    const db = client.db('kraftykitchen');

    const recipe = await db.collection('detail_recipe').findOne({ _id: numericId });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
