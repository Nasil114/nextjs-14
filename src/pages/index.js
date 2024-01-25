import Head from 'next/head';
import { useState } from 'react';

function Home({ apiData, nameofCreator }) {
  const [showServerData, setShowServerData] = useState(false); // State for server-side data
  const [clientData, setClientData] = useState(null); // State for client-side data
  const [showClientDataButton, setShowClientDataButton] = useState(true); // State for showing/hiding the button

  // Function to fetch data client-side
  const fetchClientData = async () => {
    try {
      // Add a log message before making the API request
      console.log('Fetching client-side data...');

      const response = await fetch('https://65afd06b2f26c3f2139bcf35.mockapi.io/api/users');
      const data = await response.json();
      setClientData(data);

      // Add a log message after fetching data
      console.log('Client-side data fetched successfully:', data);
    } catch (error) {
      // Add an error log message in case of an error
      console.error('Error fetching client-side data:', error);
    }
  };

  // Function to toggle the button label
  const toggleClientDataButtonLabel = () => {
    setShowClientDataButton(!showClientDataButton);
  };

  return (
    <>
      <Head>
        <title>Label Example</title>
      </Head>
      <button onClick={() => setShowServerData(!showServerData)}>
        {showServerData ? 'Hide Server Data' : 'Show Server Data'}
      </button>

      <button onClick={() => {
        fetchClientData();
        toggleClientDataButtonLabel();
      }}>
        {showClientDataButton ? 'Hide Client Data' : 'Show Client Data'}
      </button>

      {showServerData && (
        <div>
          {apiData.map((e) => (
            <h2 key={e.id} style={{ color: 'blue' }}>{e.name}</h2>
          ))}
        </div>
      )}

      {clientData && showClientDataButton && (
        <div>
          {clientData.map((e) => (
            <h2 key={e.id}>{e.name}</h2>
          ))}
        </div>
      )}

      <h3>createdBy:</h3>
      <p>{nameofCreator || 'Loading...'}</p>
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Add a log message when the page is loaded
    console.log('Page loaded with server-side rendering...');

    const response = await fetch('https://65afd06b2f26c3f2139bcf35.mockapi.io/api/users');
    const apiData = await response.json();

    // Add a log message after fetching server-side data
    console.log('Server-side data fetched successfully:', apiData);
    console.log('Value of process.env.NAME:', process.env.NAME);

    const nameofCreator = process.env.NAME || 'Default Value';

    return {
      props: {
        apiData,
        nameofCreator,
      },
    };
  } catch (error) {
    // Add an error log message in case of an error
    console.error('Error fetching server-side data:', error);
    return {
      props: {
        apiData: null,
        nameofCreator: 'Default Value',
      },
    };
  }
}

export default Home;
