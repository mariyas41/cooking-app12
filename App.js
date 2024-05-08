// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/index';
import RecipeDetails from './path/to/RecipeDetails';
 // Assuming your RecipeDetails component is in pages/RecipeDetails.js
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
      {/* Render additional details such as ingredients and instructions */}
    </div>
  );
};



const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/recipe/:recipeId" component={RecipeDetails} />
      </Switch>
    </Router>
  );
};

export default App;
