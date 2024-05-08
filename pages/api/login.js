import pool from '../../utils/db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.query(
        'SELECT * FROM user WHERE email = ?',
        [email]
      );

      if (users.length > 0) {
        const user = users[0];

        // Compare provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // Generate a new session ID
          const sessionId = uuidv4();

          // Store the session ID in your database associated with the user
          // Add your code here to update the user's session in the database

          return res.status(200).json({ message: 'Login successful', sessionId });
        } else {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (queryError) {
      console.error('Query Error:', queryError.message);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
