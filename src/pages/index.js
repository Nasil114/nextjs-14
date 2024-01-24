// // pages/index.js

// import Head from 'next/head';

// function Home({ apiData }) {
//   return (
//     <>
//     {apiData.map((e) => (
//       <h2 key={e.id}>{e.name}</h2>
//     ))}
//   </>
//   );
// }

// export async function getServerSideProps() {
//   try {
//     const response = await fetch('https://65afd06b2f26c3f2139bcf35.mockapi.io/api/users');
//     const apiData = await response.json();

//     return {
//       props: {
//         apiData,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         apiData: null,
//       },
//     };
//   }
// }

// export default Home;


// pages/index.js

// import Head from 'next/head';
// import { useState } from 'react'; // Import useState from React

// function Home({ apiData }) {
//   const [showLabels, setShowLabels] = useState(false); // State to manage label visibility

//   return (
//     <>
//       <Head>
//         <title>Label Example</title>
//       </Head>
//       <button onClick={() => setShowLabels(!showLabels)}>get data</button>
//       {showLabels && (
//         // Display labels only when showLabels is true
//         <div>
//          {apiData.map((e) => (
//       <h2 key={e.id}>{e.name}</h2>
//     ))}
//         </div>
//       )}
//     </>
//   );
// }

// export async function getServerSideProps() {
//   try {
//     const response = await fetch('https://65afd06b2f26c3f2139bcf35.mockapi.io/api/users');
//     const apiData = await response.json();

//     return {
//       props: {
//         apiData,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         apiData: null,
//       },
//     };
//   }
// }

// export default Home;



// pages/index.js

import Head from 'next/head';
import { useState } from 'react';

function Home({ apiData }) {
  const [showServerData, setShowServerData] = useState(false); // State for server-side data
  const [clientData, setClientData] = useState(null); // State for client-side data
  const [showClientDataButton, setShowClientDataButton] = useState(true); // State for showing/hiding the button

  // Function to fetch data client-side
  const fetchClientData = async () => {
    try {
      const response = await fetch('https://65afd06b2f26c3f2139bcf35.mockapi.io/api/users');
      const data = await response.json();
      setClientData(data);
    } catch (error) {
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
            <h2 key={e.id}>{e.name}</h2>
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
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://65afd06b2f26c3f2139bcf35.mockapi.io/api/users');
    const apiData = await response.json();

    return {
      props: {
        apiData,
      },
    };
  } catch (error) {
    console.error('Error fetching server-side data:', error);
    return {
      props: {
        apiData: null,
      },
    };
  }
}

export default Home;
