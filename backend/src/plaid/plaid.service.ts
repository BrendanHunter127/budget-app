import { Injectable } from '@nestjs/common';
import { PlaidConfigService } from '../config/plaid.config';
import { LinkTokenCreateRequest, ItemPublicTokenExchangeRequest, Products, CountryCode } from 'plaid';

@Injectable()
export class PlaidService {
  constructor(private plaidConfigService: PlaidConfigService) {
    console.log('PlaidService instantiated');
  }

  async createLinkToken(userId: string) {
    const plaidClient = this.plaidConfigService.getPlaidClient();
    const request: LinkTokenCreateRequest = {
      user: { client_user_id: userId },
      client_name: 'Your App Name',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    };
    const response = await plaidClient.linkTokenCreate(request);
    return response;
  }

  async exchangePublicToken(publicToken: string) {
    const plaidClient = this.plaidConfigService.getPlaidClient();
    const request: ItemPublicTokenExchangeRequest = {
      public_token: publicToken,
    };
    const response = await plaidClient.itemPublicTokenExchange(request);
    return response;
  }
}
