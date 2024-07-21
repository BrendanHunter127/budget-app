import React from 'react';

interface BudgetCardProps {
  title: string;
  amount: number;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ title, amount }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">${amount.toFixed(2)}</p>
    </div>
  );
};

export default BudgetCard;
