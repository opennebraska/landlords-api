import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesRepository } from './properties.repository';
import { AuthModule } from '../auth/auth.module';
import { ExternalModule } from '../external/external.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PropertiesRepository]),
    ExternalModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
