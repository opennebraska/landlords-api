import { Module } from '@nestjs/common';
import { LandlordsController } from './landlords.controller';
import { PropertiesModule } from '../properties/properties.module';

@Module({
  imports: [PropertiesModule],
  controllers: [LandlordsController],
})
export class LandlordsModule {}
