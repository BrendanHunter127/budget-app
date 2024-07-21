// frontend/components/PlaidLinkButton.tsx
import { useState, useEffect } from 'react';
import { usePlaidLink, PlaidLinkError } from 'react-plaid-link';
import styles from './PlaidLinkButton.module.css';
import Dashboard from './Dashboard';

interface PlaidLinkButtonProps {
  userId: string;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ userId }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/create_link_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    };
    createLinkToken();
  }, [userId]);

  const fetchAccounts = async (accessToken: string) => {
    const response = await fetch('/api/plaid/get_accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });
    const data = await response.json();
    if (data.success) {
      setAccounts(data.accounts);
    } else {
      setErrorMessage(data.error);
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      const response = await fetch('/api/plaid/exchange_public_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicToken: public_token }),
      });
      const data = await response.json();
      if (data.success) {
        setAccessToken(data.access_token);
        setErrorMessage(null);
        fetchAccounts(data.access_token);
      } else {
        setErrorMessage(data.error);
      }
    },
    onExit: (error: PlaidLinkError | null) => {
      if (error) {
        console.error('Error:', error);
        setErrorMessage(error.display_message || error.error_message || 'An unknown error occurred');
      }
    },
  });

  return (
    <div>
      <button onClick={() => open()} disabled={!ready} className={styles.buttonRed}>
        Connect a bank account
      </button>
      {accounts.length > 0 && <Dashboard accounts={accounts} />}
      {errorMessage && <p className={styles.errorMessage}>Error: {errorMessage}</p>}
    </div>
  );
};

export default PlaidLinkButton;
