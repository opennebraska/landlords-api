import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PropertiesService } from '../properties/properties.service';

@Injectable()
export class ScrapePropertiesTask {
  constructor(private readonly propertyService: PropertiesService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron() {
    await this.propertyService.replacePropertyData();
  }
}
