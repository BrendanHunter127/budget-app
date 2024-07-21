import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CreditScoreModule } from '../credit-score-api/src/credit-score/credit-score.module';
import typeOrmConfig from '../ormconfig'; // Import the TypeORM config

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TypeOrmModule.forRoot(typeOrmConfig), // Use the imported TypeORM config
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    HttpModule, // Import HttpModule to enable HTTP requests
    CreditScoreModule, // Import the custom CreditScoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
