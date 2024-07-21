import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlaidConfigService } from './plaid.config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, PlaidConfigService],
  exports: [PlaidConfigService],
})
export class AppConfigModule {
  constructor() {
    console.log('AppConfigModule instantiated');
  }
}
