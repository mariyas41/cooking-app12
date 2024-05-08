

// pages/recipes/[id].js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import withAuth from '../../components/auth'; // adjust the import path based on where you place auth.js

const RecipeDetails = ({ recipe }) => {
  const [serves, setServes] = useState(recipe.baseServes);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  useEffect(() => {
    const updatedIngredients = recipe.ingredients.map(ingredient => {
      const baseAmount = parseFloat(ingredient.baseQuantity) || 0;
      const unit = ingredient.baseQuantity.replace(/[0-9.]+/g, '').trim();
      const newAmount = (baseAmount * serves) / recipe.baseServes;
      return { ...ingredient, quantity: `${newAmount.toFixed(2)} ${unit}` };
    });
    setIngredients(updatedIngredients);
  }, [serves]);

  const handleServeChange = (event) => {
    setServes(event.target.value);
  };

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
      <p>Serves: 
        <input type="number" value={serves} onChange={handleServeChange} min="1" style={{height:'40px'}}/>
        <button 
    onClick={() => setServes(recipe.baseServes)}
    style={{
        backgroundColor: '#dd3895', // Custom color
        color: 'white', // White text color
        fontWeight: 'bold', // Bold text
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
        transition: 'background-color 0.3s'
    }}
    onMouseEnter={e => e.target.style.backgroundColor = '#45a049'} // Darker green on hover
    onMouseLeave={e => e.target.style.backgroundColor = '#dd3895'} // Reset to custom color on leave
>
    Reset
</button>

      </p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}: {ingredient.quantity}</li>
        ))}
      </ul>
      <Link href={`/recipes/details/${recipe.id}`}>
        <button style={{
            backgroundColor: '#4CAF50', // A nice shade of green
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
            transition: 'background-color 0.3s'
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#45a049'} // Darker green on hover
        onMouseLeave={e => e.target.style.backgroundColor = '#4CAF50'}
        >
            Start Cooking!
        </button>
      </Link>

    </div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/detailedRecipes/${params.id}`);
    if (res.ok) {
      const recipe = await res.json();
      return { props: { recipe } };
    } else {
      console.log('Recipe fetch response:', res.status); // Debugging line
      return { props: { recipe: null } };
    }
  } catch (error) {
    console.error('Error fetching recipe:', error); // Debugging line
    return { props: { recipe: null } };
  }
}

export default withAuth(RecipeDetails);
