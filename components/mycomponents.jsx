import React from 'react';

const MyComponent = () => {
  const data = {
    name: "Dark Chocolate",
    quantity: 200,
    unit: "grams"
  };

  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Quantity: {data.quantity}</p>
      <p>Unit: {data.unit}</p>
    </div>
  );
};

export default MyComponent;
