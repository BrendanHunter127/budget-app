import { Controller, Post, Body } from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Post('create-link-token')
  async createLinkToken(@Body('userId') userId: string) {
    const response = await this.plaidService.createLinkToken(userId);
    return response;
  }

  @Post('exchange-public-token')
  async exchangePublicToken(@Body('publicToken') publicToken: string) {
    const response = await this.plaidService.exchangePublicToken(publicToken);
    return response;
  }
}
