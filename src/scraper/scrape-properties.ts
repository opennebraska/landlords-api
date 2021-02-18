import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PropertiesService } from '../properties/properties.service';

@Injectable()
export class ScrapePropertiesTask {
  constructor(private readonly propertyService: PropertiesService) {}

  @Cron('* * * * 4')
  async handleCron() {
    await this.propertyService.replacePropertyData();
  }
}
