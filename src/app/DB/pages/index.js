import React from 'react'

const HomePage = ({ data }) => {
  return (
    <div>
      <h1>Dynamic Data from MySQL</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:3000/api/getData');
    const data = response.data.data;
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data', error);
    return { props: { data: [] } };
  }
}

export default HomePage;