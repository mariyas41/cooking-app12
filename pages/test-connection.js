// pages/test-connection.js
import React, { useState } from 'react';

const TestConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState('');

  const checkConnection = async () => {
    const response = await fetch('/api/test-connection');
    const data = await response.json();
    if (response.ok) {
      setConnectionStatus(`Success: ${data.message}`);
    } else {
      setConnectionStatus(`Failure: ${data.error}`);
    }
  };

  return (
    <div>
      <h1>Test MongoDB Connection</h1>
      <button onClick={checkConnection}>Test Connection</button>
      <p>Status: {connectionStatus}</p>
    </div>
  );
};

export default TestConnection;


// // pages/test-connection.js
// import React, { useState } from 'react';

// const TestConnection = () => {
//   const [connectionStatus, setConnectionStatus] = useState('');

//   const checkConnection = async () => {
//     const response = await fetch('/api/test-connection');
//     const data = await response.json();
//     setConnectionStatus(data.message);
//   };

//   return (
//     <div>
//       <h1>Test MongoDB Connection</h1>
//       <button onClick={checkConnection}>Test Connection</button>
//       <p>Status: {connectionStatus}</p>
//     </div>
//   );
// };

// export default TestConnection;
