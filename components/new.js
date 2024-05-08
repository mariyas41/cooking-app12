import React, { useState } from 'react';

const LikeButton = () => {
  const handleLikeClick = () => {
    fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'user123',
        recipeId: 'recipe456',
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <button onClick={handleLikeClick}>Like Recipe</button>
  );
};

export default LikeButton;
