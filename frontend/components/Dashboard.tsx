// frontend/components/Dashboard.tsx
import React from 'react';

interface DashboardProps {
  accounts: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ accounts }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bank Account Details</h2>
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <div key={account.account_id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-bold">{account.name}</h3>
              <p>Type: {account.type}</p>
              <p>Subtype: {account.subtype}</p>
              <p>Balance: ${account.balances.available}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
};

export default Dashboard;
