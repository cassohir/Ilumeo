import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './service.config';

@Module({
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
