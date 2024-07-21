"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '../.env') });
console.log('TYPEORM_HOST:', process.env.TYPEORM_HOST);
console.log('TYPEORM_PORT:', process.env.TYPEORM_PORT);
console.log('TYPEORM_USERNAME:', process.env.TYPEORM_USERNAME);
console.log('TYPEORM_PASSWORD:', process.env.TYPEORM_PASSWORD);
console.log('TYPEORM_DATABASE:', process.env.TYPEORM_DATABASE);
const typeOrmConfig = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
    username: process.env.TYPEORM_USERNAME || 'brend',
    password: process.env.TYPEORM_PASSWORD || 'Tangerine12765!',
    database: process.env.TYPEORM_DATABASE || 'budget_app_db',
    entities: [process.env.TYPEORM_ENTITIES || 'dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
};
exports.default = typeOrmConfig;
//# sourceMappingURL=ormconfig.js.map