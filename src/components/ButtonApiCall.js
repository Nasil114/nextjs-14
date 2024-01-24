// components/ButtonApiCall.js

import { useState } from 'react';

function ButtonApiCall() {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://65afc9ba2f26c3f2139bc03c.mockapi.io/api/members/users');
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Fetching data...' : 'Fetch Data'}
      </button>
      {apiData && (
        <div>
          <h2>API Data:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ButtonApiCall;
