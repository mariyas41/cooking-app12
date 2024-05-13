import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import RecipeCard from '../components/Recipecard';
import styles from './index.module.css';
import { Button, TextField } from '@mui/material';

export default function Home({ recipes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [buttonColor, setButtonColor] = useState('#dd3895'); // Initial color for the search button

  const handleSearch = async () => {
    Router.push(`/?search=${searchTerm}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Change button color when typing
    setButtonColor(e.target.value.trim() ? '#dd3895' : '#dd3895');
  };

  return (
    <div>
      <h1>Welcome to the Recipe Website</h1>
      <TextField
        label="Search Recipes"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        sx={{
          width: '40%',
          mb: 2,
          '& .MuiInputLabel-root': {
            color: '#dd3895', // Set color of the label to initial color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#dd3895',
              color: '#dd3895',
              // Change border color of the search bar
            },
            '&:hover fieldset': {
              borderColor: '#dd3895', // Change border color of the search bar on hover
            },
          },
        }}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: buttonColor, // Set background color of the button
          color: 'white', // Set text color of the button to white
          height: '55px', // Increase the height of the button
          '&:hover': {
            backgroundColor: buttonColor, // Maintain the same color on hover
          },
        }}
      >
        Search
      </Button>
      <div className={styles.container}>
        {recipes.map(recipe => (
          <Link key={recipe._id} href={`/recipes/${recipe._id}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { search } = context.query;
  try {
    const res = await fetch(`http://localhost:3000/api/recipes?search=${encodeURIComponent(search || '')}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch, received status ${res.status}`);
    }
    const recipes = await res.json();
    return { props: { recipes } };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { props: { recipes: [] } }; // Return empty array on error
  }
}