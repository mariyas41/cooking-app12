import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('kraftykitchen');
    const { search } = req.query;

    let query = {};

    if (search) {
      query = { $text: { $search: search } };
    }

    const recipes = await db.collection('recipe').find(query).toArray();
    res.status(200).json(recipes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
