import { Injectable } from '@nestjs/common';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlaidConfigService {
  constructor(private configService: ConfigService) {
    console.log('PlaidConfigService instantiated');
  }

  public getPlaidClient(): PlaidApi {
    const configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': this.configService.get<string>('PLAID_CLIENT_ID'),
          'PLAID-SECRET': this.configService.get<string>('PLAID_SECRET'),
        },
      },
    });
    return new PlaidApi(configuration);
  }
}
