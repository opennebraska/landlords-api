import { ScrapePropertiesTask } from './scrape-properties';
import { Module } from '@nestjs/common';
import { PropertiesModule } from '../properties/properties.module';

@Module({
  imports: [PropertiesModule],
  providers: [ScrapePropertiesTask],
})
export class ScrapePropertiesModule {}
