import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import BudgetCard from '../components/BudgetCard';

const Home: React.FC = () => {
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/api/credit-score')
      .then(response => {
        setCreditScore(response.data.score);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching credit score:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BudgetCard title="Total Budget" amount={1000} />
        <BudgetCard title="Expenses" amount={500} />
        <BudgetCard title="Savings" amount={200} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Credit Score</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white p-4 rounded shadow-md">
            {creditScore !== null ? (
              <p className="text-4xl font-bold">Your Credit Score: {creditScore}</p>
            ) : (
              <p>Error fetching credit score.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
