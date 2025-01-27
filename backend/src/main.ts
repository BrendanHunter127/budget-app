import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('TYPEORM_HOST:', process.env.TYPEORM_HOST);
console.log('TYPEORM_PORT:', process.env.TYPEORM_PORT);
console.log('TYPEORM_USERNAME:', process.env.TYPEORM_USERNAME);
console.log('TYPEORM_PASSWORD:', process.env.TYPEORM_PASSWORD);
console.log('TYPEORM_DATABASE:', process.env.TYPEORM_DATABASE);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
