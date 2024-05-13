import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import YouTubePlayer from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import styles from "../../index.module.css";

const DetailedSteps = () => {
  const [recipe, setRecipe] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [timers, setTimers] = useState([]);
  const [serves, setServes] = useState(4); // Default to base serves
  const [allStepsCompleted, setAllStepsCompleted] = useState(false); // New state
  const [cookingTips, setCookingTips] = useState([]); // Array of cooking tips
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`http://localhost:3000/api/detailedRecipes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
        setServes(data.baseServes);
        initializeTimers(data, data.baseServes);
        setCookingTips(data.tips); // Update to use 'tips' field
      }
    };

    if (id) {
      fetchRecipe();
    }

    return () => timers.forEach(timer => clearInterval(timer.intervalId));
  }, [id]);

  useEffect(() => {
    if (cookingTips && cookingTips.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % cookingTips.length);
      }, 4000);
      
      return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }
  }, [cookingTips]); // Make sure to include cookingTips in the dependency array
  

  const initializeTimers = (data, numServes) => {
    setTimers(data.steps.map(step => ({
      remainingTime: calculateTime(step.duration, data.baseServes, numServes),
      isActive: false,
      intervalId: null,
      completed: false
    })));
  };

  const parseDuration = (duration) => {
    if (!duration) return null; // Handle cases where duration is null
    
    const minutes = parseFloat(duration.split(" ")[0]);
    return Math.ceil(minutes * 60);
  };
  

  const calculateTime = (duration, baseServes, numServes) => {
    const baseTime = parseDuration(duration);
    return Math.ceil(baseTime * (numServes / baseServes));
  };

  const handleTimer = (index) => {
    const newTimers = [...timers];
    let timer = newTimers[index];

    if (timer.isActive) {
      clearInterval(timer.intervalId);
      timer.isActive = false;
      timer.intervalId = null;
    } else {
      timer.isActive = true;
      timer.intervalId = setInterval(() => {
        setTimers((prevTimers) => {
          const updatedTimers = [...prevTimers];
          if (updatedTimers[index].remainingTime > 0) {
            updatedTimers[index].remainingTime -= 1;
          } else {
            clearInterval(updatedTimers[index].intervalId);
            updatedTimers[index].isActive = false;
            updatedTimers[index].intervalId = null;
            updatedTimers[index].completed = true;
            checkAllStepsCompleted(updatedTimers); // Check if all steps completed
          }
          return updatedTimers;
        });
      }, 1000);
    }

    setTimers(newTimers);
  };

  const restartTimer = (index) => {
    clearInterval(timers[index].intervalId);
    const newTimers = [...timers];
    newTimers[index] = {
      ...newTimers[index],
      remainingTime: calculateTime(recipe.steps[index].duration, recipe.baseServes, serves),
      isActive: false,
      intervalId: null,
      completed: false
    };
    setTimers(newTimers);
  };

  const toggleStep = (index) => {
    setActiveStepIndex(index === activeStepIndex ? null : index);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleServesChange = (event) => {
    const newServes = parseInt(event.target.value);
    setServes(newServes);
    if (recipe) {
      initializeTimers(recipe, newServes);
    }
  };

  const checkAllStepsCompleted = (timers) => {
    if (timers.every(timer => timer.completed)) {
      setAllStepsCompleted(true);
    }
  };

  const handleWhatsAppShare = () => {
    const recipeLink= window.location.href; // Get the current page URL
    const protocol = window.location.protocol; // Get the protocol (http:// or https://)
    const message = `Check out this delicious recipe: ${recipe.title} - ${recipeLink}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};


  const handleInstagramShare = () => {
    const recipeLink = window.location.href;
    const instagramUrl = `https://www.instagram.com/=${encodeURIComponent(recipeLink)}`;
    window.open(instagramUrl, '_blank');
  };

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '20px' }}>
        <YouTubePlayer videoId={recipe.videoId} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={handleWhatsAppShare} className={styles['whatsapp-share-button']}>
            <FontAwesomeIcon icon={faWhatsapp} /> 
          </button>
          <button onClick={handleInstagramShare} style={{ width: '30px', height: '30px' }}>
            <img src="/instagram1.svg" alt="Instagram Icon" style={{ width: '100%', height: '100%' }} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Cooking Steps for {recipe.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="numServes" style={{ fontWeight: 'bold' }}>Servings:</label>
          <input
            id="numServes"
            type="number"
            value={serves}
            onChange={handleServesChange}
            style={{ width: '100px', height: '30px', fontSize: '16px' }}
            min="1"
          />
        </div>
      </div>

      <div>
        {recipe.steps.map((step, index) => (
          <div key={index}>
            <button
              onClick={() => toggleStep(index)}
              style={{
                width: '100%',
                textAlign: 'left',
                backgroundColor: timers[index]?.completed ? '#32CD32' : timers[index]?.isActive ? '#e969aa' : '#dd3895',
                color: 'white',
                padding: '10px',
                marginTop: '5px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              Step {index + 1}: {step.title}
            </button>
            {activeStepIndex === index && (
              <div style={{
                padding: '10px',
                border: '1px solid #ffa500',
                borderTop: 'none',
                backgroundColor: timers[index]?.isActive ? '#f8d7e9' : '#f8d7e9', // Shade of orange if timer active, shade of pink otherwise
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
                <div style={{ marginTop: '10px' }}>
                  <span>{formatTime(timers[index]?.remainingTime || 0)}</span>
                  <button onClick={() => handleTimer(index)}>
                    {timers[index]?.isActive ? "Pause" : timers[index]?.remainingTime < parseDuration(step.duration) && !timers[index]?.completed ? "Resume" : "Start"}
                  </button>
                  <button onClick={() => restartTimer(index)}>Restart</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {allStepsCompleted && (
        <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'green', marginTop: '20px' }}>
          Enjoy your food!
        </p>
      )}

<div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
  <h3 style={{ marginBottom: '10px' }}>Cooking Tip</h3>
  {cookingTips && cookingTips.length > 0 ? (
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>{cookingTips[currentTipIndex]}</p>
  ) : (
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>No cooking tips available</p>
  )}
</div>

    </div>
  );
};

export default DetailedSteps;