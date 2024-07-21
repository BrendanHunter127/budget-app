// pages/api/plaid/get_accounts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.body;

  try {
    const response = await plaidClient.accountsGet({ access_token: accessToken });
    res.status(200).json({ success: true, accounts: response.data.accounts });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
}
