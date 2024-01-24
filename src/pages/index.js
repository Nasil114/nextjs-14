// pages/index.js

import Head from 'next/head';

function Home({ apiData }) {
  return (
    <div>
      <Head>
        <title>Mock API Example</title>
        <meta name="description" content="Mock API Example in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Mock API Example</h1>
        <button disabled>{'Fetch Data (SSR)'}</button>
        {apiData && (
          <div>
            <h2>API Data:</h2>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
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
