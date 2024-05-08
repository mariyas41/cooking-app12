import pool from '../../utils/db'; // Import the pool and name it correctly
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Get a connection from the pool
      const connection = await pool.getConnection();

      // Check if the user already exists
      const [existingUsers] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);

      if (existingUsers.length > 0) {
        // User already exists, return an error
        connection.release();
        return res.status(400).json({ message: 'User already exists' });
      }

      // Insert the new user into the database
      await connection.execute('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword]);

      // Release the connection back to the pool
      connection.release();

      // Registration successful
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Unsupported HTTP method
    res.status(405).end();
  }
}
