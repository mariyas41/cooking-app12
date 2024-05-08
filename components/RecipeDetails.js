import React from 'react';
import recipes from './recipes';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  // Get the recipeId from URL parameters
  const { recipeId } = useParams();

  // Find the recipe with the matching ID
  const recipe = recipes[recipeId];

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }


  // Render the recipe details
  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <p>{recipe.totalTime}</p>
      {/* Render additional details such as ingredients and instructions */}
    </div>
  );
};

export default RecipeDetails;
