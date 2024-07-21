import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';
import { AppConfigModule } from '../config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [PlaidService],
  controllers: [PlaidController],
})
export class PlaidModule {
  constructor() {
    console.log('PlaidModule instantiated');
  }
}
