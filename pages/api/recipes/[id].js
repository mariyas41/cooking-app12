// pages/recipes/[id].js
import React from 'react';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} style={recipe.imageStyle} />
      
      <h2>Description</h2>
      <p>{recipe.description}</p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

// export async function getServerSideProps({ params }) {
//   try {
//     const res = await fetch(`http://localhost:3000/api/detailedRecipes/${params.id}`);
//     if (res.ok) {
//       const recipe = await res.json();
//       return { props: { recipe } };
//     } else {
//       console.log('Recipe fetch response:', res.status); // Debugging line
//       return { props: { recipe: null } };
//     }
//   } catch (error) {
//     console.error('Error fetching recipe:', error); // Debugging line
//     return { props: { recipe: null } };
//   }
// }


export default RecipeDetails;
