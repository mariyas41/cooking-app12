// utils/dbUtils.js

import pool from './db'; // Assuming you have a file named db.js where you define your MySQL connection pool

async function addRecipeToFavorites(userId, recipeId) {
  try {
    // Retrieve current favorite recipes for the user
    const [userData] = await pool.query('SELECT favorite_recipes FROM users WHERE id = ?', [userId]);
    const currentFavorites = userData[0].favorite_recipes || ''; // If no favorites yet, initialize as empty string

    // Split the current favorites string into an array
    const favoritesArray = currentFavorites.split(',');

    // Check if the recipe already exists in favorites
    if (favoritesArray.includes(recipeId)) {
      console.log('Recipe already in favorites');
      return;
    }

    // Add the new recipe ID to the favorites array
    favoritesArray.push(recipeId);

    // Join the updated favorites array back into a string
    const updatedFavorites = favoritesArray.join(',');

    // Update the favorite_recipes column in the user table
    await pool.query('UPDATE users SET favorite_recipes = ? WHERE id = ?', [updatedFavorites, userId]);

    console.log('Recipe added to favorites successfully');
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
  }
}

export { addRecipeToFavorites };
