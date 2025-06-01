import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../database/database.interface.config';
export declare class EnvironmentConfigService implements DatabaseConfig {
    private configService;
    constructor(configService: ConfigService);
    getDatabaseHost(): string;
    getDatabasePort(): number;
    getDatabaseUser(): string;
    getDatabasePassword(): string;
    getDatabaseName(): string;
    getJwtSecret(): string;
    getJwtExpirationTime(): string;
}
