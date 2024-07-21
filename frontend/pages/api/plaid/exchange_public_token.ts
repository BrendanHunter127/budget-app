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
  const { publicToken } = req.body;

  if (!publicToken) {
    res.status(400).json({ success: false, error: 'Public token is required' });
    return;
  }

  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
    const { access_token, item_id } = response.data;
    res.status(200).json({ success: true, access_token, item_id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error exchanging public token:', error.message);
      res.status(500).json({ success: false, error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
}
