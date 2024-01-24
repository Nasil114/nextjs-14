// pages/index.js

import Head from 'next/head';

function Home({ apiData }) {
  return (
    <>
    {apiData.map((e) => (
      <h2 key={e.id}>{e.name}</h2>
    ))}
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
    console.error('Error fetching data:', error);
    return {
      props: {
        apiData: null,
      },
    };
  }
}

export default Home;
