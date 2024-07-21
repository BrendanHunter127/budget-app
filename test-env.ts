import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env file
config({ path: join(__dirname, './.env') });

console.log('TYPEORM_HOST:', process.env.TYPEORM_HOST);
console.log('TYPEORM_PORT:', process.env.TYPEORM_PORT);
console.log('TYPEORM_USERNAME:', process.env.TYPEORM_USERNAME);
console.log('TYPEORM_PASSWORD:', process.env.TYPEORM_PASSWORD);
console.log('TYPEORM_DATABASE:', process.env.TYPEORM_DATABASE);
