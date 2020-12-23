import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MealsRepository} from "./meals.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      AuthModule,
      TypeOrmModule.forFeature([MealsRepository])
  ],
  controllers: [MealsController],
  providers: [MealsService]
})
export class MealsModule {}
