import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../database/database.interface.config';
import { config, databaseSchema } from './schemas.config';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>(databaseSchema.DATABASE_HOST);
  }

  getDatabasePort(): number {
    return this.configService.get<number>(databaseSchema.DATABASE_PORT);
  }

  getDatabaseUser(): string {
    return this.configService.get<string>(databaseSchema.DATABASE_USER);
  }

  getDatabasePassword(): string {
    return this.configService.get<string>(databaseSchema.DATABASE_PASSWORD);
  }

  getDatabaseName(): string {
    return this.configService.get<string>(databaseSchema.DATABASE_NAME);
  }

  getJwtSecret(): string {
    return this.configService.get<string>(config.APP_SECRET);
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>(config.EXPIRATION_TIME);
  }
}
