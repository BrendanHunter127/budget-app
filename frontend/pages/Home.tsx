import React from 'react';
import Layout from '../components/Layout';
import BudgetCard from '../components/BudgetCard';
import ExpenseForm from '../components/ExpenseForm';

const Home: React.FC = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BudgetCard title="Total Budget" amount={1000} />
        <BudgetCard title="Expenses" amount={500} />
        <BudgetCard title="Savings" amount={200} />
      </div>
      <h2 className="text-2xl font-bold my-4">Add New Expense</h2>
      <ExpenseForm />
    </Layout>
  );
};

export default Home;
