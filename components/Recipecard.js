import React from 'react';
import styles from '../components/recipecard.module.css';

const RecipeCard = ({ recipe, onFavoriteToggle }) => {
  const { title, image, description, totalTime, type, isFavorite } = recipe;

  const handleFavoriteToggle = () => {
   
    onFavoriteToggle(recipe);
  };

  return (
    <div className={styles.recipeCard}>
      <img src={image} alt={title} className={styles.recipeImage} />
      <div className={styles.recipeContent}>
        <h2 className={styles.recipeTitle}>{title}</h2>
        <p className={styles.recipeDescription}>{description}</p>
        <p className={styles.recipeTime}>Total Time: {totalTime}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
